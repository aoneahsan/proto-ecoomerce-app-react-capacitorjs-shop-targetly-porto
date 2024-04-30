// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Card } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { Responsive } from '@radix-ui/themes/dist/cjs/props';
import { type ZRUBasicVariantE } from '@/Types/radixUI/index.type';
interface ZRUCardI {
  children?: React.ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  asChild?: boolean;
  size?: Responsive<'1' | '2' | '3' | '4' | '5'>;
  variant?: ZRUBasicVariantE;
}
// #endregion

/**
 * A customized Radix Card component.
 */
const ZRUCard: React.FC<ZRUCardI> = (props) => {
  return <Card {...props}>{props?.children}</Card>;
};

export default ZRUCard;
