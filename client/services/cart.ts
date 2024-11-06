import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { UserCart, UserCartParams } from "@/types/cart";


export const GetUserCart = async (params: UserCartParams): Promise<UserCart | null> => {
    try {
        const response = await axiosInstance.get(ENDPOINTS.GetUserCart, { params });
        return response.data.data;
    } catch (error) {
        throw new Error("Failed to fetch stores");
    }
};