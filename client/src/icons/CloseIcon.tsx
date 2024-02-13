import React, { SVGProps } from 'react';

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 13L13 1M1 1L13 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
