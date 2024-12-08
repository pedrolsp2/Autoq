import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import Apagar from '../Apagar';
import Editar from '../Editar';
import { RefreshCcw } from 'lucide-react';
import { PecasType } from '@/types/Pecas';
import { TableData } from '@/components/Table/type';
import { useTable } from '@/hooks/useTable';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import TableComp from '@/components/Table';

interface TableProps {
  props: PecasType[];
  isPending: boolean;
}

type TableType = TableData<PecasType>;

const Table: React.FC<TableProps> = ({ props, isPending }) => {
  const [users, setUsers] = useState<PecasType[]>([]);
  const queryClient = useQueryClient();

  const { selectedRows, setSelectedRows, setTable } =
    useTable<TableType>('TABLE_PECAS');

  const columnHelper = createColumnHelper<PecasType>();
  const memoData = useMemo(() => props || [], [props]);
  const memoColumns = useMemo(
    () => [
      columnHelper.accessor('NM_PECAS', {
        id: 'NM_PECAS',
        header: 'NOME',
        size: 400,
      }),
      columnHelper.accessor('DS_CATEGORIA', {
        id: 'DS_CATEGORIA',
        header: 'CATEGORIA',
        size: 150,
      }),
      columnHelper.accessor('VLR_CUSTO', {
        id: 'VLR_CUSTO',
        header: 'CUSTO',
        size: 150,
      }),
      columnHelper.accessor('VLR_VENDA', {
        id: 'VLR_VENDA',
        header: 'VENDA',
        size: 150,
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
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ['PECAS'] });
  };

  useEffect(() => {
    if (props) {
      setUsers(props);
    }
  }, [props]);

  return (
    <>
      <div className="flex items-center justify-between mb-1">
        <span>{users.length} peças totais</span>
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
    </>
  );
};

export default Table;
