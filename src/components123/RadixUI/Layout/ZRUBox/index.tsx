// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Box } from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
import {
  type ZRUAsE,
  type ZRUBoxDisplayE,
  type ZRUStyleI
} from '@/types123/radixUI/index.type';
interface ZRUBoxI extends ZRUStyleI {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
  style?: Record<string, unknown>;
  as?: ZRUAsE;
  display?: Responsive<ZRUBoxDisplayE>;
}
// #endregion

const ZRUBox: React.FC<ZRUBoxI> = (props) => {
  return <Box {...props}>{props?.children}</Box>;
};

export default ZRUBox;
