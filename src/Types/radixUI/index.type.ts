import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
// #region ===== Enums =====
/**
 * Enum representing the variant of radix ui button element.
 */
export enum ZRUVariantE {
  classic = 'classic',
  solid = 'solid',
  soft = 'soft',
  surface = 'surface',
  outline = 'outline',
  ghost = 'ghost'
}

/**
 * Enum representing the color of radix ui button element.
 */
export enum ZRUColorE {
  gray = 'gray',
  gold = 'gold',
  bronze = 'bronze',
  brown = 'brown',
  yellow = 'yellow',
  amber = 'amber',
  orange = 'orange',
  tomato = 'tomato',
  red = 'red',
  ruby = 'ruby',
  crimson = 'crimson',
  pink = 'pink',
  plum = 'plum',
  purple = 'purple',
  violet = 'violet',
  iris = 'iris',
  indigo = 'indigo',
  blue = 'blue',
  cyan = 'cyan',
  teal = 'teal',
  jade = 'jade',
  green = 'green',
  grass = 'grass',
  lime = 'lime',
  mint = 'mint',
  sky = 'sky'
}

/**
 * Enum representing the radius of radix ui button element.
 */
export enum ZRURadiusE {
  none = 'none',
  small = 'small',
  medium = 'medium',
  large = 'large',
  full = 'full'
}

/**
 * Enum representing the 'as' of radix ui flex element.
 */
export enum ZRUAsE {
  div = 'div',
  span = 'span'
}

/**
 * Enum representing the 'direction' of radix ui flex element.
 */
export enum ZRUDirectionE {
  row = 'row',
  column = 'column',
  rowRevers = 'row-reverse',
  columnRevers = 'column-reverse'
}

/**
 * Enum representing the 'position' of radix ui flex element.
 */
export enum ZRUPositionE {
  static = 'static',
  relative = 'relative',
  absolute = 'absolute',
  fixed = 'fixed',
  sticky = 'sticky'
}

/**
 * Enum representing the 'display' of radix ui flex element.
 */
export enum ZRUDisplayE {
  none = 'none',
  inlineFlex = 'inline-flex',
  flex = 'flex'
}

/**
 * Enum representing the 'display' of radix ui container element.
 */
export enum ZRUContainerDisplayE {
  none = 'none',
  initial = 'initial'
}

/**
 * Enum representing the 'align' of radix ui flex element.
 */
export enum ZRUAlignE {
  start = 'start',
  center = 'center',
  end = 'end',
  baseline = 'baseline',
  stretch = 'stretch'
}

/**
 * Enum representing the 'align' of radix ui container element.
 */
export enum ZRUContainerAlignE {
  left = 'left',
  center = 'center',
  right = 'right'
}

/**
 * Enum representing the 'justify' of radix ui flex element.
 */
export enum ZRUJustifyE {
  start = 'start',
  center = 'center',
  end = 'end',
  between = 'between'
}

/**
 * Enum representing the 'wrap' of radix ui flex element.
 */
export enum ZRUWrapE {
  nowrap = 'nowrap',
  wrap = 'wrap',
  wrapReverse = 'wrap-reverse'
}

/**
 * Enum representing the 'overflow' of radix ui flex element.
 */
export enum ZRUOverflowE {
  visible = 'visible',
  hidden = 'hidden',
  clip = 'clip',
  scroll = 'scroll',
  auto = 'auto'
}
// #endregion

// #region ===== Interfaces =====
export interface ZRUStyleI {
  p?: Responsive<string>;
  px?: Responsive<string>;
  py?: Responsive<string>;
  pt?: Responsive<string>;
  pr?: Responsive<string>;
  pb?: Responsive<string>;
  pl?: Responsive<string>;
  width?: Responsive<string>;
  minWidth?: Responsive<string>;
  maxWidth?: Responsive<string>;
  height?: Responsive<string>;
  minHeight?: Responsive<string>;
  maxHeight?: Responsive<string>;
  position?: Responsive<ZRUPositionE>;
  inset?: Responsive<string>;
  top?: Responsive<string>;
  right?: Responsive<string>;
  bottom?: Responsive<string>;
  left?: Responsive<string>;
  overflow?: Responsive<ZRUOverflowE>;
  overflowX?: Responsive<ZRUOverflowE>;
  overflowY?: Responsive<ZRUOverflowE>;
  flexBasis?: Responsive<string>;
  flexShrink?: Responsive<string>;
  flexGrow?: Responsive<string>;
  gridColumn?: Responsive<string>;
  gridColumnStart?: Responsive<string>;
  gridColumnEnd?: Responsive<string>;
  gridRow?: Responsive<string>;
  gridRowStart?: Responsive<string>;
  gridRowEnd?: Responsive<string>;
}
// #endregion

// #region ===== Types =====

/**
 * Type representing the responsive value of radix ui elements.
 */
export type ResponsiveT<T> = T | Record<string, T>;

/**
 * Type representing the size of radix ui button element.
 */
export type ZRUSizeT = '1' | '2' | '3' | '4';

/**
 * Type representing the margin of radix ui elements.
 */
export type ZRUMarginT =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '-1'
  | '-2'
  | '-3'
  | '-4'
  | '-5'
  | '-6'
  | '-7'
  | '-8'
  | '-9';

// #endregion
