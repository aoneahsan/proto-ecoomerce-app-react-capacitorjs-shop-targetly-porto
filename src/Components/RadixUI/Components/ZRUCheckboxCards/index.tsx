// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { CheckboxCards } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
import {
  type ZRUColorE,
  type ZRUCommonVariantE
} from '@/Types/radixUI/index.type';
interface ZRUCheckboxCardsGroupI {
  children?: React.ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  asChild?: boolean;
  size?: Responsive<'1' | '2' | '3'>;
  variant?: ZRUCommonVariantE;
  color?: ZRUColorE;
  highContrast?: boolean;
  columns?: Responsive<string>;
  gap?: Responsive<string>;
  defaultValue?: string[];
  value?: string[];
  onChange?: React.FormEventHandler<HTMLDivElement>;
}
// #endregion

/**
 * A customized Radix Checkbox cards component.
 */
const ZRUCheckboxCardsGroup: React.FC<ZRUCheckboxCardsGroupI> = (props) => {
  return <CheckboxCards.Root {...props}>{props?.children}</CheckboxCards.Root>;
};

export default ZRUCheckboxCardsGroup;
