export const getFeedPostsSelector = rootState =>
  rootState?.postsSlice?.postsApiResult?.posts || undefined;
