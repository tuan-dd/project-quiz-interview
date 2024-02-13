/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import SpinComponent from '@/modules/components/SpinComponent/SpinComponent';
import { useDisplayDataContext } from '@/contexts/displayData';
import { getLocalStorageByKey, objectKeys } from '@/utils';
import { RoleEnum } from '@/types/enums/role';
import { handleLogout } from '@/services/base.service';
import { EntityEnum } from '@/types/enums/Entity';
import { ActionEnum } from '@/types/enums/action';
import { IUserRecord } from '@/types/servicesType';
import { useQuery } from '@tanstack/react-query';
import UserService from '@/services/user.service';
import { EKeyHeader } from '@/types/enums/basicHeader';

const setSessionInLocalStorage = (s: IAuthValue) => {
  const { isAuthLoading, ...rest } = s;

  const session = s as Record<string, any>;

  Object.keys(rest).map((key) => {
    if (session[key] === undefined) {
      localStorage.removeItem(key);
      return;
    }

    if (key === 'permissions') {
      return;
    }

    const value = typeof session[key] === 'string' ? session[key] : JSON.stringify(session[key]);

    localStorage.setItem(key, value);
  });
  return;
};

const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(EKeyHeader.ACCESS_TOKEN, accessToken);
  localStorage.setItem(EKeyHeader.REFRESH_TOKEN, refreshToken);
};

type Permission = Array<`${ActionEnum}_${EntityEnum}`>;
type PermissionKey = Permission[number];

const calcDefaultPermission = (): { [key in PermissionKey]?: boolean } => {
  const result: { [key in PermissionKey]?: boolean } = {};

  objectKeys(ActionEnum).forEach((action) => {
    objectKeys(EntityEnum).forEach((entity) => {
      result[`${action}_${EntityEnum[entity]}`] = false;
    });
  });
  return result;
};

export interface IAuthValue {
  isAuthLoading?: boolean;
  refreshToken?: string;
  accessToken?: string;
  user?: IUserRecord;
  permission?: { [key in PermissionKey]?: boolean };
}

export interface IAuthContext extends IAuthValue {
  setAuth: (value: IAuthValue) => void;
}

export const AuthContext = createContext<IAuthContext>({
  setAuth: (value: IAuthValue) => {},
});

type IUseAuthContext = Omit<IAuthContext, 'permission'> & {
  canShowManagementPage: boolean;
  permission: { [key in PermissionKey]?: boolean };
};

export const useAuthContext = (): IUseAuthContext => {
  const { user, permission, ...rest } = useContext(AuthContext);
  const canShowManagementPage: boolean = user?.role?.id
    ? [RoleEnum.SUPER_ADMIN].includes(user?.role?.id)
    : false;

  return { ...rest, user, permission: permission || {}, canShowManagementPage };
};

const localStorageToken = getLocalStorageByKey(EKeyHeader.REFRESH_TOKEN);
const localStorageAccessToken = getLocalStorageByKey(EKeyHeader.ACCESS_TOKEN);

export const AuthProvider = (props: { children: ReactNode }) => {
  const { displayAlert } = useDisplayDataContext();

  const [session, setSession] = useState<IAuthValue>({
    refreshToken: localStorageToken,
    accessToken: localStorageAccessToken,
    permission: calcDefaultPermission(),
  });

  const setAuth = useCallback((newValue: IAuthValue) => {
    setSession((s) => ({ ...s, ...newValue }));
    setTokens(newValue.accessToken as string, newValue.refreshToken as string);
  }, []);

  const { isLoading, data, fetchStatus, error } = useQuery({
    queryKey: ['getMe'],
    queryFn: async () => {
      const response = await UserService.getMe();
      const roleScopes = response?.data?.role?.scopes || [];
      const result: { [key in PermissionKey]?: boolean } = {};

      roleScopes.forEach((scope) => {
        const { entity, action } = scope;

        let temp = '';

        if (!action || !entity) return;

        temp = action;
        temp += `_${entity}`;

        result[temp as PermissionKey] = true;
      });

      setSession((s) => ({
        ...s,
        permission: { ...calcDefaultPermission(), ...result },
      }));
      setSessionInLocalStorage({ user: response.data });

      return response.data;
    },
    retry: 2,
    enabled: !!localStorageToken,
  });

  useEffect(() => {
    if (error) {
      displayAlert(error as any);

      if (error?.message.toLowerCase() === 'token is expired') {
        handleLogout();

        setAuth({ refreshToken: undefined, accessToken: undefined });
      }
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        ...session,
        user: data as IUserRecord,
        setAuth,
        isAuthLoading: isLoading && fetchStatus !== 'idle',
      }}
    >
      {props.children}
      <SpinComponent spinning={isLoading && fetchStatus !== 'idle'} />
    </AuthContext.Provider>
  );
};
