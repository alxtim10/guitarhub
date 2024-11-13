import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { AddTransactionType, TransactionType, UserTransactionDetailType } from "@/types/transaction";


export const AddTransaction = async (body: AddTransactionType) => {
    try {
        const response = await axiosInstance.post(ENDPOINTS.AddTransaction, body);
        return response.data;
    } catch (error) {
        throw new Error("Failed to add transaction");
    }
};

export const GetAllTransaction = async (): Promise<TransactionType[] | null> => {
    try {
        const response = await axiosInstance.get(ENDPOINTS.GetAllTransaction);
        return response.data.data;
    } catch (error) {
        throw new Error("Failed to fetch transactions");
    }
};

export const GetTransactionDetail = async (params: { id: string }): Promise<UserTransactionDetailType | null> => {
    try {
        const response = await axiosInstance.get(ENDPOINTS.GetTransactionDetail, { params });
        return response.data.data;
    } catch (error) {
        throw new Error("Failed to fetch transaction detail");
    }
};