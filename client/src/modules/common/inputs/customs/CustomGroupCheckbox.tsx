import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { ChangeEvent, memo, useCallback } from 'react';
import { CustomCheckboxProps } from '../input.types';

const CustomGroupCheckbox = (props: CustomCheckboxProps) => {
  const { onChange, value = [], label, options, ...rest } = props;

  const customOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const optionValue = event.target.name;
      let newValue: string[] = [];
      if (checked) {
        newValue = [...value, optionValue];
      } else {
        newValue = value.filter((i) => i !== optionValue);
      }

      if (props.onChange) props.onChange(newValue);
    },
    [props, value],
  );

  return (
    <>
      <FormGroup>
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            control={
              <Checkbox
                checked={value.includes(opt.value)}
                onChange={customOnChange}
                name={opt.value}
              />
            }
            label={opt.label}
          />
        ))}
      </FormGroup>
    </>
  );
};

export default memo(CustomGroupCheckbox);
