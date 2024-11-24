'use client'
import { ArrowLeft } from 'flowbite-react-icons/outline';
import { useRouter } from 'next/navigation';
import { useCart } from './hooks';
import LoadingWeb from '@/components/loaders/LoadingWeb';
import CartStore from '../../components/cart/CartStore';
import { useConvertRupiah } from '@/utils/useConvertRupiah';

export default function Cart() {

    const router = useRouter();
    const { data, isFetching } = useCart();

    if (isFetching > 0) {
        return <LoadingWeb />
    }

    return (
        <section className='pb-32'>
            <div className='flex items-center gap-3 mb-3 px-5 pt-5'>
                <ArrowLeft
                    onClick={() => {
                        router.back();
                    }}
                    className='w-7 h-7 cursor-pointer' />
                <h1 className='font-bold text-lg'>Cart</h1>
            </div>
            {data && (
                <>
                    <div className='flex flex-col gap-3 mt-5 px-5'>
                        {data.items.map((item, i) => {
                            return (
                                <div key={i}>
                                    <CartStore data={item} />
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                    <div className='fixed py-5 px-5 border-t left-0 mx-auto max-w-auto bottom-0 bg-white w-full z-[999] flex items-end justify-between'>
                        <h1 className='text-xs text-slate-500'>Total Price</h1>
                        <h1 className='font-bold text-green-500'>{useConvertRupiah(data.total_price)}</h1>
                    </div>
                </>
            )}
            <div className="coupon">
                <div className="cut-circle left"></div>
                <div className="cut-circle right"></div>
                <div className="content">
                    <h2>Coupon Title</h2>
                    <p>Use this coupon to save!</p>
                </div>
            </div>
        </section>
    )
}
