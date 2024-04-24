// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Container } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
import {
  type ZRUContainerAlignE,
  type ZRUContainerDisplayE,
  type ZRUSizeT
} from '@/Types/radixUI/index.type';
interface ZRUContainerI {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
  style?: Record<string, unknown>;
  size?: Responsive<ZRUSizeT>;
  display?: Responsive<ZRUContainerDisplayE>;
  align?: Responsive<ZRUContainerAlignE>;
}
// #endregion

const ZRUContainer: React.FC<ZRUContainerI> = (props) => {
  return <Container {...props}>{props?.children}</Container>;
};

export default ZRUContainer;
