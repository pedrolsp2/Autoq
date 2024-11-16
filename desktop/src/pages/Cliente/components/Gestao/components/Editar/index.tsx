import React, { useState } from 'react';
import InputMask from 'react-input-mask';
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
import { ClienteType } from '@/types/Cliente';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { editUser } from '@/api/business/users';
import ReactInputMask from 'react-input-mask';

interface EditarProps extends ClienteType {
  refetch: () => void;
}

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

const Editar: React.FC<EditarProps> = ({
  NM_CLIENTE,
  EMAIL_CLIENTE,
  CPF_CLIENTE,
  TEL_CLIENTE,
  END_CLIENTE,
  BAIRRO_CLIENTE,
  NUM_RESIDENCIA,
  D_E_L_E_T,
  refetch,
}) => {
  const [open, setOpen] = useState(false);
  const { SK_POLITICA } = useStore.use.usuario();
  const disabled = !usePolicy(SK_POLITICA) || D_E_L_E_T;

  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NM_CLIENTE,
      EMAIL_CLIENTE,
      CPF_CLIENTE,
      TEL_CLIENTE,
      END_CLIENTE,
      BAIRRO_CLIENTE,
      NUM_RESIDENCIA,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: editUser,
    onSuccess(data) {
      toast(data.data.message, {
        style: { background: '#16a34a', color: '#fff' },
      });
      refetch();
      form.reset();
    },

    onError(error: AxiosError<{ message: string }>) {
      toast(error.response?.data?.message, {
        style: { background: '#ca3333', color: '#fff' },
      });
    },
  });

  const onSubmit = (data: SchemaType) => {
    // mutate({ ...data, SK_USUARIO });
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
          <DialogTitle>Edição de cliente</DialogTitle>
          <DialogDescription>Edite o cliente {NM_CLIENTE}.</DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
};

export default Editar;