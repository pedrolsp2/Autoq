import { SchemaType } from '@/pages/Pecas/Criar';
import instance from '..';

type EditProps = SchemaType & { SK_PECAS: number };

export const listPecas = async () => {
  const res = await instance.get('/pecas');
  return res.data;
};

export const deletePecas = async (SK_PECAS: number) => {
  const res = await instance.delete('/pecas', { data: { SK_PECAS } });
  return res.data;
};

export const newPecas = async (props: SchemaType) => {
  return await instance.put('/pecas', { ...props });
};

export const editPecas = async (props: EditProps) => {
  return await instance.patch('/pecas', { ...props });
};
