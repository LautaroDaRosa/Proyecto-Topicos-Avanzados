import { API_STATUS } from 'utils/constants';

export interface LoginDataType {
  access: string;
  refresh: string;
}

export interface AuthState {
  login: {
    error: string | number | undefined;
    status: API_STATUS | undefined;
  };
}
