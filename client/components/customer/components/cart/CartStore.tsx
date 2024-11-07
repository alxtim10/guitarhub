import { UserCartStore } from "@/types/cart";
import { useConvertRupiah } from "@/utils/useConvertRupiah";
import { Minus, Plus } from "flowbite-react-icons/outline";
import { Store } from "flowbite-react-icons/solid";

interface CartStoreProps {
    data: UserCartStore;
}

export default function CartStore({
    data
}: CartStoreProps) {
    return (
        <div className="pb-5 pt-2">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center justify-start gap-1">
                    <Store />
                    <h1 className="mt-1">{data.store_name}</h1>
                </div>
                <h1 className="text-green-500 font-bold">{useConvertRupiah(data.price)} {`(${data.quantity})`}</h1>
            </div>
            <hr />
            <div className="flex flex-col gap-5 pt-5 px-4">
                {data.products.map((item, i) => {
                    return (
                        <div className="relative flex gap-4">
                            <div className="bg-gray-500 h-28 w-28 rounded-md"></div>
                            <div>
                                <h1 className="text-lg font-bold">{item.product_name}</h1>
                                <h1 className="mt-1 text-xs text-gray-600 bg-gray-200 text-center rounded-md">{item.product_variant_name}</h1>
                                <h1 className="mt-11 text-xs font-bold text-green-500 text-center rounded-md">{useConvertRupiah(item.price)}</h1>
                            </div>
                            <div className="absolute  bottom-0 right-0 flex items-center justify-center gap-3">
                                <span className="cursor-pointer border rounded-full p-1 bg-gray-200"><Minus className="w-5 h-5" /></span>
                                <h1>{data.quantity}</h1>
                                <span className="cursor-pointer border rounded-full p-1 bg-gray-200"><Plus className="w-5 h-5" /></span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
