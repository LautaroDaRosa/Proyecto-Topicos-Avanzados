/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import tokenService from './tokenService';
import { LOGIN } from 'store/auth/endpoints';
import { rootNavigate } from 'app/routes/CustomRouter';
import api from 'store/auth/api';

function getHeaders() {
  const headers = { Authorization: '' };
  const token = tokenService.getLocalAccessToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export const parseJwt = token => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// AXIOS INSTANCE
export const axiosInstance = axios.create({
  baseURL: `https://topicos-avanzados-backend.azurewebsites.net`,
  headers: getHeaders(),
});

axiosInstance.interceptors.request.use(request => {
  const headers =
    request.data?.grant_type === 'refresh_token' ? {} : getHeaders();

  request.headers = headers;
  return request;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalConfig = error.config;
    if (originalConfig.url !== LOGIN && error.response) {
      // Access Token has expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const refresh = tokenService.getLocalRefreshToken();
        // const decodedJwt = parseJwt(refresh);
        // if there isn't a refresh token or the refresh token is expired
        if (
          !refresh // || (decodedJwt && decodedJwt.exp * 1000 < Date.now())
        ) {
          tokenService.removeLocalTokens();
          rootNavigate('/login');
          return;
        }
        try {
          const { access } = await api.refresh();
          tokenService.updateLocalAccessToken(access);
          return axiosInstance(originalConfig);
        } catch (_error: any) {
          if (_error.response?.data?.error === 'invalid_grant') {
            tokenService.removeLocalTokens();
          }
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  },
);
