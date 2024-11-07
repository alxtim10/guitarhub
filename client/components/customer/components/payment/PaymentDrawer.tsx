'use client'
import DrawerSection from "@/components/drawer/DrawerSection";
import { useConvertRupiah } from "@/utils/useConvertRupiah";
import { usePayment } from "./hooks";
import PaymentDrawerChildren from "./PaymentDrawerChildren";


export interface PaymentDrawerProps {
    modalActive?: boolean;
    closeModal?: (status: boolean) => void;
    setIsChoosed: Function;
    setShowModal: Function;
    setPriceSection: Function;
}

const PaymentDrawer = (props: PaymentDrawerProps) => {

    const onCloseModal = () => {
        props.closeModal && props.closeModal(false);
    }

    const { paymentMethodData } = usePayment();

    return (
        <DrawerSection
            status={!!props.modalActive}
            closeDrawer={onCloseModal}
            classNameContent="!px-5 max-h-[750px] pb-10"
            title="Payment"
        >
            {paymentMethodData && (
                <PaymentDrawerChildren data={paymentMethodData} setIsChoosed={props.setIsChoosed} setShowModal={props.setShowModal} setPriceSection={props.setPriceSection} />
            )}
        </DrawerSection >
    )
}

export default PaymentDrawer