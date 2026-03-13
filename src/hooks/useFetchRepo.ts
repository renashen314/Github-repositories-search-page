import { useQuery } from "@tanstack/react-query";

type fetchParams = {
  searchTerm: string;
  itemsPerPage: number;
  sortBy: string;
  orderBy: string;
  pageNum: number;
};

const useFetchRepo = ({
  searchTerm,
  itemsPerPage,
  sortBy,
  orderBy,
  pageNum,
}: fetchParams) => {
  const params = new URLSearchParams({
    q: searchTerm,
    per_page: itemsPerPage.toString(),
    sort: sortBy,
    order: orderBy,
    page: pageNum.toString(),
  });
  const query = useQuery({
    queryKey: [
      "repositories",
      [searchTerm, itemsPerPage, sortBy, orderBy, pageNum],
    ],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/search/repositories?${params}`,
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: searchTerm.length > 0,
  });
  return { ...query };
};

export default useFetchRepo;
