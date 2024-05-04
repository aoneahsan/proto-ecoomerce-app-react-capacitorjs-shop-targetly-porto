// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { TextArea } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUText } from '@/components/RadixUI';
import { isZNonEmptyString } from '@/utils/helpers123';

// #endregion

// #region ---- Types Imports ----
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
import {
  type ZRUTriggerVariantE,
  type ZRURadiusE,
  ZRUColorE,
  ZRUTextAsE
} from '@/types/radixUI/index.type';
interface ZRUTextAreaI {
  className?: string;
  textAriaClassName?: string;
  textAriaStyle?: Record<string, unknown>;
  style?: Record<string, unknown>;
  value?: string;
  size?: Responsive<'1' | '2' | '3'>;
  variant?: ZRUTriggerVariantE;
  color?: ZRUColorE;
  name?: string;
  radius?: ZRURadiusE;
  required?: boolean;
  label?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
}
// #endregion

/**
 * A customized Radix TextArea component.
 */
const ZRUTextArea: React.FC<ZRUTextAreaI> = ({
  className,
  textAriaClassName,
  textAriaStyle,
  style,
  value,
  size,
  variant,
  color,
  name,
  radius,
  required,
  label,
  placeholder,
  onChange,
  onBlur
}) => {
  return (
    <ZRUBox className={className} style={style}>
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
      <TextArea
        placeholder={placeholder}
        className={textAriaClassName}
        style={textAriaStyle}
        value={value}
        size={size}
        variant={variant}
        color={color}
        name={name}
        radius={radius}
        onChange={onChange}
        onBlur={onBlur}
      />
    </ZRUBox>
  );
};

export default ZRUTextArea;
