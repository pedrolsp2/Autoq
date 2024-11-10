import { UserType } from '@/types/User';
import React, { useMemo } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import {
  Table as Comp,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useDeleteUser } from '../../functions';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCcw } from 'lucide-react';

interface TableProps {
  props: UserType[];
}

const Table: React.FC<TableProps> = ({ props }) => {
  const queryClient = useQueryClient();
  const data = useMemo(() => props, [props]);

  const { mutate, isPending } = useDeleteUser({ queryClient });

  const handleEdit = (user: UserType) => {
    console.log('Editar usuário', user);
  };

  const handleDelete = (user: UserType) => {
    mutate(user.SK_USUARIO);
  };

  const columns: ColumnDef<UserType>[] = useMemo(
    () => [
      {
        accessorKey: 'NM_USUARIO',
        header: 'NOME',
      },
      {
        accessorKey: 'DS_USUARIO',
        header: 'USUARIO',
      },
      {
        accessorKey: 'EMAIL_USUARIO',
        header: 'EMAIL',
      },
      {
        accessorKey: 'CREATED_AT',
        header: 'CRIAÇÃO',
        cell: ({ row }) => (
          <div>
            {row.original.CREATED_AT &&
              format(new Date(row.original.CREATED_AT), 'dd/MM/yyyy')}
          </div>
        ),
      },
      {
        accessorKey: 'ds_politica',
        header: 'POLITICA',
      },
      {
        accessorKey: 'D_E_L_E_T',
        header: 'STATUS',
        cell: ({ row }) => (
          <div
            className={cn(
              'p-1 flex items-center justify-center rounded',
              row.original.D_E_L_E_T
                ? 'bg-red-50 text-red-500'
                : 'bg-primary-50 text-primary-500'
            )}
          >
            {row.original.D_E_L_E_T ? 'Inativo' : 'Ativo'}
          </div>
        ),
      },
      {
        id: 'actions',
        header: 'AÇÕES',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(row.original)}
            >
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(row.original)}
            >
              Deletar
            </Button>
          </div>
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="border rounded-md">
      {isPending && (
        <span className="bg-primary-50 text-primary-500">
          Atualizando dados...
        </span>
      )}
      <Comp>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Comp>
    </div>
  );
};

export default Table;
