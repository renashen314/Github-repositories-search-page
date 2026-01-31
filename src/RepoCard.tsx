const RepoCard = ({ repo, index }) => {
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <>
      <li className="p-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700"
        >
          {repo.full_name}
        </a>
        <p>{repo.description}</p>
        <p className="text-gray-500">
          {repo.stargazers_count} stars · Updated on{" "}
          {formatDate(repo.updated_at)}
        </p>
      </li>
    </>
  );
};

export default RepoCard;
