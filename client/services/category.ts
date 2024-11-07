
import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { CategoryData, ListStoreCategory } from "@/types/category";
import { StoreDetailParams } from "@/types/store";


export const GetAllCategoryByStoreId = async (params: StoreDetailParams): Promise<CategoryData[] | null> => {
    try {
        const response = await axiosInstance.get(ENDPOINTS.GetAllCategoryByStoreId, { params });
        return response.data.data;
    } catch (error) {
        throw new Error("Failed to fetch stores");
    }
};