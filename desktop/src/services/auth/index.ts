import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { UserType } from '@/types/User';

const collectionName = 'user';

type User = Omit<UserType, 'SK_USUARIO'>;

export const getUserByCredentials = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const userCollection = collection(db, collectionName);

    // Cria a query com filtros para DS_USUARIO e SENHA_USUARIO
    const q = query(
      userCollection,
      where('DS_USUARIO', '==', username),
      where('SENHA_USUARIO', '==', password)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { status: 500, message: 'Usuário ou senha inválidos' };
    }

    const usuario: UserType = querySnapshot.docs.map((doc) => ({
      SK_USUARIO: doc.id,
      ...(doc.data() as User),
    }))[0];

    return { status: 200, usuario };
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return { status: 500, message: 'Erro ao buscar usuário', error };
  }
};
