"use client";

import { useConvertRupiah } from "@/utils/useConvertRupiah";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button } from "flowbite-react";
import { QrCode } from "flowbite-react-icons/outline";

interface ModalBaseProps {
    openModal: boolean,
    setOpenModal: Function
}

export default function ModalBase({
    openModal,
    setOpenModal
}: ModalBaseProps) {
    return (
        <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="mx-auto max-w-sm min-w-[300px] rounded-xl bg-white p-5 flex flex-col items-center justify-center">
                    <DialogTitle>Finish Payment</DialogTitle>
                    <QrCode className="w-44 h-44" />
                    <h1 className="font-bold mt-3">Total Payment</h1>
                    <div>{useConvertRupiah(14025000)}</div>
                    <Button 
                    onClick={() => setOpenModal(false)}
                    className="bg-green-500 mt-5 w-full">Finish</Button>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
