import { Register } from "@/services/auth";
import { RegisterType } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useRegister = () => {
  const router = useRouter();
  const [request, setRequest] = useState<RegisterType>({
    fullname: "",
    email: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: Register,
    onSuccess: (data) => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Error creating category:", error);
    },
  });

  const handleRegister = () => {
    mutation.mutate(request);
  };

  return {
    request,
    handleRegister,
    handleInput
  };
};
