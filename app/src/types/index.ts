import { RootState } from './RootState';

export type { RootState };

export interface User {
  userId: number;
  name: string;
  phone: string;
  email: string;
  info: string;
  role: string;
}
