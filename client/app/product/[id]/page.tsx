'use client'

import Catalog from '@/components/customer/pages/catalog/Catalog'
import StoreCard from '@/components/customer/pages/product/StoreCard'
import Link from 'next/link'
import React, { useState } from 'react'

const page = ({ params }: { params: { id: string } }) => {

    const types = [
        'Emerald Green',
        'Blue',
        'Red'
    ]

    const [selectedItem, setSelectedItem] = useState(null);

    const handleClick = (item: any) => {
        setSelectedItem(item);
    };

    return (
        <div>
            <Link href={'/'} className='absolute top-[5.5rem] left-7'>
                <svg className="shadow-md w-7 h-7 bg-white text-gray-800 border-2 border-white rounded-full dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                </svg>
            </Link>
            <div className="bg-green-200 w-full h-60 rounded-lg"></div>
            <div className='fixed bottom-0 h-[65px] border-t z-[99] px-3 bg-white w-full left-0 flex items-center justify-between mt-3'>
                <h1 className='font-bold text-md w-full'>Rp. 12.500.000</h1>
                <button className='bg-green-500 text-white py-3 px-2 w-full text-[0.9rem] rounded-2xl font-bold shadow-md'>Add to Cart</button>
            </div>
            <h1 className='font-semibold text-lg mt-4'>PRS Silver Sky SE</h1>
            <div className='flex items-center justify-start gap-2'>
                <div className="flex items-center justify-center gap-1 border-2 mt-2 w-fit px-3 rounded-full">
                    <svg className="w-[15px] h-[15px] text-yellow-500 -ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <h1 className="text-sm mt-[0.12rem] font-bold">5.0</h1>
                </div>
                <h1 className='text-[0.65rem] mt-2'>120 Reviews</h1>
            </div>
            <div className='grid grid-cols-3 gap-2 mt-2'>
                {types.map((item: any, i: any) => {
                    return (
                        <div
                            onClick={() => handleClick(item)}
                            key={i} className={`w-full flex items-center justify-center text-xs border-2 ${selectedItem === item ? 'border-green-500 bg-green-500 text-white' : 'border-black bg-white'} cursor-pointer transition-all font-medium rounded-full px-2 py-1 mt-2`}>
                            {item}
                        </div>
                    )
                })}
            </div>
            <h1 className='font-bold text-xs mt-4'>Description</h1>
            <p className='text-sm mt-1 font-normal'>The PRS Silver Sky is a premium electric guitar that combines classic design
                with modern performance. Crafted in collaboration with renowned guitarist
                John Mayer.
            </p>
            <StoreCard />
            <Catalog />
        </div>
    )
}

export default page