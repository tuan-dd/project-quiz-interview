import { IGeneralType, INPUT_TYPES, InputPropsMap } from '@/modules/common/inputs/input.types';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';

import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  useFormContext,
} from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import UncontrolledInput from './UncontrolledInput';

const ControlledInput = <T extends INPUT_TYPES>(props: IGeneralType<T> & InputPropsMap[T]) => {
  const {
    defaultValue,
    name,
    inputType,
    label,
    onChange,
    className = '',
    ignoreHelperText,
    ...restProps
  } = props;

  const { control, setValue } = useFormContext();

  const replaceOnChange = useCallback(
    (value: any) => {
      if (onChange) {
        onChange(value);
        return;
      }

      setValue(name, value, { shouldValidate: true });
    },
    [onChange, setValue, name],
  );

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue, { shouldValidate: true });
    }
  }, [defaultValue, setValue, name]);

  const renderCustomInput = (props: Partial<ControllerRenderProps & ControllerFieldState>) => {
    const { error, ...rest } = props;

    const errorMessage = error && error?.message?.toString();

    switch (inputType) {
      case INPUT_TYPES.CHECKBOX: {
        return (
          <FormControl error={!!errorMessage} className={className}>
            <UncontrolledInput
              inputType={INPUT_TYPES.CHECKBOX}
              {...rest}
              {...restProps}
              onChange={(value: any) => {
                replaceOnChange(value);
              }}
              className={className}
            />
            <FormHelperText id={name}>{errorMessage}</FormHelperText>
          </FormControl>
        );
      }

      case INPUT_TYPES.SELECT:
      case INPUT_TYPES.GROUP_CHECK_BOX: {
        return (
          <FormControl error={!!errorMessage} className={className}>
            <InputLabel>{label}</InputLabel>
            <UncontrolledInput
              inputType={inputType}
              {...rest}
              {...restProps}
              label={label}
              onChange={(value: any) => {
                replaceOnChange(value);
              }}
            />
            <FormHelperText id={name}>{errorMessage}</FormHelperText>
          </FormControl>
        );
      }
      case INPUT_TYPES.RADIO_BUTTON:
        return (
          <FormControl error={!!errorMessage} className={className}>
            <InputLabel>{label}</InputLabel>
            <UncontrolledInput
              inputType={inputType}
              {...rest}
              {...restProps}
              label={label}
              onChange={replaceOnChange as any}
              className={className}
            />
            <FormHelperText id={name}>{errorMessage}</FormHelperText>
          </FormControl>
        );
      default:
        return (
          <UncontrolledInput
            inputType={inputType}
            label={label}
            className={className}
            {...restProps}
            {...rest}
            onChange={(value: any) => {
              replaceOnChange(value);
            }}
            error={!!errorMessage}
            helperText={!ignoreHelperText ? errorMessage : ''}
          />
        );
    }
  };

  return (
    <Controller
      control={control}
      render={({ field: { value, ...rest }, fieldState: { error } }) =>
        renderCustomInput({
          error,
          value: value ?? undefined,
          ...rest,
        })
      }
      name={name}
    />
  );
};

export default ControlledInput;
