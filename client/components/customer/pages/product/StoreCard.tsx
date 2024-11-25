import { StoreDetailType } from '@/types/store'
import React from 'react'

interface StoreCardProps {
    data: StoreDetailType
}

const StoreCard = ({ data }: StoreCardProps) => {
    return (
        <div className='mt-5 w-full border-y py-3 flex items-center justify-between'>
            <div className='flex items-center justify-center gap-2'>
                <div className='bg-green-300 w-10 h-10 rounded-full'></div>
                <div className='flex flex-col items-start justify-center mt-1'>
                    <div className='flex items-center justify-center gap-1'>
                        <h1 className='text-sm font-bold'>{data.name}</h1>
                        <svg className="w-[16px] h-[16px] text-blue-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='flex items-center justify-center gap-1'>
                        <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                        <h1 className='text-xs font-extralight'>Online</h1>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-1 border-2 w-fit px-3 rounded-full">
                <svg className="w-[15px] h-[15px] text-yellow-500 -ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <h1 className="text-sm mt-[0.12rem] font-bold">{data.rating}</h1>
            </div>
        </div>
    )
}

export default StoreCard