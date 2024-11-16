import { SchemaType } from '@/pages/Usuario/Criar';
import instance from '..';

type EditProps = Omit<SchemaType, 'SENHA_USUARIO'> & { SK_USUARIO: number };

export const listUsers = async () => {
  const res = await instance.get('/users');
  return res.data;
};

export const deleteUser = async (SK_USUARIO: number) => {
  const res = await instance.delete('/user', { data: { SK_USUARIO } });
  return res.data;
};

export const newUser = async (props: SchemaType) => {
  return await instance.put('/user', { ...props });
};

export const editUser = async (props: EditProps) => {
  return await instance.patch('/user', { ...props });
};
