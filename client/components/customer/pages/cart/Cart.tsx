'use client'
import { ArrowLeft } from 'flowbite-react-icons/outline';
import { useRouter } from 'next/navigation';
import { useCart } from './hooks';
import LoadingWeb from '@/components/loaders/LoadingWeb';
import CartStore from '../../components/cart/CartStore';
import { useConvertRupiah } from '@/utils/useConvertRupiah';

export default function Cart() {

    const router = useRouter();
    const { cartData, isFetching } = useCart();

    if (isFetching > 0) {
        return <LoadingWeb />
    }

    return (
        <section className='pb-32'>
            {cartData && (
                <>
                    <div className='flex items-center gap-3 mb-3 px-5 pt-5'>
                        <ArrowLeft
                            onClick={() => {
                                router.back();
                            }}
                            className='w-7 h-7 cursor-pointer' />
                        <h1 className='font-bold text-lg'>Cart</h1>
                    </div>
                    <div className='flex flex-col gap-3 mt-5 px-5'>
                        {cartData && cartData.items.map((item, i) => {
                            return (
                                <div key={i}>
                                    <CartStore data={item} />
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                    <div className='fixed pt-5 pb-7 px-5 border-t left-0 mx-auto max-w-auto bottom-0 bg-white w-full z-[999] flex items-center justify-center gap-10'>
                        <div>
                            <h1 className='text-xs text-slate-500'>Total Price</h1>
                            <h1 className='font-bold text-green-500'>{useConvertRupiah(cartData.total_price)}</h1>
                        </div>
                        <button
                            onClick={() => {
                                router.push('/checkout')
                            }}
                            className='bg-green-500 p-4 w-full rounded-full text-white'>Checkout</button>
                    </div>
                </>
            )}

        </section>
    )
}
