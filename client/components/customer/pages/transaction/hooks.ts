import { GetAllTransaction } from "@/services/transaction";
import { TransactionType } from "@/types/transaction";
import { useIsFetching, useQuery } from "@tanstack/react-query";

export const useTransaction = () => {

    const isFetching = useIsFetching();
    const { data, error } = useQuery<TransactionType[] | null, Error>({
        queryKey: ["transaction"],
        queryFn: () => GetAllTransaction(),
    });

    return {
        data,
        isFetching
    }
}