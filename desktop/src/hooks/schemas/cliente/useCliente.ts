import { getCliente } from '@/api/business/client';
import { useQuery } from '@tanstack/react-query';

export const useGetCliente = () => {
  return useQuery({
    queryFn: getCliente,
    queryKey: ['CLIENTE'],
  });
};
