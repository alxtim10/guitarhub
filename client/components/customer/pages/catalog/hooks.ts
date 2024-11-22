import { GetAllProduct } from "@/services/product";
import { ProductsListType } from "@/types/product";
import { useQuery } from "@tanstack/react-query";


export const useCatalog = () => {

    const { data, error } = useQuery<ProductsListType | null, Error>({
        queryKey: ["catalog_product"],
        queryFn: () => GetAllProduct(),
    });

    return {
        data
    }
}