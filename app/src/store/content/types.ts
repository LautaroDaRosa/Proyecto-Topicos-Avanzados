import { API_STATUS } from 'utils/constants';

export interface PostsState {
  postsApiResult: {
    posts: Post[] | undefined;
    status: API_STATUS | undefined;
  };
}

export interface PostsType {
  posts: PostType[];
}

export interface PostType {
  posts: number;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
}

export interface Post {
  id: number;
  user: {
    id: number;
    fullname: string;
    photo: string;
  };
  content: string;
  photo: string;
  createdAt: string;
}
