import { axiosInstance } from 'utils/axios';
import { USERS } from './endpoints';
import { EmployeeWithPosts, MinimalEmployee } from 'types';
import { toCamel } from 'utils/convert-keys';

export const getEmployee = async id => {
  const response = await axiosInstance.get(`${USERS + id}/`);
  return toCamel(response.data as EmployeeWithPosts);
};

export const getEmployees = async () => {
  const response = await axiosInstance.get(USERS);
  return response.data as MinimalEmployee[];
};

export const getPermissions = async () => {
  const response = await axiosInstance.get(`${USERS}permissions/`);
  return response.data as string[];
};

const authApi = {
  getEmployee,
  getEmployees,
  getPermissions,
};

export default authApi;
