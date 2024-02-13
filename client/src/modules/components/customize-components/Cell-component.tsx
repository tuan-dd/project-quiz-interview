import { HTMLAttributes, ReactNode } from 'react';

const CellComponent = (props: { title: string; value: string | ReactNode } & HTMLAttributes<HTMLDivElement>) => {
  const { title, value, ...rest } = props;
  return (
    <div className={'max-w-[200px] overflow-hidden'} {...rest}>
      <div className={'table-col-title'}>{title}</div>
      <div>{value}</div>
    </div>
  );
};
export default CellComponent;
