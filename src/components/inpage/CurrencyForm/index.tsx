// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useZFormikContext } from '@/Packages/Formik';

// #endregion

// #region ---- Custom Imports ----
import ZSelect from '@/components/Elements/Select';
import ZUploadInput from '@/components/Elements/UploadInput';
import { isZNonEmptyString } from '@/utils/helpers123';

// #endregion

// #region ---- Types Imports ----
import { type ZAuthI } from '@/types/auth/index.type';

// #endregion

// #region ---- Store Imports ----
import { ZCurrenciesData } from '@/Data/Currencies.data';

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
interface CurrencyFormI {
  inputMaxWidth?: string;
  width?: string;
}

// #endregion

const CurrencyForm: React.FC<CurrencyFormI> = ({
  inputMaxWidth = '23.438rem',
  width = '100%'
}) => {
  const {
    values,
    touched,
    errors,
    isValidating,
    setFieldError,
    setFieldValue,
    setFieldTouched
  } = useZFormikContext<ZAuthI>();

  const containerStyle = useMemo(
    () => ({
      maxWidth: inputMaxWidth,
      width
    }),
    // eslint-disable-next-line
    []
  );

  return (
    <div
      style={containerStyle}
      className='maxSm:w-[100%!important] maxSm:max-w-[100%!important]'
    >
      {/* Currency filed */}
      <ZSelect
        label='Default currency*'
        name='default_currency'
        className='w-full'
        value={values?.default_currency}
        onBlur={(e) => {
          void setFieldTouched('default_currency', true);
        }}
        onChange={(e) => {
          void setFieldValue('default_currency', e, false);
        }}
        isMulti={false}
        isValid={
          touched.default_currency !== undefined
            ? touched.default_currency &&
              !isZNonEmptyString(errors?.default_currency)
            : true
        }
        errorNode={errors?.default_currency}
        options={ZCurrenciesData}
      />

      {/* Company filed */}
      <ZUploadInput
        label='Company logo'
        errorNode={errors?.logoUrl}
        value={values.logoUrl}
        infoText='We recommend using a PNG file of at least 150x150 pixels.'
        className='w-full mt-9'
        isValid={
          (touched.logoUrl !== undefined ||
            touched?.logoUrl === true ||
            isValidating ||
            !isZNonEmptyString(errors?.logoUrl)) ??
          true
        }
        onChange={(files) => {
          void (async () => {
            if (files !== undefined && files !== null) {
              await setFieldValue('logoFile', files[0], false);

              if (touched.logoUrl !== true) {
                await setFieldTouched('logoUrl', true);
              }

              //
              const url = URL.createObjectURL(files[0]);
              await setFieldValue('logoUrl', url, false);

              if (isZNonEmptyString(url)) {
                setFieldError('logoUrl', undefined);
              }
            }
          })();
        }}
      />
    </div>
  );
};

export default CurrencyForm;
