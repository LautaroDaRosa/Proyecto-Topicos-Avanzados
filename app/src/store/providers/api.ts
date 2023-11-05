import { axiosInstance } from 'utils/axios';
import { toCamel } from 'utils/convert-keys';
import { ProvidersPage, SearchProps } from './types';
import { CATEGORIES, PROVIDERS } from './endpoints';
import { Profile } from 'types';

export const getProviders = async (page: number, size: number) => {
  const url = `${PROVIDERS}?page=${page}&size=${size}`;
  const response = await axiosInstance.get(url);
  return toCamel(response.data as ProvidersPage);
};

export const getProvider = async (id: string) => {
  const url = `${PROVIDERS}/${id}`;
  const response = await axiosInstance.get(url);
  return toCamel(response.data as Profile);
};

export const filterProviders = async (
  page: number,
  size: number,
  props: SearchProps,
) => {
  let url = `${PROVIDERS}/filter?page=${page}&size=${size}`;
  url += props.name !== '' ? `&name=${props.name}` : '';
  url += props.businessName !== '' ? `&businessName=${props.businessName}` : '';
  url += props.rut !== '' ? `&rut=${props.rut}` : '';
  url += props.score !== '' ? `&score=${props.score}` : '';
  url += props.category !== '' ? `&category=${props.category}` : '';
  const response = await axiosInstance.get(url);
  return toCamel(response.data as ProvidersPage);
};

export const getCategories = async () => {
  const response = await axiosInstance.get(CATEGORIES);
  return response.data as string[];
};

const authApi = {
  getProviders,
  getProvider,
  getCategories,
  filterProviders,
};

export default authApi;
