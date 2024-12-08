import { readItems } from '@/services/user';
import { useQuery } from '@tanstack/react-query';

export const useGetUsers = () => {
  return useQuery({
    queryFn: readItems,
    queryKey: ['USERS'],
  });
};
