// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { TextField } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { Responsive } from '@radix-ui/themes/dist/cjs/props';
import {
  ZRUTextAsE,
  ZRUColorE,
  type ZRURadiusE
} from '@/types123/radixUI/index.type';
import ZRUBox from '../../Layout/ZRUBox';
import ZRUText from '../../Typography/ZRUText';
import { isZNonEmptyString } from '@/utils/helpers123';
import { ZColorEnum } from '@/utils/enums123/Elements.enum';
interface ZRUInputI {
  children?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  style?: Record<string, unknown>;
  value?: string | number;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  size?: Responsive<'1' | '2' | '3'>;
  color?: ZRUColorE;
  radius?: ZRURadiusE;
  isValid?: boolean;
  errorNode?: React.ReactNode;
  infoText?: React.ReactNode;
  label?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
// #endregion

/**
 * A customized Radix Input component.
 */
const ZRUInput: React.FC<ZRUInputI> = ({
  children,
  className,
  inputClassName,
  style,
  value,
  disabled,
  required,
  placeholder,
  size,
  color,
  radius,
  isValid = true,
  errorNode,
  infoText,
  label,
  name,
  onChange,
  onBlur
}) => {
  return (
    <ZRUBox className={className}>
      {isZNonEmptyString(label) ? (
        <ZRUText as={ZRUTextAsE.label}>
          {label}
          {required ? (
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
      <TextField.Root
        className={inputClassName}
        style={style}
        value={value}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        size={size}
        color={color}
        radius={radius}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      >
        {children}
      </TextField.Root>

      {/* Error */}
      {isValid === false &&
      ((typeof errorNode === 'string' && isZNonEmptyString(errorNode)) ||
        (errorNode !== null && errorNode !== undefined)) ? (
        <ZRUText
          as={ZRUTextAsE.span}
          size='1'
          color={ZRUColorE.tomato}
          className='font-medium'
        >
          {errorNode}
        </ZRUText>
      ) : null}

      {/* Info */}
      {isValid &&
      ((typeof infoText === 'string' && isZNonEmptyString(infoText)) ||
        (infoText !== null && infoText !== undefined)) ? (
        <ZRUText
          as={ZRUTextAsE.span}
          size='1'
          color={ZRUColorE.gold}
          className='font-medium'
        >
          {infoText}
        </ZRUText>
      ) : null}
    </ZRUBox>
  );
};

export default ZRUInput;
