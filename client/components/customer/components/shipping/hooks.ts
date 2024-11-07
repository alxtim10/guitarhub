import { GetAllShipping } from "@/services/shipping";
import { ShippingType } from "@/types/shipping";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


export const useShipping = () => {

    const isFetching = useIsFetching();
    const { data, error } = useQuery<ShippingType[] | null, Error>({
        queryKey: ["shipping"],
        queryFn: () => GetAllShipping(),
    });
    const [shippingData, setShippingData] = useState<ShippingType[] | null>(null);

    useEffect(() => {
        if (data) {
            setShippingData(data)
        }
    }, [data])

    return {
        shippingData,
        isFetching
    }
}