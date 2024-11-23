import { UserCartStore } from "@/types/cart";
import { useConvertRupiah } from "@/utils/useConvertRupiah";
import { Store } from "flowbite-react-icons/solid";
import Image from "next/image";

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
                        <div key={i} className="relative flex gap-4">
                            <Image
                                src={item.image_url}
                                alt="product"
                                width={100}
                                height={100}
                                className="object-cover rounded-lg"
                            />
                            <div className="flex flex-col items-start">
                                <h1 className="text-lg font-bold">{item.product_name}</h1>
                                <h1 className="mt-1 text-xs text-gray-600 bg-gray-200 text-center rounded-md px-2">{item.product_variant_name}</h1>
                                <h1 className="mt-11 text-xs font-bold text-green-500 text-center rounded-md">{useConvertRupiah(item.price)}</h1>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
