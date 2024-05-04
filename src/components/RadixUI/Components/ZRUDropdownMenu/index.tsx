// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Button, DropdownMenu } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----
import ZRUButton from '../ZRUButton';

// #endregion

// #region ---- Types Imports ----
import { type ZRUColorE, ZRUVariantE } from '@/types/radixUI/index.type';
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
interface ZRUDropdownMenuI {
  children?: React.ReactNode;
  asChild?: boolean;
  style?: Record<string, unknown>;
  className?: string;
  size?: Responsive<'1' | '2'>;
  color?: ZRUColorE;
  highContrast?: boolean;
  trigger?: {
    children?: React.ReactNode;
  };
}
// #endregion

const ZRUDropdownMenu: React.FC<ZRUDropdownMenuI> = ({
  children,
  style,
  className,
  size,
  color,
  highContrast,
  trigger = {
    children: (
      <>
        Options
        <DropdownMenu.TriggerIcon />
      </>
    )
  }
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant={ZRUVariantE?.ghost}>{trigger?.children}</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        style={style}
        className={className}
        size={size}
        color={color}
        highContrast={highContrast}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ZRUDropdownMenu;
