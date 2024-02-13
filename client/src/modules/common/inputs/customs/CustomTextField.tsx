import { ChangeEvent, memo } from 'react';
import { TextField } from '@mui/material';
import { CustomInputProps } from '@/modules/common/inputs/input.types';

const CustomTextField = (props: CustomInputProps) => {
  const customOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) props.onChange(e.target.value);
  };
  return (
    <TextField
      className="text-field-sba"
      variant="filled"
      aria-label={props?.name || 'Custom Input'}
      {...props}
      onChange={customOnChange}
    />
  );
};
export default memo(CustomTextField);
