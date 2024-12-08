import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { deafultItens } from '../utils';
import { ClienteType } from '@/types/Cliente';
import { SchemaType } from '@/pages/Cliente/components/Criar';

const collectionName = 'cliente';
const collectionRef = collection(db, collectionName);

type ClienteOmitType = Omit<ClienteType, 'SK_CLIENTE'>;

export const createCliente = async (data: SchemaType) => {
  try {
    const docRef = await addDoc(collectionRef, { ...data, ...deafultItens });
    return { id: docRef.id, message: 'Sucesso ao criar cliente.' };
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return { message: 'Erro ao criar cliente.' };
  }
};

export const readCliente = async () => {
  try {
    const snapshot = await getDocs(collectionRef);
    const items: ClienteType[] = snapshot.docs.map((doc) => ({
      SK_CLIENTE: doc.id,
      ...(doc.data() as ClienteOmitType),
    }));
    return items;
  } catch (error) {
    console.error('Erro ao ler documentos:', error);
  }
};

export const updateCliente = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: any;
}) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, updatedData);
    return { message: 'Editado com sucesso' };
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    return { message: 'Erro ao editar' };
  }
};

export const deleteCliente = async (id: string) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return { message: 'Deletado com sucesso' };
  } catch (error) {
    console.error('Erro ao deletar documento:', error);
    return { message: 'Erro ao deletar' };
  }
};
