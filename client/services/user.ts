import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { UserType } from "@/types/user";

export const GetUserById = async (params: {
    id: string
}): Promise<UserType | null> => {
    try {
        const response = await axiosInstance.get(ENDPOINTS.GetUserById, { params });
        return response.data.data;
    } catch (error) {
        throw new Error("Failed to fetch user");
    }
};