import { type ZColorEnum } from '@/utils/enums/Elements.enum';
import { type ConnectionStatus } from '@capacitor/network';

export type ZGenericObject<T> = Record<string, T>;

export enum ZSideE {
  start = 'start',
  end = 'end'
}

// app vise sidebar interface
export interface ZSidebarI {
  isOpen?: boolean;
  component?: React.FC<unknown>;
  componentProps?: ZGenericObject<unknown>;

  //
  width?: string;
  shouldBackdropClose?: boolean;
  side?: ZSideE;
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
  is900pxScale: boolean;
  isBelow900pxScale: boolean;
}

/**
 * network details interface.
 */
export interface ZNetworkI {
  status?: ConnectionStatus;
}
