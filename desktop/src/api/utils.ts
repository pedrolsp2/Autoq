import { getItem } from '@/utils/storage';

export const getHeaders = () => {
  return {
    'x-token': getItem(localStorage, 'token'),
    'x-sistema': 'BOILERPLATE',
    'x-versao': import.meta.env.VITE_VERSION,
  };
};
