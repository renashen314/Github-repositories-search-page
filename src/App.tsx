import { useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { useState } from "react";
import RepoCard from "./RepoCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const [sortByRule, setSortByRule] = useState("");
  const [itemsPerPageRule, setItemsPerPageRule] = useState(10);
  const [orderRule, setOrderRule] = useState("");

  const queryClient = useQueryClient();

  const fetchRepo = async (query, itemsPerPage, sortBy, orderBy) => {
    setData(null);
    setError(null);
    setIsLoading(true);
    try {
      const result = await queryClient.fetchQuery({
        queryKey: ["repositories", [query, itemsPerPage]],
        queryFn: async () => {
          const response = await fetch(
            `https://api.github.com/search/repositories?q=${query}&per_page=${itemsPerPage}&sort=${sortBy}&order=${orderBy}`,
          );
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        },
      });
      setData(result);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await fetchRepo(searchTerm, itemsPerPageRule, sortByRule, orderRule);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-semibold py-4">
            Github Repository Search
          </h1>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder="Search"
            className="w-full p-2 border rounded-md border-gray-300"
          />
          <div className="flex justify-between my-4">
            <div className="px-4 py-2 border rounded-md border-gray-300 bg-gray-100">
              <label htmlFor="items-per-page">Items per Page: </label>
              <select
                id="items-per-page"
                value={itemsPerPageRule}
                onChange={(e) => {
                  setItemsPerPageRule(Number(e.target.value));
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="px-4 py-2 border rounded-md border-gray-300 bg-gray-100">
              <label htmlFor="sort-by">Sort by: </label>
              <select
                id="sort-by"
                value={sortByRule}
                onChange={(e) => {
                  setSortByRule(e.target.value);
                }}
              >
                <option value="">Best Match</option>
                <option value="stars">Stars</option>
                <option value="forks">Forks</option>
                <option value="help-wanted-issues">Help Wanted Issues</option>
                <option value="updated">Updated</option>
              </select>
            </div>
            <div className="px-4 py-2 border rounded-md border-gray-300 bg-gray-100">
              <label htmlFor="order">Order: </label>
              <select
                id="order"
                value={orderRule}
                onChange={(e) => {
                  setOrderRule(e.target.value);
                }}
              >
                <option value="">Decending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          {isLoading && <p>Loading...</p>}
          {error && <p>An error has occured: {error.message}</p>}
          <ul>
            {data?.items.map((repo, index) => (
              <div
                key={index}
                className="flex flex-col justify-start p-2 my-4 border border-gray-300 rounded-md shadow-sm"
              >
                <RepoCard repo={repo} index={index} />
              </div>
            ))}
          </ul>
          {/* pagination */}
          <div></div>
        </div>
      </div>
    </>
  );
}

export default App;
