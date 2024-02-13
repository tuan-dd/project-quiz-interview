import { Suspense, useEffect } from 'react';
import { useScrollbarContext } from './contexts/useScrollBar';
import { RouterProvider } from 'react-router-dom';
import router from './app/routerProvider';
import GeneralDiaLog from './modules/components/GeneralDialog/GeneralDiaLog';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { useDisplayDataContext } from './contexts/displayData';
import { darkThemeConfig, lightThemeConfig } from './types/configs/theme-config';
import { THEME_MODE } from './types/enums';
import SpinComponent from './modules/components/SpinComponent/SpinComponent';

export const ScrollToTop = (props: { children: any }) => {
  const { scrollToTop } = useScrollbarContext();

  useEffect(() => {
    scrollToTop(0);
  }, [scrollToTop]);

  return props.children;
};

function App() {
  const { theme } = useDisplayDataContext();
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme === THEME_MODE.DARK ? darkThemeConfig : lightThemeConfig}>
        <ScrollToTop>
          <Suspense fallback={<SpinComponent />}>
            <RouterProvider router={router} />
            <GeneralDiaLog />
          </Suspense>
        </ScrollToTop>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
