import { axiosInstance } from 'utils/axios';
import { toCamel } from 'utils/convert-keys';
import { Post } from './types';
import { PICTURES, POSTS } from './endpoints';
import { Picture } from 'types';

export const getPosts = async () => {
  const response = await axiosInstance.get(POSTS);
  return toCamel(response.data as Post[]);
};

export const addPost = async payload => {
  const response = await axiosInstance.post(POSTS, payload);
  return toCamel(response.data as Post);
};

export const getPictures = async () => {
  const response = await axiosInstance.get(PICTURES);
  return response.data as Picture[];
};

export const deletePicture = async id => {
  await axiosInstance.delete(`${PICTURES}${id}/`);
};

const authApi = {
  getPosts,
  addPost,
  getPictures,
  deletePicture,
};

export default authApi;
