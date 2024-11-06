export interface UserCartParams {
    id: number
}

export interface UserCartItem {
    cart_id: number,
    product_id: number,
    product_name: string,
    product_variant_id: number,
    product_variant_name: string,
    price: number,
    quantity: number
}

export interface UserCart {
    id: number,
    user_id: number,
    total_price: number,
    items: UserCartItem[]
}