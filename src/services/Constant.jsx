//Category
export const API_CATEGORY = 'https://themeteorite.azurewebsites.net/api/v1/categories';


//Product
export const API_PRODUCT = 'https://themeteorite.azurewebsites.net/api/v1/products';
export const deteleProductImage = (filename) => {
  return API_PRODUCT + '/images/' + filename;
};
export const getProductImageUrl = (filename) => {
  return API_PRODUCT + '/images/' + filename;
};

//Login
export const API_LOGIN = 'https://themeteorite.azurewebsites.net/api/v1/auth/login';

//Order
export const API_ORDER = 'https://themeteorite.azurewebsites.net/api/v1/order';

//Players
export const API_PLAYER = 'https://themeteorite.azurewebsites.net/api/v1/player';
export const getPlayerImageUrl = (filename) => {
  return API_PLAYER + '/images/' + filename;
};
export const detelePlayerImage = (filename) => {
  return API_PLAYER + '/images/' + filename;
};