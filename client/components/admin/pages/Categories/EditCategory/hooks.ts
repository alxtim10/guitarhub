import { EditCategory, GetCategoryById } from "@/services/category";
import { CategoryDetailType, EditCategoryType } from "@/types/category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useEditCategory = (category_id: string) => {
  const router = useRouter();
  const { data, isLoading, error } = useQuery<CategoryDetailType | null, Error>(
    {
      queryKey: ["category", { category_id: category_id }],
      queryFn: () => GetCategoryById({ id: category_id }),
    }
  );

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data) {
      setRequest(data.data);
    }
  }, [data]);

  const [request, setRequest] = useState<EditCategoryType>({
    id: category_id,
    name: "",
    description: "",
  });

  const mutation = useMutation({
    mutationFn: EditCategory,
    onSuccess: (data) => {
      router.push("/admin/categories");
    },
    onError: (error) => {
      console.error("Error creating category:", error);
    },
  });

  const handleEdit = () => {
    mutation.mutate(request);
  };

  return {
    isLoading,
    request,
    handleInput,
    handleEdit,
  };
};
