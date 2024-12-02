import { CancelTransactionStatus, GetAllTransactionTimeline, GetTransactionDetail, SetTransactionStatus } from "@/services/transaction";
import { SetTransactionStatusParams, TransactionTimelineType, UserTransactionDetailType } from "@/types/transaction";
import { useIsFetching, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export const useTransactionTimeline = (id: number) => {

    const router = useRouter();
    const isFetching = useIsFetching();
    const queryClient = useQueryClient();
    const { data } = useQuery<TransactionTimelineType[] | null, Error>({
        queryKey: ["transaction_timeline", id],
        queryFn: () => GetAllTransactionTimeline({ id: id }),
    });

    const { data: detailData } = useQuery<UserTransactionDetailType | null, Error>({
        queryKey: ["transaction_detail", id],
        queryFn: () => GetTransactionDetail({ id: id.toString() }),
    });

    const mutation = useMutation({
        mutationFn: SetTransactionStatus,
        onSuccess: (response) => {
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ['transaction_detail', id] })
            queryClient.invalidateQueries({ queryKey: ['transaction_timeline', id] })

        },
        onError: (error) => {
            console.error("Error set transaction status:", error);
        },
    });

    const handleSetTransactionStatus = () => {
        mutation.mutate({
            id: id,
            status_master_id: Number(detailData?.transaction.status_master_id) + 1
        });
    };

    const mutationCancelStatus = useMutation({
        mutationFn: CancelTransactionStatus,
        onSuccess: (response) => {
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ['transaction_detail', id] })
            queryClient.invalidateQueries({ queryKey: ['transaction_timeline', id] })

        },
        onError: (error) => {
            console.error("Error set transaction status:", error);
        },
    });

    const handleCancelTransactionStatus = () => {
        mutationCancelStatus.mutate({
            id: id,
            status_master_id: 13
        });
    };

    return {
        data,
        detailData,
        isFetching,
        handleSetTransactionStatus,
        handleCancelTransactionStatus
    }
}