// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { CheckboxCards } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
interface ZRUCheckboxCardsItemI {
  value: string;
  children?: React.ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  asChild?: boolean;
}
// #endregion

/**
 * A customized Radix Checkbox item component.
 */
const ZRUCheckboxCardsItem: React.FC<ZRUCheckboxCardsItemI> = (props) => {
  return <CheckboxCards.Item {...props}>{props?.children}</CheckboxCards.Item>;
};

export default ZRUCheckboxCardsItem;
