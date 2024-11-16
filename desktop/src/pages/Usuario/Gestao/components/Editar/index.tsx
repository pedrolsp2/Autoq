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
import { UserType } from '@/types/User';
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

interface EditarProps extends UserType {
  refetch: () => void;
}

const formSchema = z.object({
  NM_USUARIO: z.string({ message: 'Insira um nome' }).min(2).max(50),
  EMAIL_USUARIO: z.string().email({ message: 'Email inválido' }),
  DS_USUARIO: z.string(),
  POLITICA: z.enum(['1', '2', '3', '4'], {
    message: 'Selecione uma política válida',
  }),
});

export type SchemaType = z.infer<typeof formSchema>;

const Editar: React.FC<EditarProps> = ({
  SK_USUARIO,
  DS_USUARIO,
  D_E_L_E_T,
  EMAIL_USUARIO,
  NM_USUARIO,
  POLITICA,
  refetch,
}) => {
  const [open, setOpen] = useState(false);
  const { SK_POLITICA } = useStore.use.usuario();
  const disabled = !usePolicy(SK_POLITICA) || D_E_L_E_T;

  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      DS_USUARIO,
      POLITICA,
      EMAIL_USUARIO,
      NM_USUARIO,
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
    mutate({ ...data, SK_USUARIO });
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
          <DialogTitle>Edição de usuario</DialogTitle>
          <DialogDescription>Edite o usuario {DS_USUARIO}.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-[80rem] w-auto"
          >
            <FormField
              control={form.control}
              name="NM_USUARIO"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Fulano Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="EMAIL_USUARIO"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: nome@autoq.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="DS_USUARIO"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: fsilva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="POLITICA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Politica</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Privilégios" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Admin</SelectItem>
                        <SelectItem value="2">Gerente</SelectItem>
                        <SelectItem value="3">Vendedor</SelectItem>
                        <SelectItem value="4">Caixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-2">
              <DialogClose>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="w-24">
                {isPending ? <Loader className="animate-spin" /> : 'Criar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Editar;
