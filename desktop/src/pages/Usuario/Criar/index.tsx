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
import Senha from './components/Senha';
import Politica from './components/Politica';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader, X } from 'lucide-react';
import { AxiosError } from 'axios';
import { newUser } from '@/api/business/users';
import { usePolicy } from '@/utils/Politica/politica';
import PolicyAlert from '@/utils/Politica';
import { useStore } from '@/store';

const formSchema = z.object({
  NM_USUARIO: z.string({ message: 'Insira um nome' }).min(2).max(50),
  EMAIL_USUARIO: z.string().email({ message: 'Email inválido' }),
  SENHA_USUARIO: z.string(),
  DS_USUARIO: z.string(),
  POLITICA: z
    .enum(['1', '2', '3', '4', '5'], {
      message: 'Selecione uma política válida de 1 a 5',
    })
    .optional(),
});

export type SchemaType = z.infer<typeof formSchema>;

const Criar: React.FC = () => {
  const [success, setSucces] = useState(false);
  const [user, setUser] = useState({ user: '', psw: '' });

  const queryClient = useQueryClient();
  const { SK_POLITICA } = useStore.use.usuario();

  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NM_USUARIO: '',
      DS_USUARIO: '',
      EMAIL_USUARIO: '',
      POLITICA: '3',
      SENHA_USUARIO: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: newUser,
    onSuccess(data) {
      setSucces(true);
      queryClient.invalidateQueries({ queryKey: ['USERS'] });
      toast(data.data.message, {
        style: { background: '#16a34a', color: '#fff' },
      });
      form.reset();
    },

    onError(error: AxiosError<{ message: string }>) {
      toast(error.response?.data?.message, {
        style: { background: '#ca3333', color: '#fff' },
      });
    },
  });

  const onSubmit = (values: SchemaType) => {
    setUser({ user: values.DS_USUARIO, psw: values.SENHA_USUARIO });
    mutate(values);
  };

  if (!usePolicy(SK_POLITICA)) {
    return <PolicyAlert />;
  }

  return (
    <div className="flex flex-col">
      <span className="text-2xl font-semibold leading-none tracking-tight">
        Novo usuário
      </span>
      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        De acordo com sua política, crie usuario para a ferramenta AutoQ.
      </span>
      <Separator className="my-6" />
      {success && (
        <div className="relative flex flex-col w-full p-2 border rounded">
          <button
            className="absolute right-2 top-2"
            onClick={() => setSucces((prev) => !prev)}
          >
            <X size={18} />
          </button>
          <strong className="text-lg">Criado com sucesso!</strong>
          <Separator className="my-2 bg-neutral-50" />
          <span>
            <strong>Usuario de acesso: </strong>
            {user.user}
          </span>
          <span>
            <strong>Senha: </strong>
            {user.psw}
          </span>
        </div>
      )}

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
            name="SENHA_USUARIO"
            render={({ field }) => <Senha field={field} form={form} />}
          />
          <FormField
            control={form.control}
            name="POLITICA"
            render={({ field }) => <Politica field={field} />}
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
