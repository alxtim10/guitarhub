import { GetAllProduct } from "@/services/products";
import { ProductsListType } from "@/types/product";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useProduct = () => {
  const router = useRouter();
  const isFetching = useIsFetching();
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error } = useQuery<ProductsListType | null, Error>({
    queryKey: ["stores", page],
    queryFn: () => GetAllProduct(),
  });
  const [listData, setListData] = useState<ProductsListType>();

  const handlePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  return {
    listData,
    isFetching,
    page,
    setPage,
    handlePage,
    router,
  };
};
