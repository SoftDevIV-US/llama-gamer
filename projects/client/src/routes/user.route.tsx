import { Navigate, Outlet } from 'react-router-dom';

import UserLayout from '@/app/layouts/UserLayout';
import useAuthStore from '@/store/auth.store';

function UserRoute() {
  const { auth } = useAuthStore();

  if (auth && auth?.user.role === 'ADMIN') {
    return <Navigate to='/admin' replace />;
  }

  return (
    <UserLayout>
      <Outlet />
    </UserLayout>
  );
}

export default UserRoute;
