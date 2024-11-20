import { AddProduct } from "@/services/product";
import { AddProductParams } from "@/types/product";
import { useIsFetching, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export const useAddProduct = (store_id: number) => {

    const isFetching = useIsFetching();
    const router = useRouter();
    const [request, setRequest] = useState<AddProductParams>({
        category_id: 0,
        store_id: 0,
        name: '',
        image_url: '',
        description: '',
        price: 0,
        variant: [],
        stock_quantity: 0,
        rating: 0
    });
    const mutation = useMutation({
        mutationFn: AddProduct,
        onSuccess: () => {
            router.push(`/profile/store`);
        },
        onError: (error) => {
            console.error("Error creating product:", error);
        },
    });

    const handleAdd = () => {
        if (request) {
            mutation.mutate(request);
        }
    };

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
        if (store_id != 0) {
            setRequest((prev: any) => ({
                ...prev,
                store_id: store_id
            }))
        }
    }, [store_id])

    return {
        request,
        setRequest,
        handleAdd,
        handleInput,
        isFetching
    }
}