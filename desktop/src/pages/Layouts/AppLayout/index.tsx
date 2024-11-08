import { Outlet } from 'react-router-dom';
import { useStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { validateUserToken } from '@/api/auth/user';
import { getItem } from '@/utils/storage';
import { useLayoutEffect } from 'react';
import LoadingScreen from '@/pages/LoadingScreen';
import { isAxiosError } from '@/api/business';

const AppLayout = () => {
  const token = getItem(localStorage, 'token');

  const login = useStore.use.login();
  const logout = useStore.use.logout();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: validateUserToken,
    onSuccess: (data) => {
      const token = getItem(localStorage, 'token');

      if (token) {
        login({
          token: token,
          usuario: data.token.NM_USUARIO,
        });
      }
    },

    onError: (err) => {
      if (isAxiosError(err)) {
        if (err.response?.status === 401 || err.response?.status === 402) {
          logout(queryClient);
        }
      }
    },
  });

  useLayoutEffect(() => {
    if (token) {
      mutate();
    }
  }, []);

  if (isPending) return <LoadingScreen />;

  return <Outlet />;
};

export default AppLayout;
