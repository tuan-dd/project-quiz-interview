import { FC, memo, ReactElement } from 'react';
import {
  CustomInputProps,
  CustomSelectProps,
  CustomCheckBoxProps,
  INPUT_TYPES,
  ValueOfObject,
  CustomCheckboxProps,
  CustomRadioButtonGroupProps,
} from './input.types';
import {
  CustomCheckbox,
  CustomGroupCheckbox,
  CustomGroupRadioButton,
  CustomSelect,
  CustomTextField,
} from './customs';

type IUnControlledInput = {
  inputType: INPUT_TYPES;
  label?: string | JSX.Element | null;
  className?: string;
  placeholder?: string;
  onBlur?: any;
  onChange?: any;
};

const UncontrolledInput: FC<IUnControlledInput> = (props) => {
  const { inputType, ...rest } = props;
  const { onBlur, ...restWithoutBlur } = rest;

  const map: Record<ValueOfObject<typeof INPUT_TYPES>, ReactElement<any, any> | null> = {
    [INPUT_TYPES.INPUT]: <CustomTextField {...(rest as CustomInputProps)} />,
    [INPUT_TYPES.SELECT]: <CustomSelect {...(rest as CustomSelectProps)} />,
    [INPUT_TYPES.NUMBER]: <CustomTextField {...(rest as CustomInputProps)} type={'number'} />,
    [INPUT_TYPES.CHECKBOX]: <CustomCheckbox {...(rest as CustomCheckBoxProps)} />,
    [INPUT_TYPES.PASSWORD]: <CustomTextField {...(rest as CustomInputProps)} type={'password'} />,
    [INPUT_TYPES.GROUP_CHECK_BOX]: <CustomGroupCheckbox {...(rest as CustomCheckboxProps)} />,
    [INPUT_TYPES.RADIO_BUTTON]: (
      <CustomGroupRadioButton {...(rest as CustomRadioButtonGroupProps)} />
    ),
  };

  return map[inputType];
};

export default memo(UncontrolledInput);
