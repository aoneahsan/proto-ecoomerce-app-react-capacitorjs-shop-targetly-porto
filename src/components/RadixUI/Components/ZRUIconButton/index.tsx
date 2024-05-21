// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { IconButton } from '@radix-ui/themes';

// #endregion

// #region ---- Types Imports ----
import {
  type ZRUSizeT,
  type ZRUVariantE,
  type ZRUColorE,
  type ZRURadiusE
} from '@/types/radixUI/index.type';
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
interface ZRUIconButtonI {
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
}
// #endregion

/**
 * A customized Radix Icon Button component.
 */
const ZRUIconButton: React.FC<ZRUIconButtonI> = (props) => {
  return <IconButton>{props?.children}</IconButton>;
};

export default ZRUIconButton;
