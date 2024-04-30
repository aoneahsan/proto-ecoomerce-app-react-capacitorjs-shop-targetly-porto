// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ScrollArea } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
import {
  type ZRUScrollbarsE,
  type ZRURadiusE,
  type ZRUScrollbarTypeE
} from '@/Types/radixUI/index.type';
interface ZRUScrollAreaI {
  children?: React.ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  asChild?: boolean;
  size?: Responsive<'1' | '2' | '3'>;
  radius?: ZRURadiusE;
  scrollbars?: ZRUScrollbarsE;
  type?: ZRUScrollbarTypeE;
}
// #endregion

/**
 * A customized Radix scroll area component.
 */
const ZRUScrollArea: React.FC<ZRUScrollAreaI> = (props) => {
  return <ScrollArea {...props}>{props?.children}</ScrollArea>;
};

export default ZRUScrollArea;
