'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import StoreCard from './StoreCard';
import Image from 'next/image';
import { useProductDetail } from './hooks';
import LoadingWeb from '@/components/loaders/LoadingWeb';
import { useConvertRupiah } from '@/utils/useConvertRupiah';
import { AngleLeft } from 'flowbite-react-icons/outline';

export default function ProductDetail() {

    const { id: product_id } = useParams<{ id: string }>();
    const { data, isFetching, selectedItem, handleClick, request, setRequest, handleAdd } = useProductDetail(product_id);

    if (isFetching > 0) {
        return <LoadingWeb />
    }

    return (
        <div>
            {data && (
                <>
                    <Link href={'/'} className='absolute top-5 left-5 z-[99]'>
                        <AngleLeft className='bg-white rounded-full w-7 h-7 p-1 shadow-xl border border-gray-500' />
                    </Link>
                    <div className="relative w-full h-[450px] bg-gray-300 rounded-b-xl">
                        <Image alt="" src={data.image_url} fill className="object-cover rounded-b-xl" />
                    </div>
                    <div className='p-4'>
                        <h1 className='font-semibold text-lg'>{data.name}</h1>
                        <div className='flex items-center justify-start gap-2'>
                            <div className="flex items-center justify-center gap-1 border-2 mt-2 w-fit px-3 rounded-full">
                                <svg className="w-[15px] h-[15px] text-yellow-500 -ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                </svg>
                                <h1 className="text-sm mt-[0.12rem] font-bold">{data.rating}</h1>
                            </div>
                            <h1 className='text-[0.65rem] mt-2'>0 Reviews</h1>
                        </div>
                        <div className='grid grid-cols-3 gap-2 mt-2'>
                            {data.variant.map((item: any, i: any) => {
                                return (
                                    <div
                                        onClick={() => {
                                            handleClick(item);
                                            setRequest((prev: any) => ({
                                                ...prev,
                                                product_variant_id: item.id
                                            }))
                                        }}
                                        key={i} className={`w-full flex items-center justify-center text-xs border-2 ${selectedItem === item ? 'border-green-500 bg-primary text-white' : 'border-black bg-white'} cursor-pointer transition-all font-medium rounded-full px-2 py-1 mt-2`}>
                                        {item.name}
                                    </div>
                                )
                            })}
                        </div>
                        <h1 className='font-bold text-xs mt-4'>Description</h1>
                        <p className='text-sm mt-1 font-normal'>{data.description}
                        </p>
                        <StoreCard data={data.store} />
                    </div>
                    {/* <Catalog title={'For You'} /> */}
                    <div className='fixed bottom-0 h-[65px] border-t z-[99] px-4 py-2 bg-white w-full left-0 flex items-center justify-between mt-3'>
                        <h1 className='font-bold text-md w-full'>{useConvertRupiah(Number(data.price))}</h1>
                        <button
                            onClick={handleAdd}
                            className='bg-primary text-white py-3 px-2 w-full text-[0.9rem] rounded-2xl font-bold shadow-md'>Add to Cart</button>
                    </div>
                </>
            )}
        </div>
    )
}
