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
  asChild?: boolean;
  className?: string;
  size?: Responsive<ZRUSizeT>;
  variant?: ZRUVariantE;
  color?: ZRUColorE;
  highContrast?: boolean;
  radius?: ZRURadiusE;
  loading?: boolean;
  disabled?: boolean;
  style?: Record<string, unknown>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
// #endregion

/**
 * A customized Radix Button component.
 */
const ZRUButton: React.FC<ZRUButtonI> = ({
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  style,
  asChild,
  children,
  className,
  size = '2',
  variant = ZRUVariantE.solid,
  color,
  highContrast,
  radius,
  loading = false,
  disabled = false,
  onClick
}) => {
  return (
    <Button
      m={m}
      mx={mx}
      my={my}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      size={size}
      color={color}
      style={style}
      radius={radius}
      variant={variant}
      loading={loading}
      asChild={asChild}
      highContrast={highContrast}
      disabled={disabled || loading}
      className={ZClassNames(className, {
        '!cursor-pointer': !loading,
        '!cursor-not-allowed': loading
      })}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ZRUButton;
