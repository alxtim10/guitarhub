import { UserCartItem } from "@/types/cart";
import { useConvertRupiah } from "@/utils/useConvertRupiah";
import { Minus, Plus } from "flowbite-react-icons/outline";

export interface CartCardProps {
  data: UserCartItem
}

export default function CartCard({ data }: CartCardProps) {
  return (
    <div className='flex items-start justify-start gap-4 w-full border-b pt-3 h-full'>
      <div className='bg-green-400 h-32 w-44 rounded-xl'></div>
      <div className="w-full flex flex-col items-start justify-between h-full">
        <div className="flex flex-col items-start justify-center mt-2 h-full gap-1">
          <h1 className="font-bold text-lg">{data.product_name}</h1>
          <h1 className="bg-gray-300 px-2 py-1 rounded-full text-xs">{data.product_variant_name}</h1>
        </div>
        <div className="flex items-center justify-between w-full h-20">
          <h1 className="font-bold text-lg">{useConvertRupiah(data.price)}</h1>
          <div className="flex items-center justify-center gap-3">
            <span className="cursor-pointer border rounded-full p-1 bg-gray-200"><Minus className="w-5 h-5" /></span>
            <h1>{data.quantity}</h1>
            <span className="cursor-pointer border rounded-full p-1 bg-gray-200"><Plus className="w-5 h-5" /></span>
          </div>
        </div>
      </div>
    </div>
  )
}
