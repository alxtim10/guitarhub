import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { StoreDetailParams, StoresListType } from "@/types/store";
import { AddStoreParams, StoreDetailType } from "@/types/user";

export const GetAllStore = async (): Promise<StoresListType | null> => {
    try {
        const response = await axiosInstance.get(ENDPOINTS.GetAllStore);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch stores");
    }
};

export const GetStoreDetailByUserId = async (params: StoreDetailParams): Promise<StoreDetailType | null> => {
    try {
        const response = await axiosInstance.get(ENDPOINTS.GetStoreDetailByUserId, { params });
        return response.data.data;
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


