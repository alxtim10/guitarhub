import { ProductData, ProductVariantType } from "./product"
import { UserType } from "./user"

export interface AddTransactionType {
    user_id: number,
    shipping_id: number,
    shipping_variant_id: number,
    payment_method_id: number,
    discount_price: number,
    is_discount: boolean,
    shipping_address: string
}

export interface TransactionType {
    id: number,
    user_id: number,
    status: string,
    total_price: number,
    transaction_detail: TransactionDetailType,
    product: ProductData,
    image_url: string
}

export interface UserTransactionDetailType {
    id: number,
    user: UserType,
    transaction: TransactionType,
    transaction_detail: TransactionDetailType,
    image_url: string
}


export interface TransactionDetailType {
    id: number,
    transaction_id: number,
    transaction_date: Date,
    shipping_id: number,
    shipping_name: string,
    payment_method_id: number,
    payment_method_name: string,
    product_price: number,
    product_id: number,
    product_name: string,
    product_variant_id: number,
    product_variant_name: string,
    shipping_price: number,
    admin_fee: number,
    discount_price: number,
    is_discount: number,
    total_price: number,
    shipping_address: string,
}