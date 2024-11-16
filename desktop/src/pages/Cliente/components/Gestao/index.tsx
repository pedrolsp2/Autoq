import React, { useEffect } from 'react';
import { toast } from 'sonner';
import Table from './components/Table';
import SplashLoading from '@/components/SplashLoading';
import { useGetCliente } from '@/hooks/schemas/cliente/useCliente';

const Gestao: React.FC = () => {
  const { data, status, isPending } = useGetCliente();

  useEffect(() => {
    if (status === 'error') {
      toast.warning('Erro ao buscar lista de clientes');
    }
  }, [status]);

  if (status !== 'success') {
    return <SplashLoading className="w-full h-[30rem]" />;
  }

  return (
    <div>
      <Table props={data} isPending={isPending} />
    </div>
  );
};

export default Gestao;
