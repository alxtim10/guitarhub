'use client'
import { AngleRight, ArrowLeft, MapPin } from 'flowbite-react-icons/outline';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useCart } from '../cart/hooks';
import CartStore from '../../components/cart/CartStore';
import { useConvertRupiah } from '@/utils/useConvertRupiah';
import ShippingDrawer from '../../components/shipping/ShippingDrawer';
import { useCheckout } from './hooks';
import PaymentDrawer from '../../components/payment/PaymentDrawer';

export default function Checkout() {

    const router = useRouter();
    const {
        handleAdd,
        showModalShipping,
        setShowModalShipping,
        onCloseModalShipping,
        showModalPayment,
        setShowModalPayment,
        onCloseModalPayment,
        isPayment,
        setIsPayment,
        isShipping,
        setIsShipping,
        shippingSection,
        setShippingSection,
        paymentMethodSection,
        setPaymentMethodSection,
    } = useCheckout();
    const { data } = useCart();

    return (
        <section className='px-5 pb-28'>
            {data && (
                <>
                    <div className='flex items-center gap-3 mb-3 py-5'>
                        <ArrowLeft
                            onClick={() => {
                                router.back();
                            }}
                            className='w-7 h-7 cursor-pointer' />
                        <h1 className='font-bold text-lg'>Checkout</h1>
                    </div>
                    <div className='flex items-center gap-5 cursor-pointer'>
                        <div className='overflow-hidden'>
                            <div className='flex items-center gap-2'>
                                <MapPin />
                                <h1>Home</h1>
                            </div>
                            <p className='text-sm text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap mt-2'> Jl. Medan Merdeka Utara, RT.3/RW.2, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota</p>
                        </div>
                        <AngleRight className='w-5 h-5' />
                    </div>
                    <hr className='mt-2' />
                    <div className='flex flex-col gap-3 mt-5'>
                        {data && data.items.map((item, i) => {
                            return (
                                <div key={i}>
                                    <CartStore data={item} />
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                    <div className='flex items-center justify-center gap-2 w-full mt-3'>
                        {isShipping ?
                            <>
                                <div
                                    onClick={() => {
                                        setShowModalShipping(true);
                                    }}
                                    className='w-full border border-gray-300 rounded-lg px-5 flex flex-col items-start justify-center h-[70px] cursor-pointer mt-3'>
                                    <h1 className='text-sm'>{shippingSection.shipping_name}</h1>
                                    <h1 className='text-xs text-gray-500'>{useConvertRupiah(shippingSection.shipping_price)}</h1>
                                </div>
                            </>
                            :
                            <>
                                <div
                                    onClick={() => {
                                        setShowModalShipping(true);
                                    }}
                                    className='w-full border border-gray-300 rounded-lg px-5 py-4 h-[70px] flex items-center justify-between cursor-pointer mt-3'>
                                    <h1 className='text-sm'>Shipping</h1>
                                    <AngleRight className='w-4 h-4' />
                                </div>
                            </>
                        }
                        {isPayment ?
                            <>
                                <div
                                    onClick={() => {
                                        setShowModalPayment(true);
                                    }}
                                    className='w-full border border-gray-300 rounded-lg px-5 flex flex-col items-start justify-center h-[70px] cursor-pointer mt-3'>
                                    <h1 className='text-sm'>{paymentMethodSection.payment_method_name}</h1>
                                    <h1 className='text-xs text-gray-500'>{useConvertRupiah(paymentMethodSection.admin_fee)}</h1>
                                </div>
                            </>
                            :
                            <>
                                <div
                                    onClick={() => {
                                        setShowModalPayment(true);
                                    }}
                                    className='w-full border border-gray-300 rounded-lg px-5 py-4 h-[70px] flex items-center justify-between cursor-pointer mt-3'>
                                    <h1 className='text-sm'>Payment</h1>
                                    <AngleRight className='w-4 h-4' />
                                </div>
                            </>
                        }
                    </div>
                    <div className='my-6'>
                        <hr className='border-dashed border-2 mb-5' />
                        <div className='flex items-center justify-between'>
                            <h1 className='text-slate-600 text-sm'>Sub Total</h1>
                            <h1 className='text-sm'>{useConvertRupiah(data.total_price)}</h1>
                        </div>
                        <div className='flex items-center justify-between mt-4'>
                            <h1 className='text-slate-600 text-sm'>Shipping Price</h1>
                            <h1 className='text-sm'>{useConvertRupiah(shippingSection.shipping_price)}</h1>
                        </div>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-slate-600 text-sm'>Admin Fee</h1>
                            <h1 className='text-sm'>{useConvertRupiah(paymentMethodSection.admin_fee)}</h1>
                        </div>
                        <hr className='border-dashed border-2 mt-5' />
                        <div className='flex items-center justify-between mt-5'>
                            <h1 className='text-slate-600 text-lg font-bold'>Total</h1>
                            <h1 className='text-lg font-bold text-green-500'>{useConvertRupiah(Number(data.total_price) + Number(shippingSection.shipping_price) + Number(paymentMethodSection.admin_fee))}</h1>
                        </div>
                    </div>
                </>
            )}
            <div className='fixed pt-5 pb-7 px-5 border-t left-0 mx-auto max-w-auto bottom-0 bg-white w-full'>
                <button
                    onClick={() => {
                        handleAdd({
                            user_id: 1,
                            shipping_id: shippingSection.shipping_id,
                            shipping_variant_id: shippingSection.shipping_variant_id,
                            payment_method_id: paymentMethodSection.payment_method_id,
                            discount_price: 0,
                            is_discount: false,
                            shipping_address: 'Kuningan, Jakarta Selatan'
                        })
                    }}
                    className='bg-green-500 p-4 w-full rounded-full text-white'>Order</button>
            </div>
            <ShippingDrawer
                modalActive={showModalShipping}
                closeModal={onCloseModalShipping}
                setIsChoosed={setIsShipping}
                setShowModal={setShowModalShipping}
                setPriceSection={setShippingSection}
            />
            <PaymentDrawer
                modalActive={showModalPayment}
                closeModal={onCloseModalPayment}
                setIsChoosed={setIsPayment}
                setShowModal={setShowModalPayment}
                setPriceSection={setPaymentMethodSection}
            />
        </section>
    )
}
