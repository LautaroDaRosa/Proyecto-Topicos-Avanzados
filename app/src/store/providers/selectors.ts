export const getProvidersSelector = rootState =>
  rootState?.providersSlice?.providersApiResult?.providers || [];
