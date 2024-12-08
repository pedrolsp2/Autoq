import { Outlet } from 'react-router-dom';
import { useStore } from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import { getItem } from '@/utils/storage';
import { useLayoutEffect } from 'react';

const AppLayout = () => {
  const token = getItem(localStorage, 'token');

  const login = useStore.use.login();
  const logout = useStore.use.logout();

  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    if (token) {
      login({
        token: token,
        usuario: JSON.parse(token),
      });
    } else {
      logout(queryClient);
    }
  }, []);

  return <Outlet />;
};

export default AppLayout;
