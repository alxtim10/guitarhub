'use client'
import { AngleRight, ArchiveArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowsRepeat, ArrowUp, CheckCircle, ChevronLeft, Eye, Rocket, Wallet } from 'flowbite-react-icons/outline'
import { AddressBook, Cart, Cash, Store, User, UserCircle } from 'flowbite-react-icons/solid'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useProfile } from './hooks';
import LoadingWeb from '@/components/loaders/LoadingWeb';
import { toast } from 'react-toastify';

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
                    <div className='pt-5 px-5'>
                        <div className='flex items-center gap-3'>
                            <ArrowLeft
                                onClick={() => {
                                    router.push('/');
                                }}
                                className='w-7 h-7 cursor-pointer' />
                            <h1 className='font-bold text-lg'>My Profile</h1>
                        </div>
                    </div>
                    <div className='relative mx-2 p-4 bg-primary shadow-md flex flex-col items-start justify-between rounded-3xl mt-5 min-h-[320px]'>
                        <div className='absolute top-2 right-2 shadow-lg cursor-pointer'>
                            <UserCircle className='w-10 h-10 text-white' />
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='text-lg font-bold text-[#f0f0f0]'>Hello,</h1>
                            <h1 className='text-2xl font-bold text-white'>{data.fullname}</h1>
                            <div className='mt-1 text-[0.6rem] w-fit shadow-md bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full px-3 py-1'>Gold Member</div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className='text-white'>
                                <div className='flex items-center gap-1'>
                                    <h1 className='text-sm'>Total Balance</h1>
                                    <Eye className='w-5 h-5 cursor-pointer' />
                                </div>
                                <h1 className='font-bold text-3xl mt-1'>Rp 2.000.000</h1>
                            </div>
                            <div className='flex items-center gap-5'>
                                <div className='flex flex-col items-center gap-2 justify-center cursor-pointer'>
                                    <div className='bg-gray-100 border rounded-full p-3'>
                                        <ArrowDown className='w-6 h-6' />
                                    </div>
                                    <h1 className='text-xs text-white'>Withdraw</h1>
                                </div>
                                <div className='flex flex-col items-center gap-2 justify-center cursor-pointer'>
                                    <div className='bg-gray-100 border rounded-full p-3'>
                                        <ArrowUp className='w-6 h-6' />
                                    </div>
                                    <h1 className='text-xs text-white'>Top Up</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mx-2'>
                        <div className='py-4 mt-3 bg-white shadow-md rounded-3xl flex items-center justify-around'>
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
                            className='flex items-center justify-center gap-1 mt-3'>
                            <h1 className='text-xs cursor-pointer'>Transactions</h1>
                            <ArrowRight className='w-5 h-5 cursor-pointer' />
                        </div>
                        <div
                            onClick={() => {
                                router.push('/profile/store')
                            }}
                            className='px-4 py-4 bg-white flex items-center justify-between shadow-md rounded-3xl mt-5 cursor-pointer'>
                            <div className='flex items-center justify-center gap-2'>
                                <Store className='text-primary' />
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
                            <div
                                className='flex items-center justify-between cursor-pointer'>
                                <div className='flex items-center justify-center gap-2'>
                                    <ArrowsRepeat />
                                    <h1 className='mt-[2px]'>Payment Method</h1>
                                </div>
                                <AngleRight className='w-4 h-4' />
                            </div>
                            <h1
                                onClick={() => {
                                    toast.success('Logged Out', {
                                        position: "bottom-center",
                                        autoClose: 3000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    })
                                    window.localStorage.removeItem("user_id");
                                    router.refresh();
                                    router.push('/login');
                                }}
                                className='text-center text-red-600 font-bold cursor-pointer mt-3'>Log Out</h1>
                        </div>
                    </div>
                </>
            )}
            <h1 className='absolute text-xs bottom-8 left-0 text-center w-full text-slate-400'>Guitarhub ©</h1>
            <h1 className='absolute text-xs bottom-4 left-0 text-center w-full text-slate-400'>v1.0</h1>
        </div>
    )
}
