import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit, Loader } from 'lucide-react';
import { PecasType } from '@/types/Pecas';
import { useStore } from '@/store';
import { usePolicy } from '@/utils/Politica/politica';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { editPecas } from '@/api/business/pecas';
import { formatCurrency } from '@/utils/stringFormatter';
import { updatePecas } from '@/services/pecas';

interface EditarProps extends PecasType {
  refetch: () => void;
}

const formSchema = z.object({
  NM_PECAS: z
    .string({ message: 'Campo obrigratório.' })
    .transform((item) => item.toUpperCase()),
  DS_CATEGORIA: z
    .string({ message: 'Campo obrigratório.' })
    .transform((item) => item.toUpperCase()),
  VLR_CUSTO: z
    .string({ message: 'Campo obrigratório.' })
    .transform((item) => item.toUpperCase()),
  VLR_VENDA: z
    .string({ message: 'Campo obrigratório.' })
    .transform((item) => item.toUpperCase()),
  DS_LOCALIZACAO: z
    .string({ message: 'Campo obrigratório.' })
    .transform((item) => item.toUpperCase()),
  UND_MEDIDA: z
    .string({ message: 'Campo obrigratório.' })
    .transform((item) => item.toUpperCase()),
});

export type SchemaType = z.infer<typeof formSchema>;

const Editar: React.FC<EditarProps> = ({
  SK_PECAS,
  DS_CATEGORIA,
  DS_LOCALIZACAO,
  D_E_L_E_T,
  NM_PECAS,
  UND_MEDIDA,
  VLR_CUSTO,
  VLR_VENDA,
  refetch,
}) => {
  const [open, setOpen] = useState(false);
  const { SK_POLITICA } = useStore.use.usuario();
  const disabled = !usePolicy(SK_POLITICA) || D_E_L_E_T;

  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      DS_CATEGORIA,
      DS_LOCALIZACAO,
      NM_PECAS,
      UND_MEDIDA,
      VLR_CUSTO,
      VLR_VENDA,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updatePecas,
    onSuccess(data) {
      toast(data.message, {
        style: { background: '#16a34a', color: '#fff' },
      });
      setOpen(false);
      refetch();
    },

    onError(error: AxiosError<{ message: string }>) {
      toast(error.message, {
        style: { background: '#ca3333', color: '#fff' },
      });
    },
  });

  const onSubmit = (data: SchemaType) => {
    mutate({ id: SK_PECAS, updatedData: data });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(disabled ? 'text-neutral-200' : 'text-neutral-500')}
        disabled={disabled}
      >
        <Edit size={18} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edição de peça</DialogTitle>
          <DialogDescription>Edite a peça {NM_PECAS}.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-[80rem] w-auto"
          >
            <FormField
              control={form.control}
              name="NM_PECAS"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Peça</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Peça A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="DS_CATEGORIA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Eletrônicos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="VLR_CUSTO"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) =>
                        field.onChange(formatCurrency(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="VLR_VENDA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor de Venda</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) =>
                        field.onChange(formatCurrency(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="DS_LOCALIZACAO"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Prateleira A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="UND_MEDIDA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidade de Medida</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: kg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
              <Button type="submit" className="w-24 ml-auto">
                {isPending ? <Loader className="animate-spin" /> : 'Editar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Editar;
