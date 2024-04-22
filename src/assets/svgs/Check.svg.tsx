import React from 'react';
import { ZClassNames } from '@/Packages/ClassNames';

const CheckSvg: React.FC<{
  color?: string;
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}> = ({ color = 'currentColor', className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={ZClassNames(className, {
        'w-5 h-5': true
      })}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0' />
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <g id='SVGRepo_iconCarrier'>
        <g id='Interface / Check'>
          <path
            id='Vector'
            d='M6 12L10.2426 16.2426L18.727 7.75732'
            stroke={color}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
    </svg>
  );
};

export default CheckSvg;
