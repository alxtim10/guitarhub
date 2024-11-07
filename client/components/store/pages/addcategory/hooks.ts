import { AddCategory } from "@/services/category/index";
import { AddCategoryType } from "@/types/category";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";


export const useAddCategory = () => {

    const router = useRouter();
    const [request, setRequest] = useState<AddCategoryType>({
        name: "",
        description: "",
        user_id: 1
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setRequest((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const mutation = useMutation({
        mutationFn: AddCategory,
        onSuccess: (data) => {
            setIsLoading(false);
            router.push('/profile/store')
        },
        onError: (error) => {
            setIsLoading(false);
        },
    });

    const handleAdd = () => {
        setIsLoading(true);
        mutation.mutate(request);
    };


    return {
        handleInput,
        handleAdd,
        request,
        isLoading,
    }
}