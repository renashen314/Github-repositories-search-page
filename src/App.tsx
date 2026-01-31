import { useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { useState } from "react";
import RepoCard from "./RepoCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const queryClient = useQueryClient();

  const fetchRepo = async (query) => {
    setData(null);
    setError(null);
    setIsLoading(true);
    try {
      const result = await queryClient.fetchQuery({
        queryKey: ["repositories", query],
        queryFn: async () => {
          const response = await fetch(
            `https://api.github.com/search/repositories?q=${query}`,
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
      await fetchRepo(searchTerm);
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
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>An error has occured: {error.message}</p>}
        <div>
          <ul>
            {data?.items.slice(0, 10).map((repo, index) => (
              <RepoCard repo={repo} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
