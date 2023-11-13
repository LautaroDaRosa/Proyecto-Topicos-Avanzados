import { API_STATUS } from 'utils/constants';

export interface LoginDataType {
  userId: number;
  username: string;
  phone: string;
  email: string;
  info: string;
  logo: string;
  role: string;
  token: string;
}

export interface RegisterDataType {
  username: string;
  phone: string;
  email: string;
  info: string;
  logo: string;
  rut: string;
  address: string;
  contact: string;
  businessName: string;
}

export interface AuthState {
  login: {
    error: string | number | undefined;
    status: API_STATUS | undefined;
  };
}
