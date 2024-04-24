import React from 'react';

const ZCartBagSvg: React.FC<{
  color?: string;
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}> = ({ color = 'currentColor', className, onClick }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      onClick={onClick}
    >
      <path d='M3 9c0-1.5 1.5-3 3-3h12c1.5 0 3 1.5 3 3v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z' />
      <path d='M9 8V4c0-1.5 1.5-3 3-3s3 1.5 3 3v4' />
    </svg>
  );
};

export default ZCartBagSvg;
