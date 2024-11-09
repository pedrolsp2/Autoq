import { Usuario } from '@/types/Authentication';
import instance from '..';
import { getHeaders } from '@/api/utils';
interface AuthenticateResponse {
  usuario: Usuario;
  token: string;
}

type Token = Usuario & {
  iat: number;
  exp: number;
};

interface ValidateResponse extends Token {}

export const authenticateUser = async (user: string, password: string) => {
  const response = await instance.post<AuthenticateResponse>(
    '/auth',
    {
      DS_USUARIO: user,
      SENHA_USUARIO: password,
    },
    { headers: getHeaders() }
  );
  return response.data;
};

export const validateUserToken = async () => {
  const response = await instance.post<ValidateResponse>(
    '/tokenvalidation',
    {},
    {
      headers: {
        'x-funcionalidade': 'Carregamento inicial',
        'x-acao': 'Carregamento inicial',
        ...getHeaders(),
      },
    }
  );
  return response.data;
};

export const recoverPassword = async (email: string) => {
  const response = await instance.post('/restorepassword', {
    email,
  });

  return response.data;
};

export const changePassword = async (password: string) => {
  const response = await instance.post(
    '/changepassword',
    {
      password,
    },
    { headers: getHeaders() }
  );

  return response.data;
};
