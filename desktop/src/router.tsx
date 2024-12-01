import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from '@/pages/Layouts/ProtectedLayout';
import AppLayout from './pages/Layouts/AppLayout';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import PublicLayout from './pages/Layouts/PublicLayout';
import NotFound from './pages/Layouts/NotFound';
import Criar from './pages/Usuario/Criar';
import Gestao from './pages/Usuario/Gestao';
import CriarCliente from './pages/Cliente/components/Criar';
import GestaoCliente from './pages/Cliente/components/Gestao';
import CriarPecas from './pages/Pecas/Criar';
import GestaoPecas from './pages/Pecas/Gestao';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<PublicLayout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/usuario/criar" element={<Criar />} />
            <Route path="/usuario/gestao" element={<Gestao />} />
            <Route path="/cliente/criar" element={<CriarCliente />} />
            <Route path="/cliente/gestao" element={<GestaoCliente />} />
            <Route path="/pecas/criar" element={<CriarPecas />} />
            <Route path="/pecas/gestao" element={<GestaoPecas />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
