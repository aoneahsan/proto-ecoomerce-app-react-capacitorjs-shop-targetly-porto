// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { RadioGroup } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
interface ZRURadioItemI {
  children?: React.ReactNode;
  value: string;
  className?: string;
  style?: Record<string, unknown>;
  asChild?: boolean;
}
// #endregion

/**
 * A customized Radix RadioItem component.
 */
const ZRURadioItem: React.FC<ZRURadioItemI> = (props) => {
  return <RadioGroup.Item {...props}>{props?.children}</RadioGroup.Item>;
};

export default ZRURadioItem;
