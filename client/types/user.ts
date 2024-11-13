
export interface StoreDetailType {
    name: string,
    domain: string,
    user_id: string,
    description: string,
    location: string,
    rating: string,
    is_verified: boolean
}

export interface AddStoreParams {
    name: string,
    user_id: number,
    domain: string,
    location: string,
    description: string
}

export interface UserType {
    id: number,
    fullname: string,
    email: string,
    phone: string,
    address: string,
}