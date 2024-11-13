export interface ShippingSectionType {
    shipping_id: number,
    shipping_variant_id: number,
    shipping_name: string,
    shipping_price: number,
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