'use client'
import DrawerSection from "@/components/drawer/DrawerSection";
import { useConvertRupiah } from "@/utils/useConvertRupiah";
import { useShipping } from "./hooks";
import { Fragment, useEffect, useState } from "react";
import { Drawer } from "flowbite-react";
import { theme } from "@/constants/style";
import ShippingDrawerChildren from "./ShippingDrawerChildren";


export interface ShippingDrawerProps {
    modalActive: boolean;
    closeModal?: (status: boolean) => void;
    setIsChoosed: Function;
    setShowModal: Function;
    setPriceSection: Function;
}

const ShippingDrawer = (props: ShippingDrawerProps) => {

    const onCloseModal = () => {
        props.closeModal && props.closeModal(false);
    }

    const { shippingData } = useShipping();

    return (
        <>
            <DrawerSection
                status={!!props.modalActive}
                closeDrawer={onCloseModal}
                classNameContent="!px-5 max-h-[750px] pb-10"
                title="Shipping"
            >
                {shippingData && (
                    <ShippingDrawerChildren data={shippingData} setIsChoosed={props.setIsChoosed} setShowModal={props.setShowModal} setPriceSection={props.setPriceSection} />
                )}
            </DrawerSection>
        </>
    )
}

export default ShippingDrawer