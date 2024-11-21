import React from "react";
import { ProductData } from "@/types/product";
import Image from "next/image";
import { useConvertRupiah } from "@/utils/useConvertRupiah";

interface CatalogCardProps {
  data: ProductData
}

const CatalogCard = ({ data }: CatalogCardProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Image src={data.image_url} alt="product" className="relative bg-green-200 rounded-lg" width={400} height={100} />
      <div>
        <h1 className="text-sm text-gray-700">{data.name}</h1>
        <div className="flex items-center justify-between">
          <h1 className="text-md font-semibold">{useConvertRupiah(Number(data.price))}</h1>
          <div className="flex items-center justify-center gap-1">
            <svg className="w-[15px] h-[15px] text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
            </svg>
            <h1 className="text-sm mt-[0.12rem] font-bold">5.0</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
