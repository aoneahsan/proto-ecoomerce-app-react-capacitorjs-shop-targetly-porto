// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----
import { isZNonEmptyString } from '@/utils/helpers123';

// #endregion

// #region ---- Types Imports ----
import { type ZLabelPosition } from '@/utils/enums/Elements.enum';
import { SearchSvg } from '@/assets';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
interface ZInputI {
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  touched?: boolean;
  isValid?: boolean;
  errorNode?: React.ReactNode;
  infoText?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  value?: string | number | readonly string[];
  className?: string;
  name?: string;
  readOnly?: boolean;
  labelPosition?: ZLabelPosition;
  uploadBtnHandler?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  disabled?: boolean;
  max?: string | number;
  min?: string | number;
  minLength?: number;
  maxLength?: number;
}
// #endregion

export const ZSearchBtnInput: React.FC<ZInputI> = ({
  onBlur,
  onChange,
  isValid = true,
  type = 'text',
  placeholder = 'text',
  value = '',
  className,
  name = '',
  readOnly = false,
  style,
  disabled
}) => {
  return (
    <div
      className={ZClassNames(className, {
        'w-[9rem] border-primary border-2 h-[2.6rem] leading-[1.5rem] font-black bg-transparent rounded-md transition-all text-[1rem] tracking-[1.2px] font-mont-heavy flex items-center justify-center':
          true,
        'text-danger': !isValid,
        'text-primary': isValid,
        'cursor-not-allowed opacity-70': disabled === true
      })}
    >
      <input
        readOnly={readOnly}
        disabled={disabled}
        style={style}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(event) => {
          // setInputState((oldValues) => ({
          //   ...oldValues,
          //   value: event?.target?.value
          // }));

          if (onChange !== undefined) {
            onChange(event);
          }
        }}
        onBlur={onBlur}
        className='w-[48%] h-full outline-none placeholder:uppercase placeholder:text-primary text-primary bg-transparent'
      />

      <SearchSvg className='ms-2 w-[1.75rem] h-[1.75rem] stroke-primary text-medium' />
    </div>
  );
};

const ZInput: React.FC<ZInputI> = ({
  onBlur,
  onChange,
  isValid = true,
  errorNode,
  type = 'text',
  placeholder,
  label = 'label',
  value = '',
  className,
  name = '',
  readOnly = false,
  infoText,
  style,
  max,
  min,
  minLength,
  maxLength
}) => {
  // const [inputState, setInputState] = useState({
  //   value
  // });
  return (
    <div className='w-full'>
      <div
        style={style}
        className={ZClassNames(className, {
          'relative h-[3.5rem] w-full border-b z-input-group': true,
          'border-ShadowedPlum': isValid,
          'border-danger': !isValid
        })}
      >
        <input
          readOnly={readOnly}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          max={max}
          min={min}
          maxLength={maxLength}
          minLength={minLength}
          onChange={(event) => {
            // setInputState((oldValues) => ({
            //   ...oldValues,
            //   value: event?.target?.value
            // }));

            if (onChange !== undefined) {
              onChange(event);
            }
          }}
          onBlur={onBlur}
          className={ZClassNames({
            'w-full h-[90%] mt-3 ps-4 leading-[1.5rem] font-medium tracking-[0.15px] font-roboto-regular border-none text-[1rem] bg-transparent outline-none rounded-md transition-all':
              true,
            'text-danger': !isValid,
            'text-tertiary': isValid
          })}
        />

        <label
          htmlFor=''
          className={ZClassNames({
            'absolute text-[1rem] transition-all -translate-y-1/2 pointer-events-none font-medium font-roboto-regular top-[58%] left-4 z-input-label':
              true,
            'text-tertiary': isValid,
            'text-danger': !isValid,
            'floating-label': isZNonEmptyString(String(value))
          })}
        >
          {label ?? 'label'}
        </label>
      </div>

      {!isValid &&
      ((typeof errorNode === 'string' && isZNonEmptyString(errorNode)) ||
        (errorNode !== null && errorNode !== undefined)) ? (
        <span className='text-[0.75rem] ps-4 leading-[1rem] block mt-[3px] tracking-[0.4px] font-medium font-roboto-regular'>
          {errorNode}
        </span>
      ) : null}

      {isValid &&
      ((typeof infoText === 'string' && isZNonEmptyString(infoText)) ||
        (infoText !== null && infoText !== undefined)) ? (
        <span className='text-[0.75rem] ms-4 me-[2rem] block mt-[3px] text-[#666] leading-[1rem] tracking-[0.4px] font-medium font-roboto-regular'>
          {infoText}
        </span>
      ) : null}
    </div>
  );
};

export default ZInput;
