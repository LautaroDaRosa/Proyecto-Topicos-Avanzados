import { API_STATUS } from 'utils/constants';

export interface LoginDataType {
  userId: number;
  username: string;
  phone: string;
  email: string;
  info: string;
  role: string;
  token: string;
}

export interface AuthState {
  login: {
    error: string | number | undefined;
    status: API_STATUS | undefined;
  };
}
