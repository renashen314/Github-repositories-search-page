import { useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { useState } from "react";

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
      <div>
        <h1>Github Repository Search</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder="Search"
        />
        {isLoading && <p>Loading...</p>}
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
