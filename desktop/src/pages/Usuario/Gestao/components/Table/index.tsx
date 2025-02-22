import { UserType } from '@/types/User';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import Apagar from '../Apagar';
import Editar from '../Editar';
import { RefreshCcw } from 'lucide-react';
import { createColumnHelper } from '@tanstack/react-table';
import TableComp from '@/components/Table';
import { useTable } from '@/hooks/useTable';
import { TableData } from '@/components/Table/type';

interface TableProps {
  props: UserType[];
  isPending: boolean;
}

type TableType = TableData<UserType>;

const Table: React.FC<TableProps> = ({ props, isPending }) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const queryClient = useQueryClient();

  const { selectedRows, setSelectedRows, setTable } =
    useTable<TableType>('TABLE_USUER');

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ['USERS'] });
  };

  const columnHelper = createColumnHelper<UserType>();
  const memoData = useMemo(() => props || [], [props]);
  const memoColumns = useMemo(
    () => [
      columnHelper.accessor('NM_USUARIO', {
        id: 'NM_USUARIO',
        header: 'NOME',
        size: 400,
      }),
      columnHelper.accessor('DS_USUARIO', {
        id: 'DS_USUARIO',
        header: 'USUARIO',
        size: 150,
      }),
      columnHelper.accessor('EMAIL_USUARIO', {
        id: 'EMAIL_USUARIO',
        header: 'EMAIL',
        size: 300,
      }),
      columnHelper.accessor('CREATED_AT', {
        id: 'CREATED_AT',
        header: 'CRIACAO',
        size: 150,
      }),
      columnHelper.accessor('ds_politica', {
        id: 'ds_politica',
        header: 'POLITICA',
        size: 150,
      }),
      columnHelper.accessor('D_E_L_E_T', {
        id: 'D_E_L_E_T',
        cell: (info) => {
          const value = info.getValue();
          return (
            <div>
              {value ? (
                <span className="px-2 py-1 text-red-500 rounded bg-red-50">
                  Inativo
                </span>
              ) : (
                <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-500">
                  Ativo
                </span>
              )}
            </div>
          );
        },
        header: 'STATUS',
        size: 150,
      }),
      columnHelper.display({
        id: 'ACAO',
        header: 'AÇÕES',
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="flex gap-2">
              <Editar {...row} refetch={refetch} />
              <Apagar {...row} refetch={refetch} />
            </div>
          );
        },
        size: 150,
      }),
    ],
    []
  );
  useEffect(() => {
    if (props) {
      setUsers(props);
    }
  }, [props]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span>{users.length} usuarios totais</span>
        <Button variant="ghost" onClick={refetch}>
          <RefreshCcw />
        </Button>
      </div>
      {isPending && (
        <span className="bg-primary-50 text-primary-500">
          Atualizando dados...
        </span>
      )}
      <TableComp<TableType>
        data={memoData}
        columns={memoColumns}
        getTableInstance={(table) => setTable(table)}
        persist={{
          canPersist: true,
          key: 'approvers-table',
        }}
        tableState={{
          rowSelection: selectedRows,
        }}
        onRowSelectionChange={setSelectedRows}
      />
    </div>
  );
};

export default Table;
