import { AddCartItem } from "@/services/cart";
import { GetProductById } from "@/services/product";
import { AddCartItemParams } from "@/types/cart";
import { ProductDetailType } from "@/types/product";
import { useIsFetching, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';


export const useProductDetail = (id: string) => {

    const isFetching = useIsFetching();
    const { data, error } = useQuery<ProductDetailType | null, Error>({
        queryKey: ["product_detail", id],
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
            toast.success('Added to Cart', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        },
        onError: (error) => {
            toast.error(error.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
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