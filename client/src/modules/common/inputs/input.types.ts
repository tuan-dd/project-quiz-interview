import { ReactNode } from 'react';
import {
  TextFieldProps,
  CheckboxProps,
  FormControlProps,
  SelectProps,
  BaseTextFieldProps,
  RadioGroupProps,
} from '@mui/material';

export interface IOption {
  label: string | ReactNode;
  value: any;
  key?: string | number;
}

export enum INPUT_TYPES {
  INPUT = 'INPUT',
  SELECT = 'SELECT',
  NUMBER = 'NUMBER',
  CHECKBOX = 'CHECKBOX',
  PASSWORD = 'PASSWORD',
  RADIO_BUTTON = 'RADIO_BUTTON',
  GROUP_CHECK_BOX = 'GROUP_CHECK_BOX',
}

export interface OnchangeType {
  onChange?: (value: any) => void;
}

export interface IGeneralType<T> extends Omit<FormControlProps, 'prefix'> {
  label?: string | JSX.Element | null;
  name: string;
  isOptionValue?: boolean;
  errorMessage?: string | null;
  customOptions?: JSX.Element[];
  isFastField?: boolean;
  className?: string;
  prefix?: ReactNode | Element | string;
  inputType: T;
  ignoreOnBlur?: boolean;
  ignoreHelperText?: boolean;
}

export type CustomInputProps = TextFieldProps &
  OnchangeType & {
    ignoreHelperText?: boolean;
  };

export type CustomSelectProps = SelectProps &
  OnchangeType & {
    options: IOption[];
  };
export type CustomInputNumberProps = CustomInputProps;
export type CustomCheckBoxProps = CheckboxProps &
  OnchangeType & {
    label?: string;
  };

export type CustomFileUploadProps = {
  icon: ReactNode;
  multiple: boolean;
  accept: string;
  className?: string;
  label?: string;
  fileName: string;
} & OnchangeType;

export type CustomCheckboxProps = CheckboxProps &
  BaseTextFieldProps &
  OnchangeType & {
    value?: string[];
    options: IOption[];
  };

export type CustomRadioButtonGroupProps = RadioGroupProps &
  BaseTextFieldProps &
  OnchangeType & {
    value?: string;
    options: IOption[];
  };

export type InputPropsMap = {
  [INPUT_TYPES.INPUT]: CustomInputProps;
  [INPUT_TYPES.SELECT]: CustomSelectProps;
  [INPUT_TYPES.NUMBER]: CustomInputNumberProps;
  [INPUT_TYPES.CHECKBOX]: CustomCheckBoxProps;
  [INPUT_TYPES.PASSWORD]: CustomInputProps;
  [INPUT_TYPES.GROUP_CHECK_BOX]: CustomCheckboxProps;
  [INPUT_TYPES.RADIO_BUTTON]: CustomRadioButtonGroupProps;
};

export type ValueOfObject<T extends object> = T[keyof T];
