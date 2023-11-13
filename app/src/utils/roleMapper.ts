import currentUser from './currentUser';

export const roleMapper = {
  PROVIDER: 'Proveedor',
  ADMIN: 'Administrador',
  PARTNER: 'Socio',
};

export const isPartner = () => {
  return currentUser.get().role === 'PARTNER';
};

export const isAdmin = () => {
  return currentUser.get().role === 'ADMIN';
};

export const isProvider = () => {
  return currentUser.get().role === 'PROVIDER';
};
