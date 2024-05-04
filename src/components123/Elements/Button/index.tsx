// #region ---- Core Imports ----
import React, { type ReactNode } from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
import { ZColorEnum, ZFill } from '@/utils/enums123/Elements.enum';
interface ZButtonI {
  children?: ReactNode;
  className?: string;
  fill?: ZFill;
  color?: ZColorEnum;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
// #endregion

const ZButton: React.FC<ZButtonI> = ({
  children,
  className,
  color = ZColorEnum.primary,
  fill = ZFill.solid,
  type = 'button',
  disabled = false,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={ZClassNames(className, {
        'rounded-[4px] uppercase py-[.5rem] text-[1rem] tracking-[1.2px] font-mont-heavy px-[1.5rem] font-black':
          true,
        'cursor-not-allowed opacity-70': disabled,
        'bg-primary text-secondary border-primary border-2':
          color === ZColorEnum.primary && fill === ZFill.solid,
        'text-primary bg-transparent':
          color === ZColorEnum.primary && fill === ZFill.clear,
        'border-primary border-2 text-primary':
          color === ZColorEnum.primary && fill === ZFill.outline,
        'text-secondary bg-transparent':
          color === ZColorEnum.secondary && fill === ZFill.clear,
        'bg-secondary text-dark':
          color === ZColorEnum.secondary && fill === ZFill.solid,
        'border-secondary border-2 text-secondary':
          color === ZColorEnum.secondary && fill === ZFill.outline,
        'bg-danger text-white':
          color === ZColorEnum.danger && fill === ZFill.solid,
        'bg-transparent text-danger':
          color === ZColorEnum.danger && fill === ZFill.clear,
        'border-danger border-2 text-danger':
          color === ZColorEnum.danger && fill === ZFill.outline,
        'bg-ShadowedPlum text-white':
          color === ZColorEnum.shadowedPlum && fill === ZFill.solid,
        'border-ShadowedPlum border-2 text-ShadowedPlum':
          color === ZColorEnum.shadowedPlum && fill === ZFill.outline,
        'bg-transparent text-ShadowedPlum':
          color === ZColorEnum.shadowedPlum && fill === ZFill.clear,
        'bg-tertiary text-white':
          color === ZColorEnum.tertiary && fill === ZFill.solid,
        'border-tertiary border-2 text-tertiary':
          color === ZColorEnum.tertiary && fill === ZFill.outline,
        'bg-transparent text-tertiary':
          color === ZColorEnum.tertiary && fill === ZFill.clear
      })}
    >
      {children}
    </button>
  );
};

export default ZButton;
