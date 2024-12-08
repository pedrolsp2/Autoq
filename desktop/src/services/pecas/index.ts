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
import { PecasType } from '@/types/Pecas';
import { SchemaType } from '@/pages/Pecas/Criar';

const collectionName = 'pecas';
const collectionRef = collection(db, collectionName);

type PecasOmitType = Omit<PecasType, 'SK_PECAS'>;

export const createPecas = async (data: SchemaType) => {
  try {
    const docRef = await addDoc(collectionRef, { ...data, ...deafultItens });
    return { id: docRef.id, message: 'Sucesso ao criar peças.' };
  } catch (error) {
    console.error('Erro ao criar peças:', error);
    return { message: 'Erro ao criar peças.' };
  }
};

export const readPecas = async () => {
  try {
    const snapshot = await getDocs(collectionRef);
    const items: PecasType[] = snapshot.docs.map((doc) => ({
      SK_PECAS: doc.id,
      ...(doc.data() as PecasOmitType),
    }));
    return items;
  } catch (error) {
    console.error('Erro ao ler documentos:', error);
  }
};

export const updatePecas = async ({
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

export const deletePeca = async (id: string) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return { message: 'Deletado com sucesso' };
  } catch (error) {
    console.error('Erro ao deletar documento:', error);
    return { message: 'Erro ao deletar' };
  }
};
