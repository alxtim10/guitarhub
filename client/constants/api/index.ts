const BASE_URL = "http://127.0.0.1:8000/api";

export const ENDPOINTS = {
  GetAllCategory: `${BASE_URL}/GetAllCategory`,
  GetAllCategoryByStoreId: `${BASE_URL}/GetAllCategoryByStoreId`,
  GetCategoryById: `${BASE_URL}/GetCategoryById`,
  AddCategory: `${BASE_URL}/AddCategory`,
  EditCategory: `${BASE_URL}/EditCategory`,
  DeleteCategory: `${BASE_URL}/DeleteCategory`,
  GetAllStore: `${BASE_URL}/GetAllStore`,
  GetStoreDetailByUserId: `${BASE_URL}/GetStoreDetailByUserId`,
  AddStore: `${BASE_URL}/AddStore`,
  GetAllProduct: `${BASE_URL}/GetAllProduct`,
  Register: `/Register`,
  Login: `/Login`,
  GetAllShipping: `/GetAllShipping`,
  GetAllPaymentMethod: `/GetAllPaymentMethod`,

  GetUserCart: '/GetUserCart',
  AddTransaction: '/AddTransaction',
  GetAllTransaction: '/GetAllTransaction',
  GetTransactionDetail: '/GetTransactionDetail',

  AddProduct: '/AddProduct'
};
