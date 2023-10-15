import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

import TokenService from 'utils/tokenService';

export const selectDomain = (state: RootState) =>
  state?.authSlice || initialState;

export const isUserLoggedIn = () => TokenService.getLocalAccessToken() !== null;

export const loginStatus = createSelector(
  selectDomain,
  authState => authState.login.status,
);
