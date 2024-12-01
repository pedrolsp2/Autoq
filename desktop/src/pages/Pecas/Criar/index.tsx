import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader, X } from 'lucide-react';
import { AxiosError } from 'axios';
import { newPecas } from '@/api/business/pecas';
import { usePolicy } from '@/utils/Politica/politica';
import PolicyAlert from '@/utils/Politica';
import { useStore } from '@/store';
import InputMask from 'react-input-mask';
import { formatCurrency } from '@/utils/stringFormatter';

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

const Criar: React.FC = () => {
  const queryClient = useQueryClient();
  const { SK_POLITICA } = useStore.use.usuario();

  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: newPecas,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['PECAS'] });
      toast(data.data.message, {
        style: { background: '#16a34a', color: '#fff' },
      });
      form.reset({
        DS_CATEGORIA: '',
        DS_LOCALIZACAO: '',
        NM_PECAS: '',
        UND_MEDIDA: '',
        VLR_CUSTO: '',
        VLR_VENDA: '',
      });
    },

    onError(error: AxiosError<{ message: string }>) {
      toast(error.response?.data?.message || 'Erro ao criar.', {
        style: { background: '#ca3333', color: '#fff' },
      });
    },
  });

  const onSubmit = (values: SchemaType) => {
    mutate(values);
  };

  if (!usePolicy(SK_POLITICA)) {
    return <PolicyAlert />;
  }

  return (
    <div className="flex flex-col">
      <span className="text-2xl font-semibold leading-none tracking-tight">
        Nova peças
      </span>
      <Separator className="my-6" />

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
              {isPending ? <Loader className="animate-spin" /> : 'Criar'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Criar;
