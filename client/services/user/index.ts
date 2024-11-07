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

export const AddStore = async (params: AddStoreParams): Promise<StoreDetailType | null> => {
    try {
        const response = await axiosInstance.post(ENDPOINTS.AddStore, params);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch stores");
    }
};