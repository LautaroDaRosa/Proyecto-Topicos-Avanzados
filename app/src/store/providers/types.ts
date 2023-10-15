import { API_STATUS } from 'utils/constants';

export interface ProvidersState {
  providersApiResult: {
    providers: Provider[] | undefined;
    status: API_STATUS | undefined;
  };
}

export interface Provider {
  name: string;
  businessName: string;
  rut: string;
  logo: string;
  address: string;
  id: number;
  score: number;
  categories: string[];
}
