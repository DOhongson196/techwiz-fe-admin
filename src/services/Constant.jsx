//Category
export const API_CATEGORY = 'http://localhost:8080/api/v1/categories';


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

//Players
export const API_PLAYER = 'http://localhost:8080/api/v1/player';
export const getPlayerImageUrl = (filename) => {
  return API_PLAYER + '/images/' + filename;
};
