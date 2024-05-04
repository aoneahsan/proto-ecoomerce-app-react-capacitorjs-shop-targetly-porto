// #region ---- Core Imports ----
import React, { useState } from 'react';

// #endregion

// #region ---- Packages Imports ----
import Select, {
  type SingleValue,
  type ActionMeta,
  type MultiValue,
  type PropsValue,
  type GroupBase,
  type OptionsOrGroups,
  type DropdownIndicatorProps,
  components,
  type StylesConfig
} from 'react-select';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----
import { isZNonEmptyString } from '@/utils/helpers123';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
import { type ZRSelectOptions } from '@/types/elements/Select.type';
import { type SelectComponents } from 'react-select/dist/declarations/src/components';
type ZSelectI = {
  className?: string;
  selectClassName?: string;
  classNamePrefix?: string;
  label?: string;
  name?: string;
  placeholder?: React.ReactNode;
  disabled?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  isRtl?: boolean;
  isSearchable?: boolean;
  isValid?: boolean;
  errorNode?: React.ReactNode;
  value?: PropsValue<ZRSelectOptions>;
  defaultValue?: PropsValue<ZRSelectOptions>;
  options: OptionsOrGroups<ZRSelectOptions, GroupBase<ZRSelectOptions>>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
  styles?: StylesConfig<ZRSelectOptions, boolean, GroupBase<ZRSelectOptions>>;
  components?: Partial<
    SelectComponents<ZRSelectOptions, boolean, GroupBase<ZRSelectOptions>>
  >;
  // isMulti: false | true;
  // onChange?: (
  //   newValue: ZSelectValue,
  //   actionMeta: ActionMeta<ZRSelectOptions>
  // ) => void;
} & (
  | {
      isMulti?: false;
      onChange?: (
        newValue: SingleValue<ZRSelectOptions>,
        actionMeta: ActionMeta<ZRSelectOptions>
      ) => void;
    }
  | {
      isMulti: true;
      onChange?: (
        newValue: MultiValue<ZRSelectOptions>,
        actionMeta: ActionMeta<ZRSelectOptions>
      ) => void;
    }
);

// Define a conditional type based on the isMulti prop
// type ZSelectValue = ZSelectI["isMulti"] extends true
//   ? MultiValue<ZRSelectOptions>
//   : SingleValue<ZRSelectOptions>;
// type ZSelectValue = MultiValue<ZRSelectOptions> | SingleValue<ZRSelectOptions>;

// #endregion

export const ZStandardSelect: React.FC<ZSelectI> = ({
  defaultValue,
  isMulti = false,
  name,
  placeholder,
  isClearable,
  isDisabled,
  isRtl,
  isSearchable,
  options,
  value,
  className,
  onFocus,
  onBlur,
  onChange,
  classNamePrefix,
  styles,
  components
}) => {
  return (
    <Select
      styles={styles}
      defaultValue={defaultValue}
      isMulti={isMulti}
      name={name}
      components={components}
      placeholder={placeholder}
      isClearable={isClearable}
      isDisabled={isDisabled}
      isRtl={isRtl}
      isSearchable={isSearchable}
      options={options}
      value={value}
      className={className}
      classNamePrefix={classNamePrefix}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={(value, actionMeta: ActionMeta<ZRSelectOptions>) => {
        if (onChange !== undefined) {
          const _value = value as ZRSelectOptions & MultiValue<ZRSelectOptions>;
          onChange(_value, actionMeta);
        }
      }}
    />
  );
};

export const ZBtnSelect: React.FC<ZSelectI> = ({
  defaultValue,
  isMulti = false,
  name,
  placeholder,
  isClearable,
  isDisabled,
  isRtl,
  isSearchable,
  options,
  value,
  className,
  onFocus,
  onBlur,
  onChange
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      isMulti={isMulti}
      name={name}
      placeholder={placeholder}
      isClearable={isClearable}
      components={components}
      isDisabled={isDisabled}
      isRtl={isRtl}
      isSearchable={isSearchable}
      options={options}
      value={value}
      className={ZClassNames(className, {
        'cursor-not-allowed opacity-70': isDisabled
      })}
      onFocus={onFocus}
      onBlur={onBlur}
      classNamePrefix='z-rs-btn'
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          boxShadow: state.isFocused ? 'none !important' : 'none !important'
        })
      }}
      onChange={(value, actionMeta: ActionMeta<ZRSelectOptions>) => {
        if (onChange !== undefined) {
          const _value = value as ZRSelectOptions & MultiValue<ZRSelectOptions>;
          onChange(_value, actionMeta);
        }
      }}
    />
  );
};

const DropdownIndicator = (
  props: DropdownIndicatorProps<
    ZRSelectOptions,
    boolean,
    GroupBase<ZRSelectOptions>
  >
): JSX.Element => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='22'
        height='22'
        viewBox='0 0 22 22'
        fill='none'
      >
        <path
          d='M4.81274 7.90222L11.0002 14.0897L17.1877 7.90222'
          stroke='#3A3653'
          strokeWidth='2.25'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </components.DropdownIndicator>
  );
};

const ZSelect: React.FC<ZSelectI> = ({
  className,
  isMulti,
  label = 'label',
  name,
  placeholder = '',
  isClearable,
  isDisabled,
  isRtl,
  isSearchable,
  isValid = true,
  errorNode,
  value,
  defaultValue,
  selectClassName,
  style,
  options,
  onBlur,
  onChange,
  onFocus
}) => {
  const [inputState, setInputState] = useState<{
    value?: PropsValue<ZRSelectOptions>;
    isFocus: boolean;
  }>({
    value,
    isFocus: false
  });

  return (
    <>
      <div
        className={ZClassNames(className, {
          'h-[3.5rem] relative z-input-group': true
        })}
        style={style}
      >
        <label
          className={ZClassNames({
            'absolute -translate-y-1/2 top-[58%] left-4 z-input-label text-[1rem] transition-all pointer-events-none font-medium font-roboto-regular':
              true,
            'text-tertiary': isValid,
            'text-danger': !isValid,
            'floating-label':
              inputState?.isFocus || (value !== undefined && value !== null)
          })}
        >
          {label}
        </label>
        <Select
          defaultValue={defaultValue}
          isMulti={isMulti}
          name={name}
          placeholder={placeholder}
          isClearable={isClearable}
          isDisabled={isDisabled}
          isRtl={isRtl}
          isSearchable={isSearchable}
          options={options}
          components={{ DropdownIndicator }}
          value={value}
          className={ZClassNames(selectClassName, {
            'z-react-select-container leading-[1.5rem] font-medium tracking-[0.15px] font-roboto-regular text-[1rem] h-full border-b text-tertiary':
              true,
            'border-ShadowedPlum': isValid,
            'border-danger': !isValid
          })}
          classNamePrefix='z-react-select'
          onFocus={(e) => {
            setInputState((oldValues) => ({
              ...oldValues,
              isFocus: true
            }));
            if (onFocus !== undefined) {
              onFocus(e);
            }
          }}
          onBlur={(e) => {
            setInputState((oldValues) => ({
              ...oldValues,
              isFocus: false
            }));
            if (onBlur !== undefined) {
              onBlur(e);
            }
          }}
          onChange={(value, actionMeta: ActionMeta<ZRSelectOptions>) => {
            const _value = value as ZRSelectOptions &
              MultiValue<ZRSelectOptions>;
            setInputState((oldValues) => ({
              ...oldValues,
              value
            }));

            if (onChange !== undefined) {
              onChange(_value, actionMeta);
            }
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused
                ? 'transparent !important'
                : 'transparent !important',
              boxShadow: state.isFocused ? 'none !important' : 'none !important'
            })
          }}
        />
      </div>
      {!isValid &&
      ((typeof errorNode === 'string' && isZNonEmptyString(errorNode)) ||
        (errorNode !== null && errorNode !== undefined)) ? (
        <span className='text-[0.75rem] ps-4 leading-[1rem] tracking-[0.4px] font-medium font-roboto-regular'>
          {errorNode}
        </span>
      ) : null}
    </>
  );
};
export default ZSelect;
