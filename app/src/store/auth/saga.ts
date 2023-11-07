/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery } from 'redux-saga/effects';
import api from './api';
import { authActions } from './slice';
import { LoginDataType } from './types';
import TokenService from 'utils/tokenService';
import currentUser from 'utils/currentUser';

export function* login(action) {
  try {
    const { username, password } = action.payload;
    const user: LoginDataType = yield call(api.login, username, password);
    yield call(api.login, username, password);

    yield call(TokenService.setLocalTokens, user.token, user.token);
    yield call(currentUser.set, user);
    yield put(authActions.loginSuccess());
  } catch (error: any) {
    yield put(authActions.loginError(error));
  }
}

export default function* authSaga() {
  yield takeEvery(authActions.login.type, login);
}
