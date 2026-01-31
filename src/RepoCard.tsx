const RepoCard = ({ repo, index }) => {
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return (
    <div className="flex flex-col justify-start p-2 my-4 border border-gray-300 rounded-md shadow-sm">
      <li key={index} className="p-2">
        <a href={repo.html_url} className="text-blue-700">
          {repo.full_name}
        </a>
        <p>{repo.description}</p>
        <p className="text-gray-500">
          {repo.stargazers_count} stars · Updated on{" "}
          {formatDate(repo.updated_at)}
        </p>
      </li>
    </div>
  );
};

export default RepoCard;
