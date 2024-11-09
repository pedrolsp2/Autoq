import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStore } from '@/store';
import { getItem } from '@/utils/storage';
import { AppSidebar } from '@/components/Sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/Header';

const ProtectedLayout = () => {
  const user = useStore.use.usuario();
  const token = getItem(localStorage, 'token');
  const location = useLocation();

  if (!user && !token) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="p-4 px-8 pt-3">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
