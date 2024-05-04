// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { CheckboxGroup } from '@radix-ui/themes';

// #endregion

// #region ---- Types Imports ----
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
import {
  type ZRUTriggerVariantE,
  type ZRUColorE
} from '@/types123/radixUI/index.type';
interface ZRUCheckboxGroupI {
  children?: React.ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  asChild?: boolean;
  size?: Responsive<'1' | '2' | '3'>;
  color?: ZRUColorE;
  variant?: ZRUTriggerVariantE;
  highContrast?: boolean;
  value?: string[];
  defaultValue?: string[];
  name?: string;
  onChange?: React.FormEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}
// #endregion

/**
 * A customized Radix CheckboxGroup component.
 */
const ZRUCheckboxGroup: React.FC<ZRUCheckboxGroupI> = (props) => {
  return <CheckboxGroup.Root {...props}>{props?.children}</CheckboxGroup.Root>;
};

export default ZRUCheckboxGroup;
