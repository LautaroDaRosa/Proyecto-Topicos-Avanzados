import { call, put, takeEvery } from 'redux-saga/effects';
import { Provider } from './types';
import api from './api';
import { providersActions } from './slice';

export function* fetchProviders() {
  try {
    const data: Provider[] = yield call(api.getProviders);
    yield put(providersActions.fetchProvidersSuccess(data));
  } catch (error) {
    yield put(providersActions.fetchProvidersError());
  }
}

export default function* authSaga() {
  yield takeEvery(providersActions.fetchProviders.type, fetchProviders);
}
