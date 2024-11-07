import { PaymentMethodSectionType } from "@/types/payment";
import { ShippingSectionType } from "@/types/shipping";
import { useState } from "react";


export const useCheckout = () => {

    const [showModalShipping, setShowModalShipping] = useState(false);
    const onCloseModalShipping = () => setShowModalShipping(false);

    const [showModalPayment, setShowModalPayment] = useState(false);
    const onCloseModalPayment = () => setShowModalPayment(false);

    const [isShipping, setIsShipping] = useState<boolean>();
    const [isPayment, setIsPayment] = useState<boolean>();
    const [shippingSection, setShippingSection] = useState<ShippingSectionType>({
        shippingId: 0,
        shippingPrice: 0,
        shippingName: ''
    });

    const [paymentMethodSection, setPaymentMethodSection] = useState<PaymentMethodSectionType>({
        paymentMethodId: 0,
        adminFee: 0,
        paymentMethodName: ''
    });



    return {
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