//Category
export const API_CATEGORY = 'http://localhost:8080/api/v1/categories';

//Manufacturer
export const API_MANUFACTURER = 'http://localhost:8080/api/v1/manufacturers';
export const getManufacturerLogoUrl = (filename) => {
  return API_MANUFACTURER + '/logo/' + filename;
};

//Product
export const API_PRODUCT = 'http://localhost:8080/api/v1/products';
export const deteleProductImage = (filename) => {
  return API_PRODUCT + '/images/' + filename;
};
export const getProductImageUrl = (filename) => {
  return API_PRODUCT + '/images/' + filename;
};

//Login
export const API_LOGIN = 'http://localhost:8080/api/v1/auth/login';

//Order
export const API_ORDER = 'http://localhost:8080/api/v1/order';
