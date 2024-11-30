import { GetTransactionDetail, SetTransactionStatus } from "@/services/transaction";
import { SetTransactionStatusParams, UserTransactionDetailType } from "@/types/transaction";
import { useIsFetching, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useTransactionDetail = (id: string) => {

    const router = useRouter();
    const isFetching = useIsFetching();
    const queryClient = useQueryClient();
    const { data, error } = useQuery<UserTransactionDetailType | null, Error>({
        queryKey: ["transaction_detail", id],
        queryFn: () => GetTransactionDetail({ id: id }),
    });

    const mutation = useMutation({
        mutationFn: SetTransactionStatus,
        onSuccess: (response) => {
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ['transaction_detail', id] })

        },
        onError: (error) => {
            console.error("Error set transaction status:", error);
        },
    });

    const handleSetTransactionStatus = (request: SetTransactionStatusParams) => {
        mutation.mutate(request);
    };


    const [openModal, setOpenModal] = useState<boolean>(false);

    return {
        data,
        isFetching,
        openModal,
        setOpenModal,
        handleSetTransactionStatus
    }
}