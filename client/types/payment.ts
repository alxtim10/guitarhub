export interface PaymentMethodSectionType {
    payment_method_id: number,
    admin_fee: number,
    payment_method_name: string
}

export interface PaymentMethodType {
    id: number,
    name: string,
    variant: PaymentMethodVariantType[]
}

export interface PaymentMethodVariantType {
    id: number,
    payment_method_category_id: number,
    name: string,
    admin_fee: number,
}