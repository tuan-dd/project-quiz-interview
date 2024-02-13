import React, { SVGProps } from 'react';

export const ArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L6 6.03911L1 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
