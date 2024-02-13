import { memo, useCallback } from 'react';
import { Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { CustomSelectProps, IOption } from '../input.types';

export const renderOptionsSelect = (options: IOption[]) => {
  return options.map((opt) => (
    <MenuItem key={opt.key ?? opt.value} value={opt.value}>
      {opt.label}
    </MenuItem>
  ));
};

const CustomSelect = (props: CustomSelectProps) => {
  const { value, onChange, options, ...res } = props;

  const handleChangeSelect = useCallback(
    (e: SelectChangeEvent<any>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    },
    [onChange],
  );

  return (
    <Select value={value ?? ''} {...res} label={res.label} onChange={handleChangeSelect}>
      {renderOptionsSelect(options)}
    </Select>
  );
};

export default memo(CustomSelect);
