import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { memo, useCallback } from 'react';
import { CustomRadioButtonGroupProps } from '../input.types';

const CustomGroupCheckbox = (props: CustomRadioButtonGroupProps) => {
  const { onChange, value, label, options, ...rest } = props;

  const handleRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
      if (onChange) onChange(value);
    },
    [onChange],
  );
  return (
    <>
      <RadioGroup {...rest} value={value} onChange={handleRadioChange}>
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio checked={value?.includes(opt.value)} />}
            label={opt.label}
          />
        ))}
      </RadioGroup>
    </>
  );
};

export default memo(CustomGroupCheckbox);
