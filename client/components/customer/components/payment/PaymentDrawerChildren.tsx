import { PaymentMethodType } from "@/types/payment";
import { useConvertRupiah } from "@/utils/useConvertRupiah";

interface PaymentDrawerChildrenProps {
    data: PaymentMethodType[],
    setPriceSection: Function,
    setShowModal: Function,
    setIsChoosed: Function
}

export default function PaymentDrawerChildren(props: PaymentDrawerChildrenProps) {
    return (
        <div>
            {props.data && props.data.map((item, i) => {
                return (
                    <div
                        className="flex flex-col gap-1 mt-3"
                        key={i}>
                        <h1>{item.name}</h1>
                        <div className="flex flex-col gap-2 mt-2">
                            {item.variant.map((variant, i) => {
                                return (
                                    <div
                                        onClick={() => {
                                            props.setPriceSection((prev: any) => ({
                                                ...prev,
                                                paymentId: item.id,
                                                adminFee: variant.admin_fee,
                                                paymentName: variant.name
                                            }))
                                            props.setShowModal(false);
                                            props.setIsChoosed(true);
                                        }}
                                        className="flex items-center justify-between border border-slate-300 px-4 py-3 cursor-pointer rounded-md">
                                        <h1>{variant.name}</h1>
                                        <h1>{useConvertRupiah(variant.admin_fee)}</h1>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
