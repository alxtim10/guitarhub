import { AddTransaction } from "@/services/transaction";
import { PaymentMethodSectionType } from "@/types/payment";
import { ShippingSectionType } from "@/types/shipping";
import { AddTransactionType } from "@/types/transaction";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";


export const useCheckout = () => {

    const router = useRouter();
    const [showModalShipping, setShowModalShipping] = useState(false);
    const onCloseModalShipping = () => setShowModalShipping(false);

    const [showModalPayment, setShowModalPayment] = useState(false);
    const onCloseModalPayment = () => setShowModalPayment(false);

    const [isShipping, setIsShipping] = useState<boolean>();
    const [isPayment, setIsPayment] = useState<boolean>();
    const [shippingSection, setShippingSection] = useState<ShippingSectionType>({
        shipping_id: 0,
        shipping_variant_id: 0,
        shipping_price: 0,
        shipping_name: ''
    });

    const [paymentMethodSection, setPaymentMethodSection] = useState<PaymentMethodSectionType>({
        payment_method_id: 0,
        admin_fee: 0,
        payment_method_name: ''
    });

    const mutation = useMutation({
        mutationFn: AddTransaction,
        onSuccess: (response) => {
            router.push(`/transaction/detail?id=${response.data.id}`);
        },
        onError: (error) => {
            console.error("Error creating transaction:", error);
        },
    });

    const handleAdd = (request: AddTransactionType) => {
        mutation.mutate(request);
    };

    return {
        handleAdd,
        showModalShipping,
        setShowModalShipping,
        onCloseModalShipping,
        showModalPayment,
        setShowModalPayment,
        onCloseModalPayment,
        isPayment,
        setIsPayment,
        isShipping,
        setIsShipping,
        shippingSection,
        setShippingSection,
        paymentMethodSection,
        setPaymentMethodSection,
    }
}