// services/categoryService.ts
import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import {
  CategoryDetailParams,
  CategoryDetailType,
  CategoryListParams,
  CategoryListType,
} from "@/types/category";

export const GetAllCategory = async (
  params: CategoryListParams
): Promise<CategoryListType | null> => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.GetAllCategory, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};
export const GetCategoryById = async (
  params: CategoryDetailParams
): Promise<CategoryDetailType | null> => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.GetCategoryById, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

export const AddCategory = async (body: {
  name: string;
  description: string;
}) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.AddCategory, body);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add category");
  }
};

export const EditCategory = async (body: {
  id: string;
  name: string;
  description: string;
}) => {
  try {
    const response = await axiosInstance.patch(ENDPOINTS.EditCategory, body);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add category");
  }
};

export const DeleteCategory = async (body: { id: string }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.DeleteCategory, body);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete category");
  }
};
