export const API = () => {
  const baseUrl = 'http://localhost:3001/api/v1/';

  const executeAPI = async (endpoint, config) => {
    const response = await fetch(baseUrl + endpoint, config);
    const data = await response.json();
    return data;
  };

  return {
    get: executeAPI,
    post: executeAPI,
    put: executeAPI,
    delete: executeAPI,
  };
};

export const getProducts = async () => {
  const response = await API().get('/products');
  return response.data.products;
};

export const getToppings = async () => {
  const response = await API().get('/toppings');
  return response.data.toppings;
};

export const getTypeCoffee = async () => {
  const response = await API().get('/typecoffee');
  return response.data.products;
};
