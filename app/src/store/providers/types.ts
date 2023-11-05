import { API_STATUS } from 'utils/constants';

export interface ProvidersState {
  providersApiResult: {
    providers: MinimalProvider[] | undefined;
    status: API_STATUS | undefined;
  };
}

export interface MinimalProvider {
  userId: number;
  name: string;
  businessName: string;
  rut: string;
  logo: string;
  averageScore: number;
}

export interface ProvidersPage {
  content: MinimalProvider[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: true;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface SearchProps {
  name: string;
  businessName: string;
  rut: string;
  score: string;
  category: string;
}
