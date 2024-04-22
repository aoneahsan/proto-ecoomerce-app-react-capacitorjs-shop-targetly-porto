import { type ZColorEnum } from '@/utils/Enums/Elements.enum';

export type ZGenericObject<T> = Record<string, T>;

// app vise sidebar interface
export interface ZSidebarI {
  isOpen?: boolean;
  component?: React.FC<unknown>;
  componentProps?: ZGenericObject<unknown>;

  //
  width?: string;
  shouldBackdropClose?: boolean;
}

// app vise loader interface
export interface ZLoaderI {
  isOpen?: boolean;
  message?: string;
}

// app vise modal interface
export interface ZModalI {
  isOpen?: boolean;
  component?: React.FC<unknown>;
  componentProps?: ZGenericObject<unknown>;
  containerClassName?: string;

  //
  width?: string;
  height?: string;
  color?: ZColorEnum;
  shouldBackdropClose?: boolean;
}

// app vise blocker interface
export interface ZAppViseBlockerI {
  shouldBlock: boolean;
  messages?: string;
}

export interface useZMediaQueryScaleReturnInterface {
  is2XlScale: boolean;
  isBelow2XlScale: boolean;
  isXlScale: boolean;
  isLgScale: boolean;
  isMdScale: boolean;
  isSmScale: boolean;
  isXsScale: boolean;
  is1300pxScale: boolean;
  is1200pxScale: boolean;
  is1250pxScale: boolean;
  is1150pxScale: boolean;
  is1100pxScale: boolean;
}
