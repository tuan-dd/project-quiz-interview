import { GENERAL_COLOR } from '@/types/enums';
import React from 'react';

interface IStatusTag {
  color?: string;
  title: string;
}
const StatusTag = (props: IStatusTag) => {
  const { color = GENERAL_COLOR.PRIMARY, title } = props;
  return (
    <div className={'px-2  py-1 w-fit rounded-[3px] flex justify-center items-center relative'}>
      <span
        className={'block uppercase whitespace-nowrap text-[0.5rem] font-semibold'}
        style={{ color }}
      >
        {title}
      </span>
    </div>
  );
};

export default StatusTag;
