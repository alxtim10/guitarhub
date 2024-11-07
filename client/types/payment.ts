export interface PaymentMethodSectionType {
    paymentMethodId: number,
    adminFee: number,
    paymentMethodName: string
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