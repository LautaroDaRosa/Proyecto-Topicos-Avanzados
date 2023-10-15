import { createSlice } from '@reduxjs/toolkit';
import { API_STATUS } from 'utils/constants';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import authSaga from './saga';
import { AuthState } from './types';

export const emptyPostsState = {
  posts: undefined,
  status: undefined,
};

export const emptyUserState = {
  data: undefined,
  status: undefined,
};

export const initialState: AuthState = {
  login: {
    status: undefined,
    error: undefined,
  },
};

const slice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, _action) => {
      state.login.status = API_STATUS.loading;
      state.login.error = undefined;
    },
    loginSuccess: state => {
      state.login.status = API_STATUS.success;
    },
    loginError: (state, action) => {
      const { response } = action.payload;
      state.login.status = API_STATUS.error;
      state.login.error =
        response && response.hasOwnProperty('status')
          ? response.status
          : response;
    },
  },
});

export const { actions: authActions, reducer } = slice;

export const AuthSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  return { actions: slice.actions };
};
export default slice.reducer;
