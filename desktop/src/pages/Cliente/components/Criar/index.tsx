import React from 'react';
import InputMask from 'react-input-mask';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useStore } from '@/store';
import { usePolicy } from '@/utils/Politica/politica';
import PolicyAlert from '@/utils/Politica';
import { Separator } from '@/components/ui/separator';
import { createCliente } from '@/services/cliente';

const formSchema = z.object({
  NM_CLIENTE: z.string({ message: 'Nome é obrigratório' }).min(2).max(50),
  EMAIL_CLIENTE: z.string().email({ message: 'Email inválido' }).optional(),
  CPF_CLIENTE: z
    .string({
      required_error: 'CPF/CNPJ é obrigatório.',
    })
    .min(11, 'CPF/CNPJ deve conter no mínimo 11 caracteres.')
    .max(14, 'CPF/CNPJ deve conter no máximo 14 caracteres.')
    .refine(
      (doc) => !!Number(doc.replace(/\D/g, '')),
      'CPF/CNPJ deve conter apenas números.'
    ),
  TEL_CLIENTE: z.string().optional(),
  END_CLIENTE: z.string().optional(),
  BAIRRO_CLIENTE: z.string().optional(),
  NUM_RESIDENCIA: z.string().optional(),
});

export type SchemaType = z.infer<typeof formSchema>;

const CriarCliente: React.FC = () => {
  const { SK_POLITICA } = useStore.use.usuario();
  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCliente,
    onSuccess(data) {
      toast(data.message, {
        style: { background: '#16a34a', color: '#fff' },
      });
      form.reset({
        BAIRRO_CLIENTE: '',
        CPF_CLIENTE: '',
        EMAIL_CLIENTE: '',
        END_CLIENTE: '',
        NM_CLIENTE: '',
        NUM_RESIDENCIA: '',
        TEL_CLIENTE: '',
      });
    },

    onError() {
      toast('Erro ao criar usuário', {
        style: { background: '#ca3333', color: '#fff' },
      });
    },
  });

  const onSubmit = (data: SchemaType) => {
    mutate(data);
  };

  if (!usePolicy(SK_POLITICA)) {
    return <PolicyAlert />;
  }
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-semibold leading-none tracking-tight">
        Novo cliente
      </span>
      <Separator className="my-6" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-[80rem] w-auto"
        >
          <FormField
            control={form.control}
            name="NM_CLIENTE"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nome <strong className="text-red-500">*</strong>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Fulano Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="CPF_CLIENTE"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  CPF <strong className="text-red-500">*</strong>
                </FormLabel>
                <FormControl>
                  <InputMask
                    mask="999.999.999-99"
                    value={field.value || ''}
                    onChange={field.onChange}
                  >
                    {(inputProps: any) => (
                      <Input placeholder="123.456.789-10" {...inputProps} />
                    )}
                  </InputMask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="TEL_CLIENTE"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <InputMask
                    mask="(99) 9 9999-9999"
                    value={field.value || ''}
                    onChange={field.onChange}
                  >
                    {(inputProps: any) => (
                      <Input placeholder="(12) 9 1234-5678" {...inputProps} />
                    )}
                  </InputMask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="BAIRRO_CLIENTE"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input placeholder="PIO XII" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="END_CLIENTE"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Rua A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="NUM_RESIDENCIA"
            render={({ field }) => (
              <FormItem>
                <FormLabel>N° Residencia</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex">
            <Button type="submit" className="w-24 ml-auto">
              {isPending ? <Loader className="animate-spin" /> : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CriarCliente;
