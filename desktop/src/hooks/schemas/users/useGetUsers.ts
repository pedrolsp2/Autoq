import { listUsers } from '@/api/business/users';
import { useQuery } from '@tanstack/react-query';

export const useGetUsers = () => {
  return useQuery({
    queryFn: listUsers,
    queryKey: ['USERS'],
  });
};
