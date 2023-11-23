import { Navigate, Outlet } from 'react-router-dom';

import useAuthStore from '@/store/auth.store';

function AdminRoute() {
  const { auth } = useAuthStore();

  if (auth && auth?.user.role === 'ADMIN') {
    return <Outlet />;
  }
  return <Navigate to='/' replace />;
}

export default AdminRoute;
