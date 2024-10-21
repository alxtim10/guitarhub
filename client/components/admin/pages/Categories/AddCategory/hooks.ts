import { AddCategory } from "@/services/category";
import { AddCategoryType } from "@/types/category";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAddCategoryHook = () => {
  const router = useRouter();
  const [request, setRequest] = useState<AddCategoryType>({
    name: "",
    description: "",
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: AddCategory,
    onSuccess: (data) => {
      router.push("/admin/categories");
    },
    onError: (error) => {
      console.error("Error creating category:", error);
    },
  });

  const handleAdd = () => {
    mutation.mutate(request);
  };

  return {
    handleInput,
    handleAdd,
    request,
  };
};
