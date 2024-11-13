export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  store: string;
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

export interface ProductsListType {
  total: number;
  current_page: number;
  last_page: number;
  sold_products: number;
  data: ProductData[];
}
