import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { LoginType } from "@/types/auth";


export const Login = async (params: LoginType) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.Login, params);
      return response.data;
    } catch (error) {
      throw new Error("Failed to register account");
    }
  };