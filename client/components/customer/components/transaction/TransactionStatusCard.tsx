'use client'
import { UserTransactionDetailType } from '@/types/transaction'
import { AngleRight } from 'flowbite-react-icons/outline'
import { MapPinAlt } from 'flowbite-react-icons/solid'
import { useRouter } from 'next/navigation'

interface TransactionStatusCardProps {
    data: UserTransactionDetailType,
    setOpenModal: Function
}


export default function TransactionStatusCard({ data, setOpenModal }: TransactionStatusCardProps) {

    const router = useRouter();
    const getDefaultStyle = (id: number) => {
        if (id == 1) {
            return (
                <>
                    <div className='bg-red-500 rounded-t-lg px-4 py-3'>
                        <h1 className='text-white text-lg font-bold'>{data.transaction.status_name.toUpperCase()}</h1>
                    </div>
                    <div
                        onClick={() => setOpenModal(true)}
                        className='p-4 bg-green-400 cursor-pointer'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold text-white'>Finish Payment</h1>
                            <AngleRight className='w-4 h-4 text-white' />
                        </div>
                        <h1 className='text-sm text-white'>{data.transaction_detail.payment_method_name}</h1>
                    </div>
                </>
            )
        } else if (id == 2) {
            return (
                <>
                    <div className='bg-blue-500 rounded-t-lg px-4 py-3'>
                        <h1 className='text-white text-lg font-bold'>{data.transaction.status_name.toUpperCase()}</h1>
                    </div>
                    <div
                        onClick={() => router.push(`/transaction/detail/timeline?id=${data.id}`)}
                        className='p-4 bg-green-500 cursor-pointer'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold text-white'>Shipping Info</h1>
                            <AngleRight className='w-4 h-4 text-white' />
                        </div>
                        <h1 className='text-sm text-white'>{data.transaction_detail.shipping_name}</h1>
                    </div>
                </>
            )
        }
    }

    return (
        <div className='bg-white rounded-lg  shadow-md'>
            {getDefaultStyle(data.transaction.status_master_id)}
            <hr />
            <div className='p-4'>
                <h1 className='text-sm font-semibold'>Shipping Address</h1>
                <div className='flex items-start justify-start gap-2 mt-3'>
                    <MapPinAlt className='text-green-500 w-5 h-5 mt-1' />
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
