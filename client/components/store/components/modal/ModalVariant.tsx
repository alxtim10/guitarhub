"use client";

import { VariantTypeRequest } from "@/types/product";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Button } from "flowbite-react";
import { useState } from "react";

interface ModalBaseProps {
    openModal: boolean,
    setOpenModal: Function,
    setRequest: Function,
}

export default function ModalVariant({
    openModal,
    setOpenModal,
    setRequest
}: ModalBaseProps) {

    const [requestModal, setRequestModal] = useState<VariantTypeRequest>({
        name: '',
        stock_quantity: 0
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setRequestModal((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="mx-auto max-w-sm min-w-[380px] rounded-xl bg-white p-5 flex flex-col items-start justify-center">
                    <h1 className="text-2xl font-bold">Variant</h1>
                    <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
                        <label className="text-xs font-semibold">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={requestModal.name}
                            onChange={handleInput}
                            className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs h-11 focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
                        />
                    </div>
                    <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
                        <label className="text-xs font-semibold">Stock</label>
                        <input
                            type="number"
                            name="stock_quantity"
                            value={requestModal.stock_quantity}
                            onChange={handleInput}
                            className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs h-11 focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
                        />
                    </div>
                    <Button
                        onClick={() => {
                            setRequest((prev: any) => ({
                                ...prev,
                                variant: [...prev.variant, requestModal]
                            }))
                            setOpenModal(false);
                        }}
                        className="bg-green-500 mt-5 w-full">Add</Button>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
