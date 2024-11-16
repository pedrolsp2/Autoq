import { UserType } from '@/types/User';
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

interface TableProps {
  props: UserType[];
  isPending: boolean;
}

const Table: React.FC<TableProps> = ({ props, isPending }) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const queryClient = useQueryClient();

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ['USERS'] });
  };

  useEffect(() => {
    if (props) {
      setUsers(props);
    }
  }, [props]);

  return (
    <>
      <div className="flex items-center justify-between mb-1">
        <span>{users.length} usuarios totais</span>
        <Button variant="ghost" onClick={refetch}>
          <RefreshCcw />
        </Button>
      </div>
      <div className="border rounded-md">
        {isPending && (
          <span className="bg-primary-50 text-primary-500">
            Atualizando dados...
          </span>
        )}
        <Comp>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead className="w-[400px]">Nome</TableHead>
              <TableHead className="w-[100px]">Usuario</TableHead>
              <TableHead className="w-[150px]">Email</TableHead>
              <TableHead className="w-[100px]">Criação</TableHead>
              <TableHead className="w-[100px]">Politica</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.SK_USUARIO}</TableCell>
                <TableCell>{item.NM_USUARIO}</TableCell>
                <TableCell>{item.DS_USUARIO}</TableCell>
                <TableCell>{item.EMAIL_USUARIO}</TableCell>
                <TableCell>
                  {format(new Date(item.CREATED_AT), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>{item.ds_politica}</TableCell>
                <TableCell>
                  {item.D_E_L_E_T ? (
                    <span className="px-2 py-1 text-red-500 rounded bg-red-50">
                      Inativo
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-500">
                      Ativo
                    </span>
                  )}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Editar {...item} refetch={refetch} />
                  <Apagar {...item} refetch={refetch} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Comp>
      </div>
    </>
  );
};

export default Table;
