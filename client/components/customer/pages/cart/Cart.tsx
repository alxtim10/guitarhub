'use client'
import { ArrowLeft } from 'flowbite-react-icons/outline';
import { useRouter } from 'next/navigation';
import CartCard from '../../components/cart/CartCard';
import { useCart } from './hooks';

export default function Cart() {

    const router = useRouter();
    const { cartData } = useCart();

    return (
        <section>
            <div className='flex items-center gap-3 mb-3 p-5'>
                <ArrowLeft
                    onClick={() => {
                        router.back();
                    }}
                    className='w-7 h-7 cursor-pointer' />
                <h1 className='font-bold text-lg'>Cart</h1>
            </div>
            <div className='p-5 flex flex-col gap-3'>
                {cartData && cartData.items.map((item, i) => {
                    return (
                        <div key={i}>
                            <CartCard data={item} />
                            <hr />
                        </div>
                    )
                })}
            </div>
            <button className='absolute bottom-7 mx-4 left-0 right-0 bg-green-500 p-4 max-w-auto rounded-full text-white'>Checkout</button>
        </section>
    )
}
