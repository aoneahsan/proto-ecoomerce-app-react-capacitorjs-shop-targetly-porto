// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Button } from '@radix-ui/themes';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Types Imports ----
import {
  ZRUVariantE,
  type ZRURadiusE,
  type ZRUSizeT,
  type ZRUColorE,
  type ZRUMarginI
} from '@/Types/radixUI/index.type';
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';

interface ZRUButtonI extends ZRUMarginI {
  children?: React.ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  asChild?: boolean;
  size?: Responsive<ZRUSizeT>;
  variant?: ZRUVariantE;
  color?: ZRUColorE;
  highContrast?: boolean;
  radius?: ZRURadiusE;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
// #endregion

/**
 * A customized Radix Button component.
 */
const ZRUButton: React.FC<ZRUButtonI> = (props) => {
  return (
    <Button
      {...props}
      disabled={props?.disabled || props?.loading}
      className={ZClassNames(props?.className, {
        '!cursor-pointer': !props?.disabled,
        '!cursor-not-allowed': props?.disabled
      })}
    >
      {props?.children}
    </Button>
  );
};

export default ZRUButton;
