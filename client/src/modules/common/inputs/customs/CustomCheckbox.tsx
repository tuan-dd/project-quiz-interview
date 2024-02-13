import { ChangeEvent, memo, useCallback } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { CustomCheckBoxProps } from '../input.types';

export interface OnchangeType {
  onChange?: (value: any) => void;
}

const CustomCheckBox = (props: CustomCheckBoxProps) => {
  const { label, value, onChange, className, ...rest } = props;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (onChange) onChange(checked);
    },
    [onChange],
  );

  return (
    <FormGroup className={className}>
      <FormControlLabel
        control={<Checkbox checked={value as boolean} onChange={handleChange} {...rest} />}
        label={label}
      />
    </FormGroup>
  );
};
export default memo(CustomCheckBox);
