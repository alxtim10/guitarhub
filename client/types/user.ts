
export interface StoreDetailType {
    id: number,
    user_id: string,
    name: string,
    domain: string,
    description: string,
    rating: string,
    location: string,
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