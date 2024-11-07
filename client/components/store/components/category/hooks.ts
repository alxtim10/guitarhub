import { GetAllCategoryByStoreId } from "@/services/category";
import { CategoryData, ListStoreCategory } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


export const useStoreCategory = () => {


    const { data, error } = useQuery<CategoryData[] | null, Error>({
        queryKey: ["store_category"],
        queryFn: () => GetAllCategoryByStoreId({ id: 1 }),
    });
    const [storeCategoryData, setStoreCategoryData] = useState<CategoryData[]>();
    useEffect(() => {
        if (data) {
            setStoreCategoryData(data);
        }
    }, [data])

    return {
        storeCategoryData
    }

}