import React from 'react';
import { ZClassNames } from '@/Packages/ClassNames';

const AddSvg: React.FC<{
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
      width='14'
      height='16'
      viewBox='0 0 448 512'
      focusable={false}
    >
      <g>
        <path
          fill={color}
          d='M416 208c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32h-144v144c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32v-144h-144c-17.7 0-32-14.3-32-32v-32c0-17.7 14.3-32 32-32h144v-144c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32v144h144z'
        ></path>
      </g>
    </svg>
  );
};

export default AddSvg;
