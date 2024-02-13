import React, { FC, HTMLProps } from 'react';
import { Stack } from '@mui/material';
import { StackProps } from '@mui/material/Stack/Stack';
import { SPACE } from '../../../types/enums/theme';

type TEmpty = StackProps & {
  message?: string;
  classNameImage?: HTMLProps<HTMLElement>['className'];
};

const Empty: FC<TEmpty> = ({ message = 'Service is not available', classNameImage = 'w-[60px]', ...other }) => {
  return (
    <Stack gap={SPACE.ELEMENT} alignItems={'center'} sx={{ width: '100%', padding: '1.5rem', ...other.sx }} {...other}>
      <img src={'/image/empty-box.png'} alt={'no-data'} className={classNameImage} />
      <span className={'subText italic'}>{message}</span>
    </Stack>
  );
};

export default Empty;
