import { axiosInstance } from 'utils/axios';
import { toCamel, toSnake } from 'utils/convert-keys';
import TokenService from 'utils/tokenService';
import { USER, REFRESH, LOGIN } from './endpoints';

import { LoginDataType, RegisterDataType } from './types';
import { Profile } from 'types';

const login = async (username, password) => {
  const response = await axiosInstance.post(`${LOGIN}`, {
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
  const url = `/user/myProfile`;
  const response = await axiosInstance.get(url);
  return toCamel(response.data as Profile);
};

export const register = async (newUser: RegisterDataType) => {
  await axiosInstance.post(`${USER}/register`, newUser);
};

const authApi = {
  login,
  refresh,
  getMyProfile,
};

export default authApi;
