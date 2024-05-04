import { type ReactNode } from 'react';
/**
 *  Interfaces
 */

// Zaions custom React select type
export interface ZRSelectOptions {
  readonly value?: string | number;
  readonly label?: ReactNode | string | number;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
  readonly className?: string;
  readonly extraData?: string;

  // others
  readonly symbol?: string;
}
