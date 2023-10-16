import { axiosInstance } from 'utils/axios';
import { toCamel } from 'utils/convert-keys';
import { Provider } from './types';
import { CATEGORIES, PROVIDERS } from './endpoints';

export const getProviders = async () => {
  const response = await axiosInstance.get(PROVIDERS);
  return toCamel(response.data as Provider[]);
};

export const getCategories = async () => {
  const response = await axiosInstance.get(CATEGORIES);
  return response.data as string[];
};

const authApi = {
  getProviders,
  getCategories,
};

export default authApi;
