'use client'
import { AngleRight, ArrowLeft } from "flowbite-react-icons/outline";
import { CheckCircle, MapPinAlt, Truck } from "flowbite-react-icons/solid";
import { useRouter, useSearchParams } from "next/navigation"
import { useTransactionTimeline } from "./hooks";
import { formatDate } from "@/utils/useFormatter";
import LoadingWeb from "@/components/loaders/LoadingWeb";

export default function TransactionTimeline() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = Number(searchParams.get('id')) || 0;

    const { data, isFetching, detailData, handleSetTransactionStatus, handleCancelTransactionStatus } = useTransactionTimeline(id);

    if (isFetching > 0) {
        return <LoadingWeb />
    }

    return (
        <section className='p-5'>
            {data && detailData && (
                <>
                    <div className='flex items-center gap-3 mb-3'>
                        <ArrowLeft
                            onClick={() => {
                                router.back();
                            }}
                            className='w-7 h-7 cursor-pointer' />
                        <h1 className='font-bold text-lg'>Track My Transaction</h1>
                    </div>
                    <div className="mt-10 bg-green-400 p-3 rounded-full flex items-center justify-between">
                        <div className="bg-green-100 rounded-full p-3 shadow-lg">
                            <Truck className="text-green-700" />
                        </div>
                        <div className="flex flex-col items-center">
                            <h1 className="text-white font-bold tracking-widest">{detailData.transaction.code}</h1>
                            <h1 className="text-white text-sm">{detailData.transaction.status_name}</h1>
                        </div>
                        <div className="bg-green-100 rounded-full p-3 shadow-lg">
                            <MapPinAlt className="text-green-700" />
                        </div>
                    </div>
                    {Number(detailData.transaction.status_master_id) != 13 && (
                        <div className="flex items-center justify-center mt-5 gap-4">
                            <button
                                onClick={() => {
                                    handleSetTransactionStatus();
                                }}
                                className="bg-primary text-white rounded-full shadow-lg px-3 py-1 text-sm flex items-center justify-between gap-1">
                                <h1>Next Step</h1>
                                <AngleRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => {
                                    handleCancelTransactionStatus();
                                }}
                                className="bg-red-500 text-white rounded-full shadow-lg px-3 py-1 text-sm flex items-center justify-between gap-1">
                                <h1>Cancel</h1>
                            </button>
                        </div>
                    )}

                    <div className="px-5 pt-2">
                        <section className="mt-3 h-full w-full pl-4">
                            {data.map((data, i) => {
                                return (
                                    <div key={i}
                                        className="relative pl-8 py-4 group">
                                        <div className="group-last:before:hidden before:absolute before:left-0 sm:before:left-0 before:h-full before:px-[0.5px] before:bg-primary  before:self-start before:-translate-x-1/2 before:translate-y-3 ">
                                            <CheckCircle className="text-primary absolute bg-white rounded-full left-0 -translate-x-1/2 translate-y-1.5" />
                                        </div>
                                        <p className="mt-1 font-semibold">
                                            {data.message}
                                        </p>
                                        <p className="text-subtitle text-sm mt-1">
                                            {formatDate(data.event_date.toString())}
                                        </p>
                                    </div>
                                )
                            })}
                        </section>
                    </div>
                </>
            )}

        </section>
    )
}
