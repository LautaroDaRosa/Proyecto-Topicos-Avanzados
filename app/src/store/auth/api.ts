import { axiosInstance } from 'utils/axios';
import { toCamel, toSnake } from 'utils/convert-keys';
import TokenService from 'utils/tokenService';
import { LOGIN, REFRESH } from './endpoints';

import { LoginDataType } from './types';
import { Profile } from 'types';

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

export const getMyProfile = async () => {
  const url = `/user/my_profile`;
  const response = await axiosInstance.get(url);
  return toCamel(response.data as Profile);
};

const authApi = {
  login,
  refresh,
  getMyProfile,
};

export default authApi;
