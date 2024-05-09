// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Badge } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
import {
  type ZRURadiusE,
  type ZRUBadgeVariantE,
  type ZRUColorE
} from '@/Types/radixUI/index.type';
interface ZRUBadgeI {
  children?: React.ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  asChild?: boolean;
  size?: Responsive<'1' | '2' | '3'>;
  variant?: ZRUBadgeVariantE;
  color?: ZRUColorE;
  highContrast?: boolean;
  radius?: ZRURadiusE;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}
// #endregion

/**
 * A customized Radix Badge component.
 */
const ZRUBadge: React.FC<ZRUBadgeI> = (props) => {
  return <Badge {...props}>{props?.children}</Badge>;
};

export default ZRUBadge;
