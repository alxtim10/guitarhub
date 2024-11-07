import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { PaymentMethodType } from "@/types/payment";


export const GetAllPaymentMethod = async (): Promise<PaymentMethodType[] | null> => {
    try {
        const response = await axiosInstance.get(ENDPOINTS.GetAllPaymentMethod);
        return response.data.data;
    } catch (error) {
        throw new Error("Failed to fetch stores");
    }
};