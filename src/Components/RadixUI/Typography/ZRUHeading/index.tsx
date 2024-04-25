// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Heading } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
import {
  type ZRUHeadingAsE,
  type ZRUTextSizeT,
  type ZRUStyleI,
  type ZRUWeightE,
  type ZRUGeneralAlignE,
  type ZRUTrimE,
  type ZRUWrapE,
  type ZRUColorE
} from '@/Types/radixUI/index.type';
interface ZRUHeadingI extends ZRUStyleI {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
  style?: Record<string, unknown>;
  as?: ZRUHeadingAsE;
  size?: Responsive<ZRUTextSizeT>;
  weight?: Responsive<ZRUWeightE>;
  align?: Responsive<ZRUGeneralAlignE>;
  trim?: Responsive<ZRUTrimE>;
  truncate?: boolean;
  wrap?: Responsive<ZRUWrapE>;
  color?: ZRUColorE;
  highContrast?: boolean;
}
// #endregion

const ZRUHeading: React.FC<ZRUHeadingI> = (props) => {
  return <Heading {...props}>{props?.children}</Heading>;
};

export default ZRUHeading;
