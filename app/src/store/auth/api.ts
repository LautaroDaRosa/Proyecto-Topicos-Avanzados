import { axiosInstance } from 'utils/axios';
import { toCamel, toSnake } from 'utils/convert-keys';
import TokenService from 'utils/tokenService';
import { LOGIN, REFRESH } from './endpoints';

import { LoginDataType } from './types';

const login = async (username, password) => {
  const response = await axiosInstance.post(LOGIN, {
    username,
    password,
  });
  return toCamel(response.data as LoginDataType);
};

const refresh = async () => {
  const data = {
    refresh: TokenService.getLocalRefreshToken(),
    grantType: 'refresh_token',
  };
  const response = await axiosInstance.post(REFRESH, toSnake(data));
  return toCamel(response.data);
};

const authApi = {
  login,
  refresh,
};

export default authApi;
