import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { SchemaType } from '@/pages/Usuario/Criar';
import { deafultItens } from '../utils';
import { UserType } from '@/types/User';

const collectionName = 'user';
const collectionRef = collection(db, collectionName);

type UserOmitType = Omit<UserType, 'SK_USUARIO'>;

const politica = {
  '1': 'Admin',
  '2': 'Gerente',
  '3': 'Vendedor',
  '4': 'Caixa',
};

export const createItem = async (data: SchemaType) => {
  try {
    const POLITICA = data?.SK_POLITICA || '5';
    //@ts-ignore
    const DS_POLITICA = politica[POLITICA];
    const docRef = await addDoc(collectionRef, { ...data, ...deafultItens });
    return { id: docRef.id, message: 'Sucesso ao criar usuário.' };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return { message: 'Erro ao criar usuário.' };
  }
};

export const readItems = async () => {
  try {
    const snapshot = await getDocs(collectionRef);
    const items: UserType[] = snapshot.docs.map((doc) => ({
      SK_USUARIO: doc.id,
      ...(doc.data() as UserOmitType),
    }));
    return items;
  } catch (error) {
    console.error('Erro ao ler documentos:', error);
  }
};

export const updateUser = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: any;
}) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, updatedData);
    return { message: 'Editar com sucesso' };
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    return { message: 'Erro ao editar' };
  }
};

export const deleteUser = async (id: string) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return { message: 'Deletado com sucesso' };
  } catch (error) {
    console.error('Erro ao deletar documento:', error);
    return { message: 'Erro ao deletar' };
  }
};
