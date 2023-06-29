import axiosInstance from './axiosInstance';

const userProductsPath = '/user/purchased-products';
export const getPurchasedProducts = async () => {
  try {
    const response = await axiosInstance.get(userProductsPath);
    return response.data;
  } catch {
    return null;
  }
};
