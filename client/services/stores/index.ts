import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { StoresListType } from "@/types/store";

export const GetAllStore = async (): Promise<StoresListType | null> => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.GetAllStore);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch stores");
  }
};
