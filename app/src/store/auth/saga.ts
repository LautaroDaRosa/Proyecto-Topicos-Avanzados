/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery } from 'redux-saga/effects';
import api from './api';
import { authActions } from './slice';
import { LoginDataType } from './types';
import TokenService from 'utils/tokenService';

export function* login(action) {
  try {
    const { username, password } = action.payload;
    const { access, refresh }: LoginDataType = yield call(
      api.login,
      username,
      password,
    );
    yield call(TokenService.setLocalTokens, access, refresh);
    yield put(authActions.loginSuccess());
  } catch (error: any) {
    yield put(authActions.loginError(error));
  }
}

export default function* authSaga() {
  yield takeEvery(authActions.login.type, login);
}
