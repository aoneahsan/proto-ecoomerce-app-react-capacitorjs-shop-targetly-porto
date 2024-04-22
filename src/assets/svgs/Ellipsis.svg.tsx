import React from 'react';

const EllipsisSvg: React.FC<{
  color?: string;
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}> = ({ color = 'currentColor', className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      viewBox='0 0 16 16'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      fill={color}
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0' />
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <g id='SVGRepo_iconCarrier'>
        <rect width='16' height='16' id='icon-bound' fill='none' />
        <path d='M4,8c0-1.103-0.897-2-2-2S0,6.897,0,8s0.897,2,2,2S4,9.103,4,8z M6,8c0,1.103,0.897,2,2,2s2-0.897,2-2S9.103,6,8,6 S6,6.897,6,8z M12,8c0,1.103,0.897,2,2,2s2-0.897,2-2s-0.897-2-2-2S12,6.897,12,8z' />
      </g>
    </svg>
  );
};

export default EllipsisSvg;
