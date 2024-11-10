import { deleteUser } from '@/api/business/users';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteUser = ({
  queryClient,
}: {
  queryClient: QueryClient;
}) => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['USERS'] });
      toast('Sucesso ao deletar!', {
        style: { background: '#16a34a', color: '#fff' },
      });
    },
    onError() {
      toast('Erro ao apagar usuario.', {
        style: { background: '#ca3333', color: '#fff' },
      });
    },
  });
};
