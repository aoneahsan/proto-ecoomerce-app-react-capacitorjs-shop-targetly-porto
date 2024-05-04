// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { TextField } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { Responsive } from '@radix-ui/themes/dist/cjs/props';
import { type ZRUSideE, type ZRUColorE } from '@/types/radixUI/index.type';
interface ZRUInputSlotI {
  children?: React.ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  side?: ZRUSideE;
  color?: ZRUColorE;
  gap?: Responsive<string>;
  px?: Responsive<string>;
  pl?: Responsive<string>;
  pr?: Responsive<string>;
}

// #endregion

/**
 * A customized Radix Input slot component.
 */
const ZRUInputSlot: React.FC<ZRUInputSlotI> = (props) => {
  return <TextField.Slot {...props}>{props?.children}</TextField.Slot>;
};

export default ZRUInputSlot;
