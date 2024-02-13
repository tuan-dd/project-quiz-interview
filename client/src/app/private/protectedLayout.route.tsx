import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/auth';
import SpinComponent from '@/modules/components/SpinComponent/SpinComponent';
import { Stack } from '@mui/material';
import { ROUTE_PATH } from '../routerProvider';
import AppMenu from '@/app/private/AppMenu';

const ProtectedRoutesLayout = () => {
  const { isAuthLoading, accessToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthLoading) return;

    const isLogin = !!accessToken;
    if (!isLogin) {
      navigate(ROUTE_PATH.SIGN_IN);
    }
  }, [accessToken, isAuthLoading, navigate]);

  return (
    <Stack className={'min-h-screen bg-light-Bg dark:bg-dark-Bg'}>
      <AppMenu />

      <div className={`overflow-hidden`}>
        <Suspense fallback={<SpinComponent />}>
          <Outlet />
        </Suspense>
      </div>
    </Stack>
  );
};

export default ProtectedRoutesLayout;
