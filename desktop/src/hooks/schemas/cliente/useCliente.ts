import { readCliente } from '@/services/cliente';
import { useQuery } from '@tanstack/react-query';

export const useGetCliente = () => {
  return useQuery({
    queryFn: readCliente,
    queryKey: ['CLIENTE'],
  });
};
