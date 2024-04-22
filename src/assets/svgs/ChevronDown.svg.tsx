import { ZClassNames } from '@/Packages/ClassNames';

const ChevronDown: React.FC<{
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
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
    >
      <path
        d='M6.125 10.0574L14 17.9324L21.875 10.0574'
        stroke={color}
        strokeWidth='2.625'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ChevronDown;
