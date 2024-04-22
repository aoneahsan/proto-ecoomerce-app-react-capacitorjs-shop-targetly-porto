import { ZClassNames } from '@/Packages/ClassNames';

const MenuSvg: React.FC<{
  color?: string;
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}> = ({ color = 'currentColor', className, onClick }) => {
  return (
    <svg
      fill={color}
      onClick={onClick}
      className={ZClassNames(className, {
        'w-5 h-5': true
      })}
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 150 150'
    >
      <g strokeWidth='0' />
      <g strokeLinecap='round' strokeLinejoin='round' />
      <g>
        <g>
          <path d='M15,30h120c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.716,0,0,6.716,0,15S6.716,30,15,30z' />
          <path d='M135,60H15C6.716,60,0,66.716,0,75s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,60,135,60z' />
          <path d='M135,120H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,120,135,120z' />
        </g>
      </g>
    </svg>
  );
};

export default MenuSvg;
