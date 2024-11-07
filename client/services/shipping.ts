

import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { ShippingType } from "@/types/shipping";


export const GetAllShipping = async (): Promise<ShippingType[] | null> => {
    try {
        const response = await axiosInstance.get(ENDPOINTS.GetAllShipping);
        return response.data.data;
    } catch (error) {
        throw new Error("Failed to fetch stores");
    }
};