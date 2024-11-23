import { GetUserById } from "@/services/user";
import { UserType } from "@/types/user";
import { useIsFetching, useQuery } from "@tanstack/react-query";

export const useProfile = () => {

    const id = window.localStorage.getItem('user_id');
    const { data, error } = useQuery<UserType | null, Error>({
        queryKey: ["user_detail", id],
        queryFn: () => GetUserById({ id: id || '' }),
    });
    const isFetching = useIsFetching();

    return {
        data,
        isFetching
    }
}