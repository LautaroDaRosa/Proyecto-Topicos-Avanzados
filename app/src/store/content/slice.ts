import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_STATUS } from 'utils/constants';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import authSaga from './saga';
import { PostsState, Post } from './types';

export const emptyPostsState = {
  posts: undefined,
  status: undefined,
};

export const initialState: PostsState = {
  postsApiResult: emptyPostsState,
};

const slice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    fetchPosts: state => {
      state.postsApiResult.status = API_STATUS.loading;
    },
    fetchPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      const posts = action.payload;
      state.postsApiResult = {
        status: API_STATUS.success,
        posts,
      };
    },
    fetchPostsError: state => {
      state.postsApiResult.status = API_STATUS.error;
    },

    addPost: (state, action: PayloadAction<{ content: string }>) => {
      state.postsApiResult.status = API_STATUS.loading;
    },

    addPostSuccess: (state, action: PayloadAction<Post>) => {
      const post = action.payload;
      state.postsApiResult.posts = state.postsApiResult.posts
        ? [post, ...state.postsApiResult.posts]
        : [post];
      state.postsApiResult.status = API_STATUS.success;
    },

    addPostError: state => {
      state.postsApiResult.status = API_STATUS.error;
    },
  },
});

export const { actions: postsActions, reducer } = slice;

export const PostSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  return { actions: slice.actions };
};
export default slice.reducer;
