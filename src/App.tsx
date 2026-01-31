import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();

  const fetchFunction = async () => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${searchTerm}`,
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      setSearchTerm(inputValue);
    }
  };

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["repositories", searchTerm],
    queryFn: () => fetchFunction(),
    enabled: searchTerm.length > 0,
  });

  return (
    <>
      <div>
        <h1>Github Repository Search</h1>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder="Search"
        />
        {isPending && <p>Loading...</p>}
        {error && <p>An error has occured: {error.message}</p>}
        <ul>
          {data?.items.slice(0, 10).map((repo, index) => (
            <li key={index}>
              <a href={repo.html_url}>{repo.full_name}</a>
              <p>{repo.description}</p>
              <p>{repo.stargazers_count} stars</p>
              <p>{repo.updated_at}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
