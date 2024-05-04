// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZClassNames } from '@/Packages/ClassNames';
import { ZDropzone, type ZDropzoneAccept } from '@/Packages/ReactDropzone';

// #endregion

// #region ---- Custom Imports ----
import { isZNonEmptyString } from '@/utils/helpers123';
import ZButton from '@/components123/Elements/Button';

// #endregion

// #region ---- Types Imports ----
import { ZFill } from '@/utils/enums123/Elements.enum';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
interface ZUploadInputI {
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
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  style?: React.CSSProperties;
  accept?: ZDropzoneAccept;
}
// #endregion

const ZUploadInput: React.FC<ZUploadInputI> = ({
  onChange,
  isValid = true,
  errorNode,
  infoText,
  label = 'label',
  value = '',
  className,
  readOnly = false,
  multiple = true,
  style,
  accept = { 'image/*': ['.png', '.jpeg', '.jpg', '.gif'] }
}) => {
  return (
    <ZDropzone
      multiple={multiple}
      noClick={true}
      noKeyboard={true}
      accept={accept}
      onDrop={(acceptedFiles) => {
        if (onChange !== undefined) {
          onChange(acceptedFiles);
        }
      }}
    >
      {({ getRootProps, getInputProps, open }) => {
        return (
          <>
            <div
              {...getRootProps({
                className: ZClassNames(className, {
                  'relative border-b z-input-group': true,
                  'border-ShadowedPlum': isValid,
                  'border-danger': !isValid,
                  'flex items-center': true,
                  'h-[3.5rem]': !isZNonEmptyString(String(value)),
                  'h-full': isZNonEmptyString(String(value))
                })
              })}
              style={style}
            >
              <input {...getInputProps()} readOnly={readOnly} />
              <div className='w-full h-[90%] pt-5 ps-4 leading-[1.5rem] font-medium tracking-[0.15px] font-roboto-regular border-none text-[1rem] bg-transparent outline-none rounded-md transition-all text-tertiary'>
                {/* {typeof value === "string" && isZNonEmptyString(value)
                  ? "File attached"
                  : typeof value === "object" && value?.length > 0
                  ? `${value?.length} Files attached`
                  : null} */}

                <div className='object-cover min-h-[90%] py-1'>
                  {typeof value === 'string' && isZNonEmptyString(value) ? (
                    <img
                      alt=''
                      src={value}
                      onClick={(e) => {
                        open();
                      }}
                      className='h-[6.25rem] w-[6.25rem]'
                    />
                  ) : null}
                </div>
              </div>

              <label
                htmlFor=''
                className={ZClassNames({
                  'absolute text-[1rem] transition-all -translate-y-1/2 pointer-events-none font-medium font-roboto-regular top-[58%] left-4':
                    true,
                  'text-tertiary': isValid,
                  'text-danger': !isValid,
                  'floating-label':
                    (typeof value === 'string' && isZNonEmptyString(value)) ||
                    (typeof value === 'object' && value?.length > 0)
                })}
              >
                {label ?? 'label'}
              </label>

              <ZButton
                className='uppercase h-max w-[12.5rem!important] z-text-size-point-8125rem pt-[6px!important] pb-[4px!important] px-[0rem!important] me-4'
                fill={ZFill.outline}
                onClick={(e) => {
                  open();
                }}
              >
                Upload Logo
              </ZButton>
            </div>

            {!isValid &&
            ((typeof errorNode === 'string' && isZNonEmptyString(errorNode)) ||
              (errorNode !== null && errorNode !== undefined)) ? (
              <span className='text-[0.75rem] ps-4 leading-[1rem] tracking-[0.4px] font-medium font-roboto-regular'>
                {errorNode}
              </span>
            ) : null}

            {isValid &&
            ((typeof infoText === 'string' && isZNonEmptyString(infoText)) ||
              (infoText !== null && infoText !== undefined)) ? (
              <span className='text-[0.75rem] ps-4 text-[#666] leading-[1rem] tracking-[0.4px] font-medium font-roboto-regular'>
                {infoText}
              </span>
            ) : null}
          </>
        );
      }}
    </ZDropzone>
  );
};

export default ZUploadInput;
