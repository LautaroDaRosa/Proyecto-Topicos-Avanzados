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
  score?: Score;

  businessRole?: string;
}

export interface Score {
  governance: number;
  social: number;
  environmental: number;
  average: number;
}

export interface Question {
  categoryQuestion: 'SOCIAL' | 'ENVIRONMENTAL' | 'GOVERNANCE';
  typeQuestion: string;
  text: string;
  weight: string;
}

export interface QuestionWithId extends Question {
  questionId: number;
}
