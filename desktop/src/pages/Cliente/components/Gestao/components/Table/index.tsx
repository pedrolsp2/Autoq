import { ClienteType } from '@/types/Cliente';
import React, { useEffect, useMemo, useState } from 'react';
import TableComp from '@/components/Table';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import Apagar from '../Apagar';
import Editar from '../Editar';
import { RefreshCcw } from 'lucide-react';
import { TableData } from '@/components/Table/type';
import { useTable } from '@/hooks/useTable';
import { createColumnHelper } from '@tanstack/react-table';

interface TableProps {
  props: ClienteType[];
  isPending: boolean;
}
type TableType = TableData<ClienteType>;

const Table: React.FC<TableProps> = ({ props, isPending }) => {
  const [users, setUsers] = useState<ClienteType[]>([]);
  const queryClient = useQueryClient();

  const { selectedRows, setSelectedRows, setTable } =
    useTable<TableType>('TABLE_CLIENTE');

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ['CLIENTE'] });
  };

  const columnHelper = createColumnHelper<ClienteType>();
  const memoData = useMemo(() => props || [], [props]);
  const memoColumns = useMemo(
    () => [
      columnHelper.accessor('NM_CLIENTE', {
        id: 'NM_CLIENTE',
        header: 'NOME',
        size: 400,
      }),
      columnHelper.accessor('CPF_CLIENTE', {
        id: 'CPF_CLIENTE',
        header: 'CPF',
        size: 150,
      }),
      columnHelper.accessor('TEL_CLIENTE', {
        id: 'TEL_CLIENTE',
        header: 'TEL',
        size: 150,
      }),
      columnHelper.accessor('END_CLIENTE', {
        id: 'END_CLIENTE',
        header: 'ENDEREÇO',
        size: 150,
      }),
      columnHelper.accessor('BAIRRO_CLIENTE', {
        id: 'BAIRRO_CLIENTE',
        header: 'BAIRRO',
        size: 150,
      }),
      columnHelper.accessor('NUM_RESIDENCIA', {
        id: 'NUM_RESIDENCIA',
        header: 'BAIRRO',
      }),
      columnHelper.accessor('CREATED_AT', {
        id: 'CREATED_AT',
        cell: (info) => {
          const date = new Date(info.getValue());
          return format(date, 'dd/MM/yyyy');
        },
        header: 'CRIACAO',
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
    </div>
  );
};

export default Table;
