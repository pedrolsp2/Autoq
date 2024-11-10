import instance from '..';

export const listUsers = async () => {
  const { data } = await instance.get('/users');
  return data;
};

export const deleteUser = async (SK_USUARIO: number) => {
  const res = await instance.delete('/user', { data: { SK_USUARIO } });
  return res.data;
};
