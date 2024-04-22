import React from 'react';
import { ZClassNames } from '@/Packages/ClassNames';

const ExitSvg: React.FC<{
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
      xmlns='http://www.w3.org/2000/svg'
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
    >
      <path
        d='M36.0005 16.5047L43.5005 24.0047M43.5005 24.0047L36.0005 31.5047M43.5005 24.0047H17.9067M30.0005 16.5047V12.7547C30.0005 11.7601 29.6054 10.8063 28.9021 10.103C28.1989 9.39979 27.245 9.0047 26.2505 9.0047H8.25049C7.25593 9.0047 6.3021 9.39979 5.59884 10.103C4.89558 10.8063 4.50049 11.7601 4.50049 12.7547V35.2547C4.50049 36.2493 4.89558 37.2031 5.59884 37.9063C6.3021 38.6096 7.25593 39.0047 8.25049 39.0047H26.2505C27.245 39.0047 28.1989 38.6096 28.9021 37.9063C29.6054 37.2031 30.0005 36.2493 30.0005 35.2547V31.5047V16.5047Z'
        stroke={color}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ExitSvg;
