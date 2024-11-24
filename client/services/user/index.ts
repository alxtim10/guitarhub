import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { AddStoreParams, StoreDetailType } from "@/types/user";


export const GetStoreDetail = async (): Promise<StoreDetailType | null> => {
    try {
        const response = await axiosInstance.get(ENDPOINTS.GetStoreDetailByUserId);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch stores");
    }
};

