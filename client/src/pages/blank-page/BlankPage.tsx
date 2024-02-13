import { ROUTE_PATH } from '@/app/routerProvider';
import { useAuthContext } from '@/contexts/auth';
import { useDisplayDataContext } from '@/contexts/displayData';
import SpinComponent from '@/modules/components/SpinComponent/SpinComponent';
import { THEME_MODE } from '@/types/enums';
import { getLocalStorageByKey } from '@/utils';
import { Stack } from '@mui/material';
import React, { ChangeEvent, Suspense, useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const theme = getLocalStorageByKey('theme');
function BlankPage() {
  const { accessToken, isAuthLoading } = useAuthContext();
  const { setDisplayData } = useDisplayDataContext();

  const navigator = useNavigate();

  useEffect(() => {
    if (isAuthLoading) return;
    const isSignIn = !!accessToken;
    if (isSignIn) {
      navigator(ROUTE_PATH.HOME);
    }
  }, [accessToken, isAuthLoading]);

  useEffect(() => {
    if (!theme) {
      document.documentElement.classList.add(THEME_MODE.DARK);
      setDisplayData({ theme: THEME_MODE.DARK });
    } else {
      if (theme === THEME_MODE.DARK) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  return (
    <Stack className={'min-h-screen bg-light-Bg dark:bg-dark-Bg'}>
      <Suspense fallback={<SpinComponent />}>
        <Outlet />
      </Suspense>
    </Stack>
  );
}

export default BlankPage;
