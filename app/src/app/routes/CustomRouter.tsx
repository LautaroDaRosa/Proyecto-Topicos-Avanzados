import customHistory from './history';

export const rootNavigate = (to: string) => {
  customHistory.push(to);
};
