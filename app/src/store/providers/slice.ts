import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_STATUS } from 'utils/constants';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import authSaga from './saga';
import { ProvidersState, Provider } from './types';

export const emptyPostsState = {
  providers: undefined,
  status: undefined,
};

export const initialState: ProvidersState = {
  providersApiResult: emptyPostsState,
};

const slice = createSlice({
  name: 'providersSlice',
  initialState,
  reducers: {
    fetchProviders: state => {
      state.providersApiResult.status = API_STATUS.loading;
    },
    fetchProvidersSuccess: (state, action: PayloadAction<Provider[]>) => {
      const providers = action.payload;
      state.providersApiResult = {
        status: API_STATUS.success,
        providers,
      };
    },
    fetchProvidersError: state => {
      state.providersApiResult.status = API_STATUS.error;
    },
  },
});

export const { actions: providersActions, reducer } = slice;

export const ProvidersSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  return { actions: slice.actions };
};
export default slice.reducer;
