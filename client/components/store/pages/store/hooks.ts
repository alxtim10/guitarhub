import { AddStore } from "@/services/user";
import { AddStoreParams } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useStore = (user_id: number) => {

    const router = useRouter();
    const [request, setRequest] = useState<AddStoreParams>({
        name: '',
        user_id: user_id,
        domain: '',
        location: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        mutationFn: AddStore,
        onSuccess: () => {
            setIsLoading(false);
            router.push("/profile");
        },
        onError: (error) => {
            setIsLoading(false);
            console.error("Error creating category:", error);
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
        isLoading
    };
}