export interface StoreData {
  id: number;
  name: string;
  description: string;
  location: string;
  rating: number;
  is_online: boolean;
  last_seen: Date;
}

export interface StoresListType {
  total: number;
  current_page: number;
  last_page: number;
  total_verified_stores: number;
  average_rating: number;
  data: StoreData[];
}

export interface StoreDetailParams {
  id: number
}
