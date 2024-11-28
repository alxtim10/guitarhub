'use client'
import { ArrowLeft } from "flowbite-react-icons/outline";
import { CheckCircle, MapPinAlt, Truck } from "flowbite-react-icons/solid";
import { useRouter, useSearchParams } from "next/navigation"

export default function TransactionTimeline() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id') || 0;

    const experienceData = [
        {
            title: "Tunggu Penjemputan",
            description: "Menunggu Penjemputan oleh Abdul",
            date: "2 Jan 2024, 08.00",
        },
        {
            title: "Penjemputan Diajukan",
            description: "Pengajuan penjemputan untuk order telah dibuat",
            date: "1 Jan 2024, 08.00",
        },
        {
            title: "Paket Sedang Dipersiapkan",
            description: "Paket sedang dipersiapkan",
            date: "1 Jan 2024, 08.00",
        }
    ];

    return (
        <section className='p-5'>
            <div className='flex items-center gap-3 mb-3'>
                <ArrowLeft
                    onClick={() => {
                        router.push('/transaction');
                    }}
                    className='w-7 h-7 cursor-pointer' />
                <h1 className='font-bold text-lg'>Track My Package</h1>
            </div>
            <div className="mt-10 bg-green-400 p-3 rounded-full flex items-center justify-between">
                <div className="bg-green-100 rounded-full p-3 shadow-lg">
                    <Truck className="text-green-700" />
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-white font-bold tracking-widest">PENDING</h1>
                    <h1 className="text-white text-sm">SHIP123YXS</h1>
                </div>
                <div className="bg-green-100 rounded-full p-3 shadow-lg">
                    <MapPinAlt className="text-green-700" />
                </div>
            </div>
            <div className="">
                <div className="p-5">
                    <section className="mt-3 h-full w-full pl-4">
                        {experienceData.map((data, i) => {
                            return (
                                <div key={i}
                                    className="relative pl-8 py-4 group">
                                    <div className="group-last:before:hidden before:absolute before:left-0 sm:before:left-0 before:h-full before:px-[0.5px] before:bg-primary  before:self-start before:-translate-x-1/2 before:translate-y-3 ">
                                        <CheckCircle className="text-primary absolute bg-white rounded-full left-0 -translate-x-1/2 translate-y-1.5" />
                                    </div>
                                    <p className="font-semibold">{data.title}</p>
                                    <p className="">
                                        {data.description}
                                    </p>
                                    <p className="text-subtitle text-sm mt-1">
                                        {data.date}
                                    </p>
                                </div>
                            )
                        })}
                    </section>
                </div>

            </div>
        </section>
    )
}
