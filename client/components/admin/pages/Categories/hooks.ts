import { DeleteCategory, GetAllCategory } from "@/services/category/index";
import { CategoryListType } from "@/types/category";
import { useIsFetching, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useCategoryHook = () => {
  const router = useRouter();
  const isFetching = useIsFetching();
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error, refetch } = useQuery<
    CategoryListType | null,
    Error
  >({
    queryKey: ["categories", page],
    queryFn: () => GetAllCategory({ page: page }),
  });

  const handlePage = (page: number) => {
    setPage(page);
  };

  const mutation = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: () => {
      refetch();
      router.push("/admin/categories");
    },
    onError: (error) => {
      console.error("Error creating category:", error);
    },
  });

  const handleDelete = (body: { id: string }) => {
    mutation.mutate(body);
  };

  return {
    data,
    isLoading,
    isFetching,
    page,
    handlePage,
    handleDelete,
  };
};
