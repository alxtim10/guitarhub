import { GetStoreDetailByUserId } from "@/services/store";
import { AddStore } from "@/services/user";
import { AddStoreParams, StoreDetailType } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    const { data, error } = useQuery<StoreDetailType | null, Error>({
        queryKey: ["stores"],
        queryFn: () => GetStoreDetailByUserId({ id: 1 }),
    });
    const [storeData, setStoreData] = useState<StoreDetailType | null>(null);
    const [selectedTabs, setSelectedTabs] = useState<number>(0);

    useEffect(() => {
        if (data && !error) {
            setStoreData(data);
        }
    }, [data])

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
        storeData,
        handleInput,
        handleAdd,
        request,
        isLoading,
        selectedTabs,
        setSelectedTabs
    };
}