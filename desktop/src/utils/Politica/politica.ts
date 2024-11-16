import { useLocation } from 'react-router-dom';

interface TypeKey<T> {
  [key: number]: T;
}

export const usePolicy = (politica: number) => {
  const { pathname } = useLocation();
  if (pathname.includes('usuario')) {
    const values: TypeKey<boolean> = {
      1: true,
      2: true,
      3: false,
      4: true,
    };
    return values[politica];
  }
};
