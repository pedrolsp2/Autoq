import { useGetUsers } from '@/hooks/schemas/users/useGetUsers';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import Table from './components/Table';
import SplashLoading from '@/components/SplashLoading';

const Gestao: React.FC = () => {
  const { data, status, isPending } = useGetUsers();

  useEffect(() => {
    if (status === 'error') {
      toast.warning('Erro ao buscar lista de usuarios');
    }
  }, [status]);

  if (status !== 'success') {
    return <SplashLoading className="w-full h-[30rem]" />;
  }

  return (
    <div>
      <Table props={data!} isPending={isPending} />
    </div>
  );
};

export default Gestao;
