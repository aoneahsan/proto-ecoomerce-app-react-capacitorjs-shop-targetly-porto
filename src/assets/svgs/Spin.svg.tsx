import React from 'react';
import { ZClassNames } from '@/Packages/ClassNames';

const SpinSvg: React.FC<{
  color?: string;
  className?: string;
}> = ({ color = 'currentColor', className }) => {
  return (
    <>
      <svg
        className={ZClassNames(className, {
          'w-5 h-5 mr-3 -ml-1 animate-spin': true
        })}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke={color}
          strokeWidth='4'
        />
        <path
          className='opacity-75'
          fill={color}
          d='M 4 12 a 8 8 0 018-8 V 0 C 5.373 0 0 5.373 0 12 h 4 zm 2 5.291 A 7.962 7.962 0 014 12 H 0 c 0 3.042 1.135 5.824 7.938l3-2.647 z'
        />
      </svg>
    </>
  );
};

export default SpinSvg;
