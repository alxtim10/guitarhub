import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { ProductsListType } from "@/types/product";

export const GetAllProduct = async (): Promise<ProductsListType | null> => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.GetAllProduct);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};
