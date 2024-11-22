export interface UserCartParams {
    id: number
}

export interface UserCartStore {
    store_id: number,
    store_name: string,
    price: number,
    quantity: number,
    products: UserCartStoreProduct[]
}

export interface UserCartStoreProduct {
    cart_id: number,
    product_id: number,
    product_name: string,
    product_variant_id: number,
    product_variant_name: string,
    image_url: string,
    price: number,
    quantity: number
}

export interface UserCart {
    id: number,
    user_id: number,
    total_price: number,
    items: UserCartStore[]
}

export interface AddCartItemParams {
    user_id: number,
    store_id: number,
    product_id: number,
    product_variant_id: number,
    quantity: number
}