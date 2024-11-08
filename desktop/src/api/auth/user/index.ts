import instance from '..';
import { getHeaders } from '@/api/utils';
interface AuthenticateResponse {
  nomeUsuario: string;
  token: string;
}

interface ValidateResponse {
  token: {
    SK_USUARIO: number;
    NM_USUARIO: string;
    EMAIL_USUARIO: string;
    DS_USUARIO: string;
    iat: number;
    exp: number;
  };
}

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
