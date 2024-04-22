// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----
import { isZNonEmptyString } from '@/utils/Helpers';

// #endregion

// #region ---- Types Imports ----
import { type ZLabelPosition } from '@/utils/Enums/Elements.enum';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
interface ZTextareaI {
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  touched?: boolean;
  isValid?: boolean;
  errorNode?: React.ReactNode;
  infoText?: React.ReactNode;
  placeholder?: string;
  label?: string;
  value?: string | number | readonly string[];
  className?: string;
  name?: string;
  readOnly?: boolean;
  labelPosition?: ZLabelPosition;
  uploadBtnHandler?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  rows?: number;
  cols?: number;
}
// #endregion

const ZTextarea: React.FC<ZTextareaI> = ({
  onBlur,
  onChange,
  isValid = true,
  errorNode,
  placeholder,
  label = 'label',
  value = '',
  className,
  name = '',
  readOnly = false,
  infoText,
  style,
  rows = 3,
  cols
}) => {
  // const [inputState, setInputState] = useState({
  //   value
  // });
  return (
    <div className='w-full'>
      <div
        style={style}
        className={ZClassNames(className, {
          'relative min-h-[3.5rem] w-full border-b z-input-group': true,
          'border-ShadowedPlum': isValid,
          'border-danger': !isValid
        })}
      >
        <textarea
          readOnly={readOnly}
          name={name}
          rows={rows}
          cols={cols}
          value={value}
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
          className={ZClassNames({
            'w-full min-h-[90%] h-max mt-6 ps-4 leading-[1.5rem] font-medium tracking-[0.15px] font-roboto-regular border-none text-[1rem] bg-transparent outline-none rounded-md transition-all':
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

export default ZTextarea;
