import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { AddTransactionType, SetTransactionStatusParams, TransactionTimelineType, TransactionType, UserTransactionDetailType } from "@/types/transaction";


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

export const SetTransactionStatus = async (body: SetTransactionStatusParams) => {
    try {
        const response = await axiosInstance.post(ENDPOINTS.SetTransactionStatus, body);
        return response.data;
    } catch (error) {
        throw new Error("Failed to set transaction status");
    }
};
export const GetAllTransactionTimeline = async (params: { id: number }): Promise<TransactionTimelineType[] | null> => {
    try {
        const response = await axiosInstance.get(ENDPOINTS.GetAllTransactionTimeline, { params });
        return response.data.data;
    } catch (error) {
        throw new Error("Failed to fetch transaction detail");
    }
};