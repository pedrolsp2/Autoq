import { SchemaType } from '@/pages/Cliente/components/Criar';
import instance from '..';

export const newCliente = async (props: SchemaType) => {
  const resp = await instance.put('/cliente', { ...props });
  return resp.data;
};

export const getCliente = async () => {
  const resp = await instance.get('/cliente');
  return resp.data;
};
