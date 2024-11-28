'use client'
import { ArrowLeft } from "flowbite-react-icons/outline";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryDropdown from "../../components/dropdowns/CategoryDropdown";
import ModalVariant from "../../components/modal/ModalVariant";
import { useState } from "react";
import { useAddProduct } from "./hooks";



export default function AddProduct() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const store_id = parseInt(searchParams.get('store_id') || '0');
    const [openModal, setOpenModal] = useState<boolean>(false);

    const {
        request,
        setRequest,
        handleInput,
        handleAdd,
    } = useAddProduct(store_id);


    return (
        <section className='p-5 pb-10'>
            <div className='flex items-center gap-3 mb-3'>
                <ArrowLeft
                    onClick={() => {
                        router.back();
                    }}
                    className='w-7 h-7 cursor-pointer' />
                <h1 className='font-bold text-lg'>Add Product</h1>
            </div>
            <div className="bg-white px-5 py-5 rounded-xl mt-5 shadow-lg">
                <h1 className="text-2xl font-bold">General Information</h1>
                <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
                    <label className="text-xs font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={request.name}
                        onChange={handleInput}
                        className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs h-11 focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
                    />
                </div>
                <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
                    <label className="text-xs font-semibold">Description</label>
                    <textarea
                        rows={5}
                        name="description"
                        value={request.description}
                        onChange={handleInput}
                        className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
                    />
                </div>
                <div className="mt-5">
                    <CategoryDropdown setRequest={setRequest} />
                </div>
            </div>
            <div className="bg-white px-5 py-5 rounded-xl mt-3 shadow-lg">
                <h1 className="text-2xl font-bold">Pricing & Variant</h1>
                <div className="flex gap-3">
                    <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
                        <label className="text-xs font-semibold">Base Price</label>
                        <input
                            type="text"
                            name="price"
                            value={request.price}
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
                            value={request.stock_quantity}
                            onChange={handleInput}
                            className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs h-11 focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
                        />
                    </div>
                </div>
                <button
                    onClick={() => {
                        setOpenModal(true);
                    }}
                    className="shadow-md mt-5 w-full bg-primary  text-white py-1 rounded-md"
                >
                    + Variant
                </button>
                <div className="flex flex-col items-center gap-2 justify-center w-full mt-2">
                    {request.variant.length > 0 && request.variant.map((item, i) => {
                        return (
                            <div key={i} className="flex items-center justify-between w-full border-b p-2">
                                <h1 className=" w-full">{item.name}</h1>
                                <span>{item.stock_quantity}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="bg-white px-5 pt-5 pb-7 rounded-xl mt-5 shadow-lg">
                <h1 className="text-2xl font-bold">Image</h1>
                {request.image_url && (
                    <div className="my-4">
                        <img
                            src={request.image_url}
                            alt="Preview"
                            className="w-full h-auto border rounded-lg"
                        />
                    </div>
                )}
                <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
                    <label className="text-xs font-semibold">Image URL</label>
                    <input
                        type="text"
                        name="image_url"
                        value={request.image_url}
                        onChange={handleInput}
                        className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs h-11 focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
                    />
                </div>
            </div>
            <button
                onClick={() => {
                    handleAdd();
                }}
                className="shadow-md mt-5 w-full bg-primary  text-white py-3 rounded-md"
            >
                Add
            </button>
            <ModalVariant openModal={openModal} setOpenModal={setOpenModal} setRequest={setRequest} />
        </section>
    )
}
