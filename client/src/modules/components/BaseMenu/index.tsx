import React, { FC, memo, useCallback, useMemo } from 'react';
import { useLocation, matchPath, useNavigate } from 'react-router-dom';
import { Breadcrumbs, Tab, Tabs } from '@mui/material';
import { GENERAL_COLOR } from '@/types/enums';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDisplayDataContext } from '@/contexts/displayData';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import { ArrowIcon } from '@/icons/ArrowIcon';
import { IMenuItem } from '@/types/generalType';
import LinkTab from '../customize-components/Link-tab';

interface IBaseMenu {
  items: Array<IMenuItem>;
  callback?: () => void;
  isBreadcrumbStyle?: boolean;
}

type InputType = {
  palette: {
    selected_text: string;
    subtext: string;
  };
  mode: 'dark' | 'light';
};

const generateThemeConfig = (input: InputType): ThemeOptions => {
  const { palette, mode } = input;
  return {
    palette: {
      mode,
      primary: {
        main: '#385D7E',
      },
      text: {
        primary: '#707B84',
      },
    },
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            maxWidth: 'fit-content',
            fontWeight: 'bold',
            color: palette.subtext,
            '&.Mui-selected': {
              color: palette.selected_text,
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            background: GENERAL_COLOR.SECONDARY,
          },
        },
      },
    },
  };
};

const lightThemeConfig = generateThemeConfig({
  mode: 'light',
  palette: {
    selected_text: '#385D7E',
    subtext: '#707B84',
  },
});
const darkThemeConfig = generateThemeConfig({
  mode: 'light',
  palette: {
    selected_text: '#447DAF',
    subtext: '#707B84',
  },
});

const BaseMenu: FC<IBaseMenu> = (props) => {
  const { items, callback, isBreadcrumbStyle, ...rest } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkTheme } = useDisplayDataContext();

  const current = useMemo<number | false>(() => {
    const key = items?.findIndex((item) =>
      matchPath(
        {
          path: item?.key as string,
          caseSensitive: true,
          end: true,
        },
        location.pathname,
      ),
    );
    return key !== -1 ? key : false;
  }, [items, location.pathname]);

  const onChange = useCallback(
    (newValue: string) => {
      if (callback) {
        callback();
      }
      navigate(newValue);
    },
    [callback, navigate],
  );

  const theme = useMemo(
    () => createTheme(isDarkTheme ? darkThemeConfig : lightThemeConfig),
    [isDarkTheme],
  );

  return (
    <ThemeProvider theme={theme}>
      {isBreadcrumbStyle ? (
        <Breadcrumbs
          separator={<ArrowIcon fontSize="small" className={'subText'} />}
          aria-label="breadcrumb"
        >
          {items.map((i, idx, arr) => {
            const isLastItem = idx === arr.length - 1;

            return (
              <div className={'relative'} key={i.key}>
                <Tab
                  className={isLastItem ? 'Mui-selected' : ''}
                  label={i.label}
                  value={i.key}
                  onClick={() => {
                    if (isLastItem) {
                      return;
                    }
                    onChange(i.key);
                  }}
                />
                {isLastItem && (
                  <span className={'bg-secondaryColor h-[2px] w-full absolute bottom-0 left-0'} />
                )}
              </div>
            );
          })}
        </Breadcrumbs>
      ) : (
        <Tabs value={current} variant="fullWidth" {...rest}>
          {items.map((i) => (
            <LinkTab key={i.key} label={i.label} href={i.key} />
          ))}
        </Tabs>
      )}
    </ThemeProvider>
  );
};

export default memo(BaseMenu);
