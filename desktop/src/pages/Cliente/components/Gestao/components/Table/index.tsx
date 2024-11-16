import { ClienteType } from '@/types/Cliente';
import React, { useEffect, useState } from 'react';
import {
  Table as Comp,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import Apagar from '../Apagar';
import Editar from '../Editar';
import { RefreshCcw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface TableProps {
  props: ClienteType[];
  isPending: boolean;
}

const Table: React.FC<TableProps> = ({ props, isPending }) => {
  const { open } = useSidebar();
  const [users, setUsers] = useState<ClienteType[]>([]);
  const queryClient = useQueryClient();

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ['CLIENTE'] });
  };

  useEffect(() => {
    if (props) {
      setUsers(props);
    }
  }, [props]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span>{users.length} clientes totais</span>
        <Button variant="ghost" onClick={refetch}>
          <RefreshCcw />
        </Button>
      </div>
      <div>
        {isPending && (
          <span className="bg-primary-50 text-primary-500">
            Atualizando dados...
          </span>
        )}
        <ScrollArea
          className={cn(
            'h-[79vh] border rounded-md',
            open ? 'w-[79vw]' : 'w-[95vw]'
          )}
        >
          <Comp>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead className="w-[300px]">Nome</TableHead>
                <TableHead className="w-[150px]">CPF</TableHead>
                <TableHead className="w-[150px]">Email</TableHead>
                <TableHead className="w-[200px]">Telefone</TableHead>
                <TableHead className="w-[100px]">Endereço</TableHead>
                <TableHead className="w-[100px]">Bairro</TableHead>
                <TableHead className="w-[100px]">Número</TableHead>
                <TableHead className="w-[100px]">Criação</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.SK_CLIENTE}
                  </TableCell>
                  <TableCell title={item.NM_CLIENTE}>
                    {item.NM_CLIENTE}
                  </TableCell>
                  <TableCell title={item.CPF_CLIENTE}>
                    {item.CPF_CLIENTE}
                  </TableCell>
                  <TableCell title={item.EMAIL_CLIENTE}>
                    {item.EMAIL_CLIENTE}
                  </TableCell>
                  <TableCell title={item.TEL_CLIENTE}>
                    {item.TEL_CLIENTE}
                  </TableCell>
                  <TableCell title={item.END_CLIENTE}>
                    {item.END_CLIENTE}
                  </TableCell>
                  <TableCell title={item.BAIRRO_CLIENTE}>
                    {item.BAIRRO_CLIENTE}
                  </TableCell>
                  <TableCell title={item.NUM_RESIDENCIA}>
                    {item.NUM_RESIDENCIA}
                  </TableCell>
                  <TableCell>
                    {format(new Date(item.CREATED_AT), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Editar {...item} refetch={refetch} />
                    <Apagar {...item} refetch={refetch} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Comp>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Table;
