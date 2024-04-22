import { ZClassNames } from '@/Packages/ClassNames';

const UserSvg: React.FC<{
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
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.5002 2C6.98024 2 2.50024 6.48 2.50024 12C2.50024 17.52 6.98024 22 12.5002 22C18.0202 22 22.5002 17.52 22.5002 12C22.5002 6.48 18.0202 2 12.5002 2ZM12.5002 5C14.1602 5 15.5002 6.34 15.5002 8C15.5002 9.66 14.1602 11 12.5002 11C10.8402 11 9.50024 9.66 9.50024 8C9.50024 6.34 10.8402 5 12.5002 5ZM6.50024 15.98C7.79024 17.92 10.0002 19.2 12.5002 19.2C15.0002 19.2 17.2102 17.92 18.5002 15.98C18.4702 13.99 14.4902 12.9 12.5002 12.9C10.5002 12.9 6.53024 13.99 6.50024 15.98Z'
        fill={color}
      />
    </svg>
  );
};

export default UserSvg;
