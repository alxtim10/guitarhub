export interface AddCategoryType {
  name: string;
  description: string;
  user_id?: number
}

export interface EditCategoryType {
  id: string;
  name: string;
  description: string;
}

export interface CategoryListParams {
  page?: number;
}

export interface CategoryDetailParams {
  id?: string;
}

export interface CategoryData {
  id: Number;
  name: string;
  description: string;
  store_id: number
}

export interface CategoryListType {
  total: number;
  current_page: number;
  last_page: number;
  data: CategoryData[];
}

export interface ListStoreCategory {
  data: CategoryData[]
}

export interface CategoryDetailType {
  data: {
    id: string;
    name: string;
    description: string;
  };
}
