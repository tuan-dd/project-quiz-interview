import { CSSProperties, ReactNode } from 'react';

export interface IMenuItem {
  label: string | ReactNode;
  key: string;
  icon?: string | ReactNode;
  style?: CSSProperties;
}
