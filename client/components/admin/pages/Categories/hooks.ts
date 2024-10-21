import { GetAllCategory } from "@/services/category";
import { CategoryListType } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useCategoryHook = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error } = useQuery<CategoryListType | null, Error>({
    queryKey: ["categories", page],
    queryFn: () => GetAllCategory({ page: page }),
  });

  const handlePage = (page: number) => {
    setPage(page);
  };

  return {
    data,
    isLoading,
    page,
    handlePage,
  };
};

