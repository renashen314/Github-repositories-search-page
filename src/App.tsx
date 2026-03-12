import useFetchRepo from "./hooks/useFetchRepo";
import "./App.css";
import { useState } from "react";
import RepoCard from "./RepoCard";

function App() {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPageRule, setItemsPerPageRule] = useState(10);
  const [sortByRule, setSortByRule] = useState("");
  const [orderRule, setOrderRule] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const { data, isLoading, error } = useFetchRepo({
    searchTerm,
    itemsPerPage: itemsPerPageRule,
    sortBy: sortByRule,
    orderBy: orderRule,
    pageNum: pageNum,
  });

  const goToNextPage = () => {
    //needs to add validation check in the future
    setPageNum((p) => p + 1);
  };

  const goToPrevPage = () => {
    if (pageNum > 1) {
      setPageNum((p) => p - 1);
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setSearchTerm(input);
            }}
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
        {data && (
          <div className="flex items-center justify-center gap-2 p-4">
            <button
              onClick={goToPrevPage}
              disabled={pageNum === 1 || isLoading}
              className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">Page {pageNum}</span>
            <button
              onClick={goToNextPage}
              disabled={isLoading}
              className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
