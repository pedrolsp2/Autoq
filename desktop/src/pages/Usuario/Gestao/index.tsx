import { useGetUsers } from '@/hooks/schemas/users/useGetUsers';
import { UserType } from '@/types/User';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Table from './components/Table';
import SplashLoading from '@/components/SplashLoading';

const Gestao: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const { data, status } = useGetUsers();

  useEffect(() => {
    if (status === 'error') {
      toast.warning('Erro ao buscar lista de usuarios');
    }
  }, [status]);

  useEffect(() => {
    if (data?.data) {
      setUsers(data.data);
    }
  }, []);

  if (status === 'pending') {
    return <SplashLoading />;
  }

  return (
    <div>
      <Table props={users} />
    </div>
  );
};

export default Gestao;
