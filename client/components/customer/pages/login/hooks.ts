import { Login } from "@/services/auth";
import { LoginType } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogin = () => {
  const router = useRouter();
  const [request, setRequest] = useState<LoginType>({
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
    mutationFn: Login,
    onSuccess: (data) => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Invalid Credentials:", error);
    },
  });

  const handleLogin = () => {
    mutation.mutate(request);
  };

  return {
    router,
    request,
    handleLogin,
    handleInput,
  };
};
