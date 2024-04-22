import { ZClassNames } from '@/Packages/ClassNames';

const InfiniteSvg: React.FC<{
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
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
    >
      <g clipPath='url(#clip0_34918_23232)'>
        <path
          d='M12.5002 12.0046C12.5002 12.0046 10.2502 7.50457 6.59399 7.50457C4.05712 7.50457 2.00024 9.5202 2.00024 12.0046C2.00024 14.4889 4.05712 16.5046 6.59399 16.5046C8.00024 16.5046 9.24009 15.8868 10.2502 15.0046'
          stroke={color}
          strokeWidth='2.24206'
          strokeMiterlimit='10'
          strokeLinecap='round'
        />
        <path
          d='M12.5002 12.0046C12.5002 12.0046 14.7502 16.5046 18.4065 16.5046C20.9434 16.5046 23.0002 14.4889 23.0002 12.0046C23.0002 9.5202 20.9434 7.50457 18.4065 7.50457C17.0298 7.50457 15.7506 8.1491 14.7502 9.00457'
          stroke={color}
          strokeWidth='2.24206'
          strokeMiterlimit='10'
          strokeLinecap='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_34918_23232'>
          <rect
            width='24'
            height='24'
            fill='white'
            transform='translate(0.500244)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default InfiniteSvg;
