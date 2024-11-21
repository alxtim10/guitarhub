import { GetAllProduct } from "@/services/product";
import { ProductsListType } from "@/types/product";
import { useQuery } from "@tanstack/react-query";


export const useCatalog = () => {

    const { data, isLoading, error } = useQuery<ProductsListType | null, Error>({
        queryKey: ["store_products"],
        queryFn: () => GetAllProduct(),
    });

    return {
        data
    }
}