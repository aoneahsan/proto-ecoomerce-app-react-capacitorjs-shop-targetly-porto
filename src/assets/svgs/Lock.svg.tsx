import React from 'react';

const ZLockSvg: React.FC<{
  color?: string;
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}> = ({ color = 'currentColor', className, onClick }) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      onClick={onClick}
      className={className}
    >
      <g strokeWidth='0' />
      <g strokeLinecap='round' strokeLinejoin='round' />
      <g>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V11.1707C18.1652 11.5825 19 12.6938 19 14V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V14C5 12.6938 5.83481 11.5825 7 11.1707V9ZM9 11H15V9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9V11Z'
          fill={color}
        />
      </g>
    </svg>
  );
};

export default ZLockSvg;

// <svg
//   viewBox='0 0 24 24'
//   fill='none'
//   className={className}
//   onClick={onClick}
// >
//   <g strokeWidth='0' />
//   <g strokeLinecap='round' strokeLinejoin='round' />
//   <g>
//     <path
//       fillRule='evenodd'
//       clipRule='evenodd'
//       d='M5.25 10.0546V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V10.0546C19.8648 10.1379 20.5907 10.348 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.40931 10.348 4.13525 10.1379 5.25 10.0546ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C16.867 10 16.4515 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8Z'
//       fill={color}
//     />
//   </g>
// </svg>
