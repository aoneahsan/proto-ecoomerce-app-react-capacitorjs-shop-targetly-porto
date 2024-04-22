import React from 'react';
import { ZClassNames } from '@/Packages/ClassNames';

const EditSvg: React.FC<{
  color?: string;
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  style?: React.CSSProperties;
}> = ({ color = 'currentColor', className, onClick, style }) => {
  return (
    <svg
      onClick={onClick}
      style={style}
      className={ZClassNames(className, {
        'w-5 h-5': true
      })}
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 32 32'
      enableBackground='new 0 0 32 32'
      fill={color}
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0' />
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <g id='SVGRepo_iconCarrier'>
        <polygon points='22,16.8 22,26 6,26 6,10 15.2,10 17.2,8 4,8 4,28 24,28 24,14.8 ' />
        <path
          fill='none'
          stroke={color}
          strokeWidth='2'
          strokeMiterlimit='10'
          d='M16.5,18.3L13,19l0.7-3.5l9.9-9.9 c0.8-0.8,2-0.8,2.8,0l0,0c0.8,0.8,0.8,2,0,2.8L16.5,18.3z'
        />
      </g>
    </svg>
  );
};

export default EditSvg;
