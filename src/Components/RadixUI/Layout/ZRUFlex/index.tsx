// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Flex } from '@radix-ui/themes';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import {
  ZRUAsE,
  type ZRUDisplayE,
  type ZRUDirectionE,
  type ZRUAlignE,
  type ZRUJustifyE,
  type ZRUWrapFlexE,
  type ZRUStyleI
} from '@/Types/radixUI/index.type';
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
interface ZRUFlexI extends ZRUStyleI {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
  style?: Record<string, unknown>;
  as?: ZRUAsE;
  direction?: Responsive<ZRUDirectionE>;
  display?: Responsive<ZRUDisplayE>;
  align?: Responsive<ZRUAlignE>;
  justify?: Responsive<ZRUJustifyE>;
  wrap?: Responsive<ZRUWrapFlexE>;
  gap?: Responsive<string>;
  gapX?: Responsive<string>;
  gapY?: Responsive<string>;
}
// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

/**
 * A customized Radix Flex layout component.
 */
const ZRUFlex: React.FC<ZRUFlexI> = ({
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  position,
  overflow,
  overflowX,
  overflowY,
  flexBasis,
  flexShrink,
  flexGrow,
  gridColumn,
  gridColumnStart,
  gridColumnEnd,
  gridRow,
  gridRowStart,
  gridRowEnd,
  children,
  asChild,
  className,
  style,
  as = ZRUAsE.div,
  direction,
  display,
  align,
  justify,
  wrap,
  gap,
  gapX,
  gapY
}) => {
  return (
    <Flex
      p={p}
      px={px}
      py={py}
      pt={pt}
      pr={pr}
      pb={pb}
      pl={pl}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
      height={height}
      minHeight={minHeight}
      maxHeight={maxHeight}
      position={position}
      overflow={overflow}
      overflowX={overflowX}
      overflowY={overflowY}
      flexBasis={flexBasis}
      flexShrink={flexShrink}
      flexGrow={flexGrow}
      gridColumn={gridColumn}
      gridColumnStart={gridColumnStart}
      gridColumnEnd={gridColumnEnd}
      gridRow={gridRow}
      gridRowStart={gridRowStart}
      gridRowEnd={gridRowEnd}
      className={ZClassNames(className)}
      style={style}
      as={as}
      asChild={asChild}
      direction={direction}
      display={display}
      align={align}
      justify={justify}
      wrap={wrap}
      gap={gap}
      gapX={gapX}
      gapY={gapY}
    >
      {children}
    </Flex>
  );
};

export default ZRUFlex;
