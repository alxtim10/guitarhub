import { GetAllStore } from "@/services/stores";
import { StoreData, StoresListType } from "@/types/store";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useStores = () => {
  const router = useRouter();
  const isFetching = useIsFetching();
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error } = useQuery<StoresListType | null, Error>({
    queryKey: ["stores", page],
    queryFn: () => GetAllStore(),
  });
  const [listData, setListData] = useState<StoresListType>();

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
