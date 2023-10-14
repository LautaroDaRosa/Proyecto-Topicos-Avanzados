import { RootState } from './RootState';

export type { RootState };

export interface MinimalPost {
  id: number;
  content: string;
  photo: string;
  createdAt: string;
}

export interface Post extends MinimalPost {
  user: {
    id: number;
    fullname: string;
    photo: string;
  };
}

export interface MinimalEmployee {
  id: number;
  fullname: string;
  photo: string;
}

export interface Employee {
  fullname: string;
  photo: string;
  dayOfBirth: string;
  city: string;
  entryDate: string;
}

export interface EmployeeWithPosts extends Employee {
  posts: MinimalPost[];
}

export interface Picture {
  id: number;
  title: string;
  photo: string;
  featured: boolean;
}
