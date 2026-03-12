import { useQuery } from "@tanstack/react-query";

type fetchParams = {
  searchTerm: string;
  itemsPerPage: number;
  sortBy: string;
  orderBy: string;
};

const useFetchRepo = ({
  searchTerm,
  itemsPerPage,
  sortBy,
  orderBy,
}: fetchParams) => {
  const query = useQuery({
    queryKey: ["repositories", [searchTerm, itemsPerPage, sortBy, orderBy]],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchTerm}&per_page=${itemsPerPage}&sort=${sortBy}&order=${orderBy}`,
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: searchTerm.length > 0,
  });
  return { ...query };
};

export default useFetchRepo;
