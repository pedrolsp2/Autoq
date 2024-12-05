import { SchemaType } from '@/pages/Cliente/components/Criar';
import instance from '..';

type EditProps = SchemaType & { SK_CLIENTE: number };

export const newCliente = async (props: SchemaType) => {
  const resp = await instance.put('/cliente', { ...props });
  return resp.data;
};

export const getCliente = async () => {
  const resp = await instance.get('/cliente');
  return resp.data;
};

export const editCliente = async (props: EditProps) => {
  return await instance.patch('/cliente', { ...props });
};

export const deletCliente = async (SK_CLIENTE: number) => {
  return await instance.delete('/cliente', { data: { SK_CLIENTE } });
};
