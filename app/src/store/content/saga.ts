import { call, put, takeEvery } from 'redux-saga/effects';
import { Post } from './types';
import api from './api';
import { postsActions } from './slice';

export function* fetchPosts() {
  try {
    const data: Post[] = yield call(api.getPosts);
    yield put(postsActions.fetchPostsSuccess(data));
  } catch (error) {
    yield put(postsActions.fetchPostsError());
  }
}

export function* addPost(action) {
  try {
    const data: Post = yield call(api.addPost, action.payload);
    yield put(postsActions.addPostSuccess(data));
  } catch (error) {
    yield put(postsActions.addPostError());
  }
}

export default function* authSaga() {
  yield takeEvery(postsActions.fetchPosts.type, fetchPosts);
  yield takeEvery(postsActions.addPost.type, addPost);
}
