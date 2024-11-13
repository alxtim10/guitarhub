import { GetAllPaymentMethod } from "@/services/payment";
import { PaymentMethodType } from "@/types/payment";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


export const usePayment = () => {

    const isFetching = useIsFetching();
    const { data, error } = useQuery<PaymentMethodType[] | null, Error>({
        queryKey: ["payment"],
        queryFn: () => GetAllPaymentMethod(),
    });
    const [paymentMethodData, setPaymentMethodData] = useState<PaymentMethodType[] | null>(null);

    useEffect(() => {
        if (data) {
            setPaymentMethodData(data)
        }
    }, [data])

    return {
        paymentMethodData,
        isFetching
    }
}