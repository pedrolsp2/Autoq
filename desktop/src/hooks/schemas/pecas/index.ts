import { readPecas } from '@/services/pecas';
import { useQuery } from '@tanstack/react-query';

export const useGetPecas = () => {
  return useQuery({
    queryFn: readPecas,
    queryKey: ['PECAS'],
  });
};
