'use client'
import { AngleRight, ArrowLeft } from 'flowbite-react-icons/outline';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useTransaction } from './hooks';
import { useConvertRupiah } from '@/utils/useConvertRupiah';
import LoadingWeb from '@/components/loaders/LoadingWeb';
import { formatDate } from '@/utils/useFormatter';
import Image from 'next/image';

export default function Transaction() {

    const router = useRouter();
    const { data, isFetching } = useTransaction();
    const statusList = ['All', 'Payment', 'Process', 'Done']
    const [selected, setSelected] = useState<number>(0);

    if (isFetching > 0) {
        return <LoadingWeb />
    }

    return (
        <section className='p-5'>
            <div className='flex items-center gap-3 mb-3'>
                <ArrowLeft
                    onClick={() => {
                        router.push('/profile');
                    }}
                    className='w-7 h-7 cursor-pointer' />
                <h1 className='font-bold text-lg'>Transactions</h1>
            </div>
            <div className='flex items-center justify-around w-full mt-10 mb-7 scroll-px-52'>
                {statusList.map((item, i) => {
                    return (
                        <div
                            onClick={() => {
                                setSelected(i);
                            }}
                            className={
                                `${i == 0 ? 'border-r-2 border-r-gray-500 pr-12' : ''} 
                            ${selected === i ? 'text-green-400' : 'text-gray-500'}
                            cursor-pointer transition-all`}>
                            <h1>{item}</h1>
                        </div>
                    )
                })}
            </div>
            {data && (
                data.map((item, i) => {
                    return (
                        <div
                            onClick={() => {
                                router.push(`/transaction/detail?id=${item.id}`);
                            }}
                            key={i}
                            className='cursor-pointer relative bg-gray-100 border shadow-lg px-1 pt-1 pb-1 rounded-xl w-full  gap-3'
                        >
                            <div className='flex items-center justify-between bg-white border shadow-sm p-3 rounded-xl'>
                                <div className='mt-1'>
                                    <div>
                                        <h1 className='font-bold'>{item.product.name}</h1>
                                        <span className='rounded-full text-xs text-gray-700'>{formatDate(item.transaction_detail.transaction_date.toString())}</span>
                                    </div>
                                </div>
                                <Image
                                    src={item.image_url}
                                    alt="product"
                                    width={65}
                                    height={65}
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className='flex items-center justify-between px-2 pt-4 pb-2'>
                                <h1 className='font-bold'>{useConvertRupiah(item.transaction_detail.total_price)}</h1>
                                <span className='bg-primary px-3 font-semibold py-1 rounded-full text-xs text-white'>{item.status.toUpperCase()}</span>
                            </div>
                        </div>
                    )
                })
            )}
        </section>
    )
}
