import { AddCartItem } from "@/services/cart";
import { GetProductById } from "@/services/product";
import { AddCartItemParams } from "@/types/cart";
import { ProductDetailType } from "@/types/product";
import { useIsFetching, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


export const useProductDetail = (id: string) => {

    const isFetching = useIsFetching();
    const { data, error } = useQuery<ProductDetailType | null, Error>({
        queryKey: ["product_detail", 2],
        queryFn: () => GetProductById({ id: id }),
    });

    const [selectedItem, setSelectedItem] = useState(null);
    const handleClick = (item: any) => {
        setSelectedItem(item);
    };
    const [request, setRequest] = useState<AddCartItemParams>({
        user_id: 1,
        store_id: 0,
        product_id: 0,
        product_variant_id: 0,
        quantity: 1
    });

    const mutation = useMutation({
        mutationFn: AddCartItem,
        onSuccess: () => {
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


    useEffect(() => {
        if (id && data) {
            setRequest((prev: any) => ({
                ...prev,
                store_id: data.store.id,
                product_id: id
            }))
        }
    }, [id, data])

    return {
        data,
        isFetching,
        selectedItem,
        handleClick,
        handleAdd,
        request,
        setRequest
    }
}