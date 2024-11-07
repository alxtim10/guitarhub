import { GetUserCart } from "@/services/cart";
import { UserCart } from "@/types/cart";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useCart = () => {

    const isFetching = useIsFetching();
    const { data, error } = useQuery<UserCart | null, Error>({
        queryKey: ["stores"],
        queryFn: () => GetUserCart({ id: 1 }),
    });
    const [cartData, setCartData] = useState<UserCart | null>(null);

    useEffect(() => {
        if (data) {
            setCartData(data)
        }
    }, [data])

    return {
        cartData,
        isFetching
    }
}