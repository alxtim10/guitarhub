export interface ShippingSectionType {
    shippingId: number,
    shippingName: string,
    shippingPrice: number,
}

export interface ShippingType {
    id: number,
    name: string,
    variant: ShippingVariantType[]
}

export interface ShippingVariantType {
    id: number,
    shipping_id: number,
    name: string,
    price: number,
}