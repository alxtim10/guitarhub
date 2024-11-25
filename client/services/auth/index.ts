import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { LoginType, RegisterType } from "@/types/auth";

export const Register = async (params: RegisterType) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.Register, params);
    return response.data;
  } catch (error) {
    throw new Error("Failed to register account");
  }
};
