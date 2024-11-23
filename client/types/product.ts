import { CategoryDetailTypeV2 } from "./category";
import { StoreDetailType } from "./store";

export interface ProductsListType {
  total: number;
  current_page: number;
  last_page: number;
  sold_products: number;
  data: ProductData[];
}

export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  category_name: string;
  store_name: string;
  category: CategoryDetailTypeV2;
  store: StoreDetailType;
  image_url: string;
  variant: ProductVariantType[];
  stock_quantity: number;
  sold_quantity: number;
  discount_percentage: number;
  discount_start_date: Date;
  discount_end_date: Date;
  total_purchases: number;
}

export interface ProductVariantType {
  id: number,
  product_id: number,
  name: string,
  stock_quantity: number,
}



export interface VariantTypeRequest {
  name: string,
  stock_quantity: number
}

export interface AddProductParams {
  category_id: number,
  store_id: number,
  name: string,
  description: string,
  image_url: string,
  price: number,
  variant: VariantTypeRequest[],
  stock_quantity: number,
  rating: number
}

export interface ProductDetailType {
  id: number;
  name: string;
  description: string;
  price: number;
  category: CategoryDetailTypeV2;
  store: StoreDetailType;
  rating: number;
  image_url: string;
  stock_quantity: number;
  discount_percentage: number;
  discount_start_date: Date;
  discount_end_date: Date;
  total_purchases: number;
  variant: ProductVariantType[];
}