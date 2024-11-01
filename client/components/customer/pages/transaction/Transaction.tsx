'use client'
import { ArrowLeft } from 'flowbite-react-icons/outline';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Transaction() {

    const router = useRouter();

    const statusList = ['All', 'Payment', 'Process', 'Done']
    const [selected, setSelected] = useState<number>(0);

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
            <div className='flex items-center justify-around w-full mt-10'>
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
            <div className='mt-8 flex flex-col items-center justify-center gap-5 w-full'>
                {[...Array(2)].map((_, i) => {
                    return (
                        <div
                            key={i}
                            className='cursor-pointer relative bg-white shadow-md p-5 rounded-xl w-full flex items-start justify-start gap-3'
                        >
                            <div className='bg-green-300 h-[100px] w-[100px] rounded-xl'></div>
                            <div className='mt-1'>
                                <div>
                                    <h1 className='font-bold'>Yamaha Pacifica viifm200</h1>
                                    <span className='rounded-full bg-gray-200 px-2 text-xs text-gray-700'>Emerald Green</span>
                                </div>
                                <h1 className='font-bold mt-3'>Rp 7.500.000</h1>
                            </div>
                            <span className='absolute bottom-3 right-3 bg-green-500 px-3 py-1 rounded-full text-xs text-white'>Done</span>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
