import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as qs from 'qs';
import { EKeyHeader } from '@/types/enums/basicHeader';

export const useToggle = (
  initValue = false,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [open, setOpen] = useState(initValue);
  const toggle = useCallback(() => {
    setOpen((s) => !s);
  }, []);

  useEffect(() => {
    if (initValue) setOpen(initValue);
  }, [initValue]);

  return [open, toggle, setOpen];
};

export const useDebounce = <T,>(value: T, time = 500): T | null => {
  const [text, setText] = useState<T | null>(null);

  useEffect(() => {
    const x = setTimeout(() => {
      setText(value);
    }, time);

    return () => {
      clearTimeout(x);
    };
  }, [time, value]);

  return text;
};

export const useSearchParamsTS = <T extends Record<string, unknown>>() => {
  const location = useLocation();

  const searchParamsValue = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }) as T;

  const navigate = useNavigate();

  const setParamsReplace = useCallback(
    (input: { key: keyof T & string; value: T[keyof T & string] }) => {
      const { key, value } = input;

      searchParamsValue[key] = value;
      navigate(location.pathname + '?' + qs.stringify(searchParamsValue), {
        replace: true,
      });
    },
    [location.pathname, navigate, searchParamsValue],
  );

  return { setParamsReplace, searchParamsValue, navigate, location };
};

export const getLocalStorageByKey = (key: string) => {
  const value = localStorage.getItem(key);

  if (key === 'theme') {
    if (!value) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    }
    return value;
  }

  if (!value) return undefined;

  if ([EKeyHeader.ACCESS_TOKEN, EKeyHeader.REFRESH_TOKEN, 'theme'].includes(key))
    return value || '';
  return JSON.parse(value);
};

export const objectKeys = <T extends object>(object: T): Array<keyof T> => {
  return Object.keys(object) as Array<keyof T>;
};
