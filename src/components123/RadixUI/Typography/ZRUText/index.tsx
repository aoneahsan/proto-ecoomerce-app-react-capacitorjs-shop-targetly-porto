// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Text } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
import {
  type ZRUTextAsE,
  type ZRUTextSizeT,
  type ZRUWeightE,
  type ZRUGeneralAlignE,
  type ZRUTrimE,
  type ZRUWrapE,
  type ZRUColorE
} from '@/types123/radixUI/index.type';
interface ZRUTextI {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
  style?: Record<string, unknown>;
  as?: ZRUTextAsE;
  size?: Responsive<ZRUTextSizeT>;
  weight?: Responsive<ZRUWeightE>;
  align?: Responsive<ZRUGeneralAlignE>;
  trim?: Responsive<ZRUTrimE>;
  truncate?: boolean;
  wrap?: Responsive<ZRUWrapE>;
  color?: ZRUColorE;
  highContrast?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}
// #endregion

const ZRUText: React.FC<ZRUTextI> = (props) => {
  return <Text {...props}>{props?.children}</Text>;
};

export default ZRUText;
