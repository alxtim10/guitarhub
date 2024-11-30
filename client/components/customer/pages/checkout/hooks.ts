import { GetProductById } from "@/services/product";
import { AddTransaction } from "@/services/transaction";
import { PaymentMethodSectionType } from "@/types/payment";
import { ProductDetailType, ProductVariantType } from "@/types/product";
import { ShippingSectionType } from "@/types/shipping";
import { AddTransactionType } from "@/types/transaction";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const useCheckout = (product_id: string, product_variant_id: string) => {

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


    const { data: productData, error } = useQuery<ProductDetailType | null, Error>({
        queryKey: ["checkout_product_detail", product_id],
        queryFn: () => GetProductById({ id: product_id }),
    });
    const [variantData, setVariantData] = useState<ProductVariantType | null>();

    useEffect(() => {
        if (productData) {
            const tempVariantData = productData.variant.find((x: ProductVariantType) => x.id == Number(product_variant_id));
            setVariantData(tempVariantData);
        }

    }, [productData])

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
        productData,
        variantData
    }
}