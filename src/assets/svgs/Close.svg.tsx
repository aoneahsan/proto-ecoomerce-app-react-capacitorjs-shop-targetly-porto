import React from 'react';
import { ZClassNames } from '@/Packages/ClassNames';

const CloseSvg: React.FC<{
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
      viewBox='0 0 1024 1024'
      xmlns='http://www.w3.org/2000/svg'
      fill={color}
    >
      <g strokeWidth='0' />
      <g strokeLinecap='round' strokeLinejoin='round' />
      <g>
        <path
          fill={color}
          d='M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z'
        />
      </g>
    </svg>
  );
};

export default CloseSvg;
