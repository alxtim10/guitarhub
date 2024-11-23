'use client'
import { AngleRight, ArchiveArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowsRepeat, ArrowUp, CheckCircle, ChevronLeft, Eye, Rocket, Wallet } from 'flowbite-react-icons/outline'
import { AddressBook, Cart, Cash, Store, User, UserCircle } from 'flowbite-react-icons/solid'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useProfile } from './hooks';
import LoadingWeb from '@/components/loaders/LoadingWeb';

export default function Profile() {

    const router = useRouter();
    const { data, isFetching } = useProfile();

    if (isFetching > 0) {
        return <LoadingWeb />
    }

    return (
        <div>
            {data && (
                <>
                    <div className='bg-green-400 pt-6 pb-10 px-4 w-full rounded-b-3xl'>
                        <div className='flex items-center gap-3 mb-3'>
                            <ArrowLeft
                                onClick={() => {
                                    router.push('/');
                                }}
                                className='text-white w-7 h-7 cursor-pointer' />
                            <h1 className='font-bold text-white text-lg'>My Profile</h1>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <UserCircle className='w-[5rem] h-[5rem] text-white' />
                            <div className='flex flex-col items-center justify-center gap-1'>
                                <h1 className='text-lg font-bold text-white'>{data.fullname}</h1>
                                <div className='text-[0.6rem] w-fit shadow-md bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full px-3 py-1'>Gold Member</div>
                            </div>
                        </div>
                    </div>
                    <div className='mx-8'>
                        <div className='py-4 -mt-7 bg-white shadow-md rounded-lg flex items-center justify-around'>
                            <div className='cursor-pointer flex flex-col items-center justify-center gap-1'>
                                <Wallet />
                                <h1 className='text-xs font-bold'>Payment</h1>
                            </div>
                            <div className='cursor-pointer flex flex-col items-center justify-center gap-1'>
                                <ArchiveArrowDown />
                                <h1 className='text-xs font-bold'>Process</h1>
                            </div>
                            <div className='cursor-pointer flex flex-col items-center justify-center gap-1'>
                                <Rocket />
                                <h1 className='text-xs font-bold'>Shipping</h1>
                            </div>
                            <div className='cursor-pointer flex flex-col items-center justify-center gap-1'>
                                <CheckCircle />
                                <h1 className='text-xs font-bold'>Done</h1>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                router.push('/transaction')
                            }}
                            className='cursor-pointer flex items-center justify-center gap-1 mt-3'>
                            <h1 className='text-xs'>Transactions</h1>
                            <ArrowRight className='w-5 h-5' />
                        </div>
                        <div className='px-4 py-4 bg-white flex items-center justify-between shadow-md rounded-lg mt-5'>
                            <div>
                                <div className='flex items-center gap-1'>
                                    <h1 className='text-sm'>Total Balance</h1>
                                    <Eye className='w-5 h-5 cursor-pointer' />
                                </div>
                                <h1 className='font-bold text-xl mt-1'>Rp 2.000.000</h1>
                            </div>
                            <div className='flex items-center justify-around gap-5 mr-3'>
                                <div className='flex flex-col items-center gap-1 justify-center cursor-pointer'>
                                    <div className='bg-gray-100 border rounded-full p-3'>
                                        <ArrowDown className='w-6 h-6' />
                                    </div>
                                    <h1 className='text-xs'>Withdraw</h1>
                                </div>
                                <div className='flex flex-col items-center gap-1 justify-center cursor-pointer'>
                                    <div className='bg-gray-100 border rounded-full p-3'>
                                        <ArrowUp className='w-6 h-6' />
                                    </div>
                                    <h1 className='text-xs'>Top Up</h1>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                router.push('/profile/store')
                            }}
                            className='px-4 py-4 bg-white flex items-center justify-between shadow-md rounded-lg mt-5 cursor-pointer'>
                            <div className='flex items-center justify-center gap-2'>
                                <Store className='text-green-500' />
                                <h1 className='font-bold mt-[2px]'>My Store</h1>
                            </div>
                            <AngleRight className='w-4 h-4' />
                        </div>
                        <hr className='border my-5' />
                        <div className='flex flex-col justify-center gap-5'>
                            <div className='flex items-center justify-between cursor-pointer'>
                                <div className='flex items-center justify-center gap-2'>
                                    <User />
                                    <h1 className='mt-[2px]'>Account</h1>
                                </div>
                                <AngleRight className='w-4 h-4' />
                            </div>
                            <div
                                onClick={() => {
                                    router.push('/cart')
                                }}
                                className='flex items-center justify-between cursor-pointer'>
                                <div className='flex items-center justify-center gap-2'>
                                    <Cart />
                                    <h1 className='mt-[2px]'>Cart</h1>
                                </div>
                                <AngleRight className='w-4 h-4' />
                            </div>
                            <div className='flex items-center justify-between cursor-pointer'>
                                <div className='flex items-center justify-center gap-2'>
                                    <AddressBook />
                                    <h1 className='mt-[2px]'>Address</h1>
                                </div>
                                <AngleRight className='w-4 h-4' />
                            </div>
                            <div className='flex items-center justify-between cursor-pointer'>
                                <div className='flex items-center justify-center gap-2'>
                                    <ArrowsRepeat />
                                    <h1 className='mt-[2px]'>Payment Method</h1>
                                </div>
                                <AngleRight className='w-4 h-4' />
                            </div>
                        </div>
                    </div>
                </>
            )}
            <h1 className='absolute text-xs bottom-8 left-0 text-center w-full text-slate-400'>Guitarhub ©</h1>
            <h1 className='absolute text-xs bottom-4 left-0 text-center w-full text-slate-400'>v1.0</h1>
        </div>
    )
}
