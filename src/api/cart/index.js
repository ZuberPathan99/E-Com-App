import { AxiosInstance } from '../../util/AxiosInstance'

export const createCart = async () => {

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const URI = '/carts'

  const headers = { 'Authorization': `Bearer ${token}` };

  try {

    const response = await AxiosInstance.post(URI, { userId }, { headers });
    const { id } = response.data;
    localStorage.setItem('cartId', id);
    return response;

  } catch (error) {

    console.error(error);
    throw error;

  }


}


export const updateCart = async (existingProducts, product, action) => {

  const cartId = localStorage.getItem("cartId");

  const URI = `/carts/${cartId}`;

  const token = localStorage.getItem("token");

  const headers = {
    'Authorization': `Bearer ${token}`
  }

  let productIds = [];

  if (action === 'ADD') {

    productIds.push(product);
    existingProducts.forEach(item => {

      productIds.push(item.id);

    });

  } else {

    existingProducts.forEach(item => {

      if (item.id !== product) {

        productIds.push(item.id);

      }

    })

  }


  try {

    const response = await AxiosInstance.put(URI, { productIds }, { headers });
  
    return response;

  } catch (error) {
    console.log(error);
    throw error;

  }

}


export const getCart = async () => {

  const cartId = localStorage.getItem("cartId");

  const URI = `/carts/${cartId}`;

  const token = localStorage.getItem("token");
  

  const headers = {
    'Authorization': `Bearer ${token}`
  }

  try {

    const cart = await AxiosInstance.get(URI, { headers });
  
    return cart;

  } catch (error) {

    throw error;

  }

}