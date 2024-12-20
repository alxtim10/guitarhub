import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { AddCartItemParams, UserCart, UserCartParams } from "@/types/cart";


export const GetUserCart = async (params: UserCartParams): Promise<UserCart | null> => {
    try {
        const response = await axiosInstance.get(ENDPOINTS.GetUserCart, { params });
        return response.data.data;
    } catch (error) {
        throw new Error("Failed to fetch stores");
    }
};


export const AddCartItem = async (body: AddCartItemParams) => {
    try {
        const response = await axiosInstance.post(ENDPOINTS.AddCartItem, body);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

export const DeleteCartItem = async (body: { id: number }) => {
    try {
        const response = await axiosInstance.post(ENDPOINTS.DeleteCartItem, body);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};