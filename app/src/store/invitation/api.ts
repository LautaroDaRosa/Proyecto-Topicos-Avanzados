import { axiosInstance } from 'utils/axios';
import { toCamel } from 'utils/convert-keys';
import { INVITE } from './endpoints';
import { Invitation } from './types';

export const sendInvitation = async (email: string) => {
  const response = await axiosInstance.post(`${INVITE}/send?email=${email}`);
  return toCamel(response.data);
};

export const getInvitation = async () => {
  const response = await axiosInstance.get(`${INVITE}/get`);
  return response.data as Invitation[];
};

export const respondInvitation = async (status: 'ACCEPTED' | 'REJECTED') => {
  await axiosInstance.post(`${INVITE}/respond?status=${status}`);
};

const authApi = {
  sendInvitation,
  getInvitation,
};

export default authApi;
