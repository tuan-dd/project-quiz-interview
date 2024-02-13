import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { useSnackbar, VariantType } from 'notistack';
import { Button, DialogProps } from '@mui/material';
import { getLocalStorageByKey, useToggle } from '@/utils';
import { CloseIcon } from '@/icons';
import { ErrorCode } from '../types/enums/errorCode';
import theme from 'tailwindcss/defaultTheme';
import { THEME_MODE } from '@/types/enums';
export interface IDisplayDataValue extends DialogProps {
  toggleOpen: () => void;
  theme?: THEME_MODE.LIGHT | THEME_MODE.DARK;
}

export interface IDisplayDataContext extends IDisplayDataValue {
  setDisplayData: (input: Record<string, unknown>) => void;
  confirm: (input: Record<string, unknown>) => void;
}

const DisplayDataContext = createContext<IDisplayDataContext>({
  content: '',
  open: false,
  toggleOpen: () => {
    return false;
  },
  setDisplayData: () => {
    return null;
  },
  confirm: () => {
    return null;
  },
});

interface IUseDisplayDataContext extends IDisplayDataContext {
  displayAlert: (message: string, variant?: VariantType) => void;
  onOk?: () => void;
  onCancel?: () => void;
  isDarkTheme: boolean;
}

const ERROR_EXCEPTIONS = [
  ErrorCode.NOT_FOUND_AUTH_USER,
  ErrorCode.NOT_FOUND_QUESTION,
  ErrorCode.NOT_FOUND_QUIZ,
  ErrorCode.NOT_FOUND_USER,
];

const isErrorCodeType = (input: unknown): input is ErrorCode[keyof ErrorCode] => {
  if (!input || typeof input !== 'string') return false;
  return Object.values(ErrorCode).includes(input as any);
};

const localStorageTheme = getLocalStorageByKey('theme');

export const useDisplayDataContext = (): IUseDisplayDataContext => {
  const { ...rest } = useContext(DisplayDataContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const displayAlert = useCallback(
    (message: string | any, variant?: VariantType) => {
      const finalMessage: string = (() => {
        if (typeof message === 'string') return message;

        const errorMessage = message?.response?.errors?.[0]?.message || 'Unknown Error';
        const appErrorCode = message?.response?.errors?.[0]?.extensions.appErrorCode;

        if (appErrorCode && ERROR_EXCEPTIONS.includes(appErrorCode as ErrorCode))
          return errorMessage;
        if (isErrorCodeType(appErrorCode)) {
          return appErrorCode;
        }
        return errorMessage;
      })();

      enqueueSnackbar(finalMessage, {
        variant: variant || 'error',
        hideIconVariant: true,
        action: (key) => (
          <>
            <Button
              size="small"
              color={variant === 'default' ? 'primary' : variant}
              onClick={() => closeSnackbar(key)}
              endIcon={
                <p className={'text-white'}>
                  <CloseIcon />
                </p>
              }
            />
          </>
        ),
      });
    },
    [enqueueSnackbar, closeSnackbar],
  );

  return useMemo(
    () => ({
      ...rest,
      displayAlert,
      isDarkTheme: !rest?.theme ? true : rest?.theme === THEME_MODE.DARK,
    }),
    [displayAlert, rest],
  );
};

const initValue = {
  content: '',
  open: false,
  title: '',
};

export const DisplayDataProvider = (props: { children: ReactNode }) => {
  const [open, toggleOpen] = useToggle();
  const [value, setDisplayDataValue] = useState<IDisplayDataValue>({
    ...initValue,
    theme: localStorageTheme,
    toggleOpen,
  });

  const setDisplayDataProps = useCallback((input: Record<string, unknown>) => {
    Object.keys(input).forEach((key) => {
      const value = input[key];
      if (key === 'theme') {
        localStorage.setItem(key, value as string);
      }
      setDisplayDataValue((s) => ({
        ...s,
        [key]: value,
      }));
    });
  }, []);

  const onClose = useCallback(() => {
    setDisplayDataProps(initValue);
  }, [setDisplayDataProps]);

  const confirm = useCallback(
    (input: Record<string, unknown>) => {
      toggleOpen();
      setDisplayDataProps(input);
    },
    [setDisplayDataProps, toggleOpen],
  );

  return (
    <DisplayDataContext.Provider
      value={{
        ...value,
        open,
        onClose,
        setDisplayData: setDisplayDataProps,
        confirm,
      }}
    >
      {props.children}
    </DisplayDataContext.Provider>
  );
};
