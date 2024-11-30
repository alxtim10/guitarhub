'use client'
import TransactionStatusCard from '@/components/customer/components/transaction/TransactionStatusCard';
import { useConvertRupiah } from '@/utils/useConvertRupiah';
import { ArrowLeft } from 'flowbite-react-icons/outline';
import { Cart, ObjectsColumn } from 'flowbite-react-icons/solid';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useTransactionDetail } from './hooks';
import LoadingWeb from '@/components/loaders/LoadingWeb';
import { formatDate } from '@/utils/useFormatter';
import ModalBase from '@/components/customer/components/modal/Modal';
import Image from 'next/image';

export default function TransactionDetail() {

  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const router = useRouter();
  const {
    data,
    isFetching,
  } = useTransactionDetail(id);

  if (isFetching > 0) {
    return <LoadingWeb />
  }

  return (
    <section className='p-5'>
      <div className='flex items-center gap-3 mb-3'>
        <ArrowLeft
          onClick={() => {
            router.push('/transaction');
          }}
          className='w-7 h-7 cursor-pointer' />
        <h1 className='font-bold text-lg'>Transaction</h1>
      </div>
      {data && (
        <>
          <TransactionStatusCard data={data} />
          <div className='bg-stone-100 border rounded-lg shadow-md p-2 mt-5'>
            <div className='flex items-center gap-1'>
              <ObjectsColumn className='w-5 h-5' />
              <h1 className='font-bold'>Product</h1>
            </div>
            <div className='bg-white p-3 mt-3 rounded-lg'>
              <div className='relative h-[400px]'>
                <Image
                  src={data.image_url}
                  alt="product"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className='mt-3'>
                <h1 className='text-sm text-stone-500'>Product Name</h1>
                <h1 className='font-bold'>{data.transaction_detail.product_name}</h1>
              </div>
              <div className='mt-3'>
                <h1 className='text-sm text-stone-500'>Variant</h1>
                <h1 className='font-bold'>{data.transaction_detail.product_variant_name}</h1>
              </div>
              <div className='mt-3'>
                <h1 className='text-sm text-stone-500'>Order Date</h1>
                <h1 className='font-bold'>{formatDate(data.transaction_detail.transaction_date.toString())}</h1>
              </div>
              <div className='mt-3'>
                <h1 className='text-sm text-stone-500'>Order ID</h1>
                <h1 className='font-bold'>{data.id}</h1>
              </div>
            </div>
          </div>
          <div className='bg-stone-100 border rounded-lg shadow-md p-2 mt-5'>
            <div className='flex items-center gap-1'>
              <Cart className='w-5 h-5' />
              <h1 className='font-bold'>Order Summary</h1>
            </div>
            <div className='bg-white p-3 mt-3 rounded-lg'>
              <div>
                <h1 className='text-sm text-stone-500'>Product Price</h1>
                <h1 className='font-bold'>{useConvertRupiah(data.transaction_detail.product_price)}</h1>
              </div>
              <div className='mt-3'>
                <h1 className='text-sm text-stone-500'>Shipping</h1>
                <h1 className='font-bold'>{useConvertRupiah(data.transaction_detail.shipping_price)} - {data.transaction_detail.shipping_name} </h1>
              </div>
              <div className='mt-3'>
                <h1 className='text-sm text-stone-500'>Admin Fee</h1>
                <h1 className='font-bold'>{useConvertRupiah(data.transaction_detail.admin_fee)} - {data.transaction_detail.payment_method_name}</h1>
              </div>
              <hr className='mt-3' />
              <div className='mt-3'>
                <h1 className='text-sm text-stone-500'>Total</h1>
                <h1 className='font-bold text-primary'>{useConvertRupiah(data.transaction_detail.total_price)}</h1>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
