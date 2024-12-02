'use client'
import { UserTransactionDetailType } from '@/types/transaction'
import { AngleRight } from 'flowbite-react-icons/outline'
import { MapPinAlt } from 'flowbite-react-icons/solid'
import { useRouter } from 'next/navigation'

interface TransactionStatusCardProps {
    data: UserTransactionDetailType,
}


export default function TransactionStatusCard({ data }: TransactionStatusCardProps) {

    const router = useRouter();
    const getDefaultStyle = (id: number) => {
        if (id == 1) {
            return (
                <>
                    <div className='bg-red-500 rounded-t-lg px-4 py-3'>
                        <h1 className='text-white text-lg font-bold'>{data.transaction.status_name.toUpperCase()}</h1>
                        <h1 className='text-white text-sm font-bold'>{data.transaction.code}</h1>
                    </div>
                    <div
                        onClick={() => router.push(`/transaction/detail/timeline?id=${data.id}`)}
                        className='p-4 bg-green-400 cursor-pointer'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold text-white'>Finish Payment</h1>
                            <AngleRight className='w-4 h-4 text-white' />
                        </div>
                        <h1 className='text-sm text-white'>{data.transaction_detail.payment_method_name}</h1>
                    </div>
                </>
            )
        } else if (id >= 2 && id < 5) {
            return (
                <>
                    <div className='bg-orange-500 rounded-t-lg px-4 py-3'>
                        <h1 className='text-white text-lg font-bold'>{data.transaction.status_name.toUpperCase()}</h1>
                        <h1 className='text-white text-sm font-bold'>{data.transaction.code}</h1>
                    </div>
                    <div
                        onClick={() => router.push(`/transaction/detail/timeline?id=${data.id}`)}
                        className='p-4 bg-primary cursor-pointer'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold text-white'>Transaction Info</h1>
                            <AngleRight className='w-4 h-4 text-white' />
                        </div>
                    </div>
                </>
            )
        } else if (id >= 5 && id < 13) {
            return (
                <>
                    <div className='bg-orange-600 rounded-t-lg px-4 py-3'>
                        <h1 className='text-white text-lg font-bold'>{data.transaction.status_name.toUpperCase()}</h1>
                        <h1 className='text-white text-sm font-bold'>{data.transaction.code}</h1>
                    </div>
                    <div
                        onClick={() => router.push(`/transaction/detail/timeline?id=${data.id}`)}
                        className='p-4 bg-primary cursor-pointer'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold text-white'>Shipping Info</h1>
                            <AngleRight className='w-4 h-4 text-white' />
                        </div>
                        <h1 className='text-sm text-white'>{data.transaction_detail.shipping_name}</h1>
                    </div>
                </>
            )
        } else if (id == 13) {
            return (
                <>
                    <div className='bg-green-500 rounded-t-lg px-4 py-3'>
                        <h1 className='text-white text-lg font-bold'>{data.transaction.status_name.toUpperCase()}</h1>
                        <h1 className='text-white text-sm font-bold'>{data.transaction.code}</h1>
                    </div>
                    <div
                        onClick={() => router.push(`/transaction/detail/timeline?id=${data.id}`)}
                        className='p-4 bg-primary cursor-pointer'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold text-white'>Transaction Info</h1>
                            <AngleRight className='w-4 h-4 text-white' />
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <div className='bg-white rounded-lg shadow-md'>
            {getDefaultStyle(Number(data.transaction.status_master_id))}
            <hr />
            <div className='p-4'>
                <h1 className='text-sm font-semibold'>Shipping Address</h1>
                <div className='flex items-start justify-start gap-2 mt-3'>
                    <MapPinAlt className='text-primary w-5 h-5 mt-1' />
                    <div className='flex flex-col items-start justify-center'>
                        <div className='flex items-center justify-start gap-1'>
                            <h1 className='font-bold'>{data.user.fullname}</h1>
                            <h1 className='text-xs'>(+62) 811-1520-628</h1>
                        </div>
                        <h1 className='text-sm'>{data.transaction_detail.shipping_address}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
