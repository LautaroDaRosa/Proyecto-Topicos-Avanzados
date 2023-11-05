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

export interface Profile {
  userId: number;
  name: string;
  email: string;
  info: string;
  role: 'ADMIN' | 'PROVIDER' | 'PARTNER';
  phone: string;

  logo?: string;
  businessName?: string;
  rut?: string;
  contact?: string;
  address?: string;

  categories?: string[];
  socialScore?: number;
  environmentalScore?: number;
  governanceScore?: number;
  averageScore?: number;

  businessRole?: string;
}

export interface Question {
  categoryType: 'SOCIAL' | 'ENVIRONMENTAL' | 'GOVERNANCE';
  questionType: string;
  text: string;
  weight: string;
}
