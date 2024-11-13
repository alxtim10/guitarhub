import { GetTransactionDetail } from "@/services/transaction";
import { UserTransactionDetailType } from "@/types/transaction";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useTransactionDetail = (id: string) => {

    const isFetching = useIsFetching();
    const { data, error } = useQuery<UserTransactionDetailType | null, Error>({
        queryKey: ["transaction_detail"],
        queryFn: () => GetTransactionDetail({ id: id }),
    });


    const [openModal, setOpenModal] = useState<boolean>(false);

    return {
        data,
        isFetching,
        openModal,
        setOpenModal
    }
}