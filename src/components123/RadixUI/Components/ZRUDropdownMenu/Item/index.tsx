// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { DropdownMenu } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { type ZRUColorE } from '@/types123/radixUI/index.type';
interface ZRUDropdownMenuItemI {
  children?: React.ReactNode;
  asChild?: boolean;
  style?: Record<string, unknown>;
  className?: string;
  color?: ZRUColorE;
  shortcut?: string;
}
// #endregion

const ZRUDropdownMenuItem: React.FC<ZRUDropdownMenuItemI> = (props) => {
  return <DropdownMenu.Item {...props}>{props?.children}</DropdownMenu.Item>;
};

export default ZRUDropdownMenuItem;
