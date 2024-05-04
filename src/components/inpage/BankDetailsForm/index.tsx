// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZClassNames } from '@/Packages/ClassNames';
import { useZFormikContext } from '@/Packages/Formik';

// #endregion

// #region ---- Custom Imports ----
import ZTextarea from '@/components/Elements/Textarea';
import { isZNonEmptyString } from '@/utils/helpers123';

// #endregion

// #region ---- Types Imports ----
import { type ZAuthI } from '@/types/auth/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
interface BackDetailsFormI {
  inputMaxWidth?: string;
  width?: string;
  className?: string;
}
// #endregion

const BackDetailsForm: React.FC<BackDetailsFormI> = ({
  inputMaxWidth = '23.438rem',
  width = '100%',
  className
}) => {
  const { values, touched, errors, handleChange, handleBlur } =
    useZFormikContext<ZAuthI>();

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
      className={ZClassNames(className, {
        'maxSm:w-[100%!important] maxSm:max-w-[100%!important]': true
      })}
    >
      {/* bank details filed */}
      <ZTextarea
        label='Bank Details*'
        name='bank_details'
        value={values?.bank_details}
        errorNode={errors?.bank_details}
        touched={touched?.bank_details}
        infoText={
          <>
            We recommend adding all relevant information your clients need to
            pay your invoices (e.g. your account number and your bank’s
            address).
          </>
        }
        isValid={
          touched.bank_details !== undefined
            ? touched.bank_details && !isZNonEmptyString(errors?.bank_details)
            : true
        }
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
        rows={2}
      />
    </div>
  );
};

export default BackDetailsForm;
