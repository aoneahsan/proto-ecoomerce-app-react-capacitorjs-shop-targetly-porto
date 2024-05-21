// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { RadioGroup } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
import { type ZRUColorE } from '@/types/radixUI/index.type';
interface ZRURadioGroupI {
  children?: React.ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  asChild?: boolean;
  size?: Responsive<'1' | '2' | '3'>;
  color?: ZRUColorE;
  highContrast?: boolean;
  value?: string;
  defaultValue?: string;
  name?: string;
  onChange?: React.FormEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}
// #endregion

/**
 * A customized Radix RadioGroup component.
 */
const ZRURadioGroup: React.FC<ZRURadioGroupI> = (props) => {
  return <RadioGroup.Root {...props}>{props?.children}</RadioGroup.Root>;
};

export default ZRURadioGroup;
