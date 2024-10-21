import { GetCategoryById } from "@/services/category";
import { AddCategoryType, CategoryDetailType } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useEditCategory = (category_id: string) => {
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

  const [request, setRequest] = useState<AddCategoryType>({
    name: "",
    description: "",
  });

  return {
    data,
    isLoading,
    request,
    handleInput
  };
};
