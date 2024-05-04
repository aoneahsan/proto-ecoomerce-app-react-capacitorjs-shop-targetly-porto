// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Select } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import {
  ZRUColorE,
  type ZRUBasicVariantE,
  type ZRURadiusE,
  type ZRUMarginI,
  type ZRUSelectValueI,
  type ZRUSelectContentPositionE,
  ZRUTextAsE
} from '@/types123/radixUI/index.type';
import { Responsive } from '@radix-ui/themes/dist/cjs/props';
import ZRUBox from '../../Layout/ZRUBox';
import ZRUText from '../../Typography/ZRUText';
interface ZRUSelectI {
  children?: React.ReactNode;
  label?: string;
  asChild?: boolean;
  className?: string;
  style?: Record<string, unknown>;
  size?: Responsive<'1' | '2' | '3'>;
  defaultOpen?: boolean;
  defaultValue?: string;
  autoComplete?: string;
  disabled?: boolean;
  name?: string;
  open?: boolean;
  required?: boolean;
  value?: string;
  onOpenChange?(open: boolean): void;
  onValueChange?(value: string): void;

  trigger?: {
    variant?: ZRUBasicVariantE;
    color?: ZRUColorE;
    radius?: ZRURadiusE;
    placeholder?: string;
    className?: string;
  } & ZRUMarginI;

  content?: {
    color?: ZRUColorE;
    highContrast?: boolean;
    position?: ZRUSelectContentPositionE;
  };

  options?: Array<ZRUSelectValueI>;
}
// #endregion

const ZRUSelect: React.FC<ZRUSelectI> = (props) => {
  return (
    <ZRUBox>
      {props?.label !== undefined && props?.label?.trim()?.length > 0 ? (
        <ZRUText as={ZRUTextAsE.label} size='1' className='block mb-px'>
          {props?.label}
          {props?.required ? (
            <ZRUText
              as={ZRUTextAsE.span}
              className='ms-1'
              color={ZRUColorE.tomato}
            >
              *
            </ZRUText>
          ) : null}
        </ZRUText>
      ) : null}

      <Select.Root
        size={props.size}
        name={props.name}
        open={props.open}
        value={props.value}
        disabled={props.disabled}
        required={props.required}
        defaultOpen={props.defaultOpen}
        defaultValue={props.defaultValue}
        autoComplete={props.autoComplete}
        onOpenChange={props.onOpenChange}
        onValueChange={props.onValueChange}
      >
        <Select.Trigger {...props?.trigger} />

        <Select.Content {...props?.content}>
          {props?.options?.map((option, index) => {
            return (
              <Select.Item value={option?.value} key={index}>
                {option?.label}
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select.Root>
    </ZRUBox>
  );
};

export default ZRUSelect;
