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
import { type ZRUColorE, type ZRURadiusE } from '@/Types/radixUI/index.type';
interface ZRUInputI {
  children?: React.ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  value?: string | number;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  size?: Responsive<'1' | '2' | '3'>;
  color?: ZRUColorE;
  radius?: ZRURadiusE;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
// #endregion

/**
 * A customized Radix Input component.
 */
const ZRUInput: React.FC<ZRUInputI> = (props) => {
  return <TextField.Root {...props}>{props?.children}</TextField.Root>;
};

export default ZRUInput;
