import { axiosInstance } from 'utils/axios';
import { toCamel } from 'utils/convert-keys';
import { Provider } from './types';
import { PROVIDERS } from './endpoints';

export const getProviders = async () => {
  const response = await axiosInstance.get(PROVIDERS);
  return toCamel(response.data as Provider[]);
};

const authApi = {
  getProviders,
};

export default authApi;
