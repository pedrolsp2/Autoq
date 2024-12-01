import { listPecas } from '@/api/business/pecas';
import { useQuery } from '@tanstack/react-query';

export const useGetPecas = () => {
  return useQuery({
    queryFn: listPecas,
    queryKey: ['PECAS'],
  });
};
