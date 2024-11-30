import { ProductDetailType, ProductVariantType } from '@/types/product'
import { useConvertRupiah } from '@/utils/useConvertRupiah'
import { Store } from 'flowbite-react-icons/outline'
import Image from 'next/image'
import React from 'react'

interface CheckoutProductCartProps {
    data: ProductDetailType,
    variantData: ProductVariantType
}

export default function CheckoutProductCart({ data, variantData }: CheckoutProductCartProps) {
    return (
        <div className="pb-5 pt-2">
            <div className="flex datas-center justify-between mb-2">
                <div className="flex items-center justify-start gap-1">
                    <Store />
                    <h1 className="mt-1">{data.store.name}</h1>
                </div>
            </div>
            <hr />
            <div className="flex flex-col gap-5 pt-5 px-2">
                <div className="relative flex gap-4">
                    <Image
                        src={data.image_url}
                        alt="product"
                        width={100}
                        height={100}
                        className="object-cover rounded-lg"
                    />
                    <div className="flex flex-col items-start mt-1">
                        <h1 className="text-lg font-bold">{data.name}</h1>
                        <h1 className="mt-1 text-xs text-black bg-white shadow-md text-center rounded-md px-2">{variantData.name}</h1>
                        <h1 className="mt-3 text-md font-bold text-center rounded-md">{useConvertRupiah(data.price)}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
