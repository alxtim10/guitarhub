import { ShippingType } from "@/types/shipping"
import { useConvertRupiah } from "@/utils/useConvertRupiah"

interface ShippingDrawerChildrenProps {
    data: ShippingType[],
    setPriceSection: Function,
    setShowModal: Function,
    setIsChoosed: Function
}


export default function ShippingDrawerChildren(props: ShippingDrawerChildrenProps) {
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
                                    <div key={i}
                                        onClick={() => {
                                            props.setPriceSection((prev: any) => ({
                                                ...prev,
                                                shipping_id: item.id,
                                                shipping_variant_id: variant.id,
                                                shipping_price: variant.price,
                                                shipping_name: variant.name
                                            }))
                                            props.setShowModal(false);
                                            props.setIsChoosed(true);
                                        }}
                                        className="flex items-center justify-between border border-slate-300 px-4 py-3 cursor-pointer rounded-md">
                                        <h1>{variant.name}</h1>
                                        <h1>{useConvertRupiah(variant.price)}</h1>
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
