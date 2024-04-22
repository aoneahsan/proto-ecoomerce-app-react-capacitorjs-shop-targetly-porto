// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useMatchRoute } from '@tanstack/react-router';
import { useZFormikContext } from '@/Packages/Formik';

// #endregion

// #region ---- Custom Imports ----
import ZInput from '@/Components/Elements/Input';
import ZSelect from '@/Components/Elements/Select';
import { AppRoutes } from '@/Routes/AppRoutes';
import { isZNonEmptyString } from '@/utils/Helpers';

// #endregion

// #region ---- Types Imports ----
import { type ZAuthI } from '@/Types/Auth/index.type';

// #endregion

// #region ---- Store Imports ----
import { ZCountryData } from '@/Data/Countries.data';
import { ZCurrenciesData } from '@/Data/Currencies.data';
import ZTextarea from '@/Components/Elements/Textarea';

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
interface ProfileFormI {
  inputMaxWidth?: string;
  width?: string;
}

// #endregion

const ProfileForm: React.FC<ProfileFormI> = ({
  inputMaxWidth = '23.438rem',
  width = '100%'
}) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched
  } = useZFormikContext<ZAuthI>();

  const isAuthProfileDetailPage = useMatchRoute()({
    to: AppRoutes.authRoutes.profileSettingSub.profileDetails.completePath
  });

  const isClientCreatePage = useMatchRoute()({
    to: AppRoutes.authRoutes.clientSub.create.completePath
  });

  const isClientUpdatePage = useMatchRoute()({
    to: AppRoutes.authRoutes.clientSub.update.completePath
  });

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
      {/* Company filed */}
      <ZInput
        label='Company name*'
        name='company'
        value={values?.company}
        touched={touched?.company}
        isValid={
          touched.company !== undefined
            ? touched.company && !isZNonEmptyString(errors?.company)
            : true
        }
        errorNode={errors?.company}
        className='w-full'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      {/* Address filed */}
      <ZInput
        label='Address*'
        name='address'
        value={values?.address}
        touched={touched?.address}
        isValid={
          touched.address !== undefined
            ? touched.address && !isZNonEmptyString(errors?.address)
            : true
        }
        errorNode={errors?.address}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      {/* Name filed */}
      {isAuthProfileDetailPage !== false && (
        <ZInput
          label='Your Name*'
          name='name'
          value={values?.name}
          touched={touched?.name}
          isValid={
            touched.name !== undefined
              ? touched.name && !isZNonEmptyString(errors?.name)
              : true
          }
          errorNode={errors?.name}
          className='w-full mt-4'
          onChange={(e) => {
            handleChange(e);
          }}
          onBlur={(e) => {
            handleBlur(e);
          }}
        />
      )}

      {/* Zip code filed */}
      <ZInput
        label='Zip code*'
        name='zipcode'
        value={values?.zipcode}
        touched={touched?.zipcode}
        isValid={
          touched.zipcode !== undefined
            ? touched.zipcode && !isZNonEmptyString(errors?.zipcode)
            : true
        }
        errorNode={errors?.zipcode}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      {/* City filed */}
      <ZInput
        label='City*'
        name='city'
        value={values?.city}
        touched={touched?.city}
        isValid={
          touched.city !== undefined
            ? touched.city && !isZNonEmptyString(errors?.city)
            : true
        }
        errorNode={errors?.city}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      {/* Country filed */}
      <ZSelect
        label='Country*'
        name='country'
        isMulti={false}
        className='w-full mt-4'
        value={ZCountryData?.find((el) => el?.value === values?.country)}
        onBlur={(e) => {
          void setFieldTouched('country', true);
        }}
        onChange={(e) => {
          const _value = e?.value;
          void setFieldValue('country', _value, false);
        }}
        isValid={
          touched.country !== undefined
            ? touched.country && !isZNonEmptyString(errors?.country)
            : true
        }
        errorNode={errors?.country}
        options={ZCountryData}
      />

      {/* Contact full name */}
      {isClientCreatePage !== false || isClientUpdatePage !== false ? (
        <ZInput
          label='Contact full name*'
          name='name'
          value={values?.name}
          touched={touched?.name}
          isValid={
            touched.name !== undefined
              ? touched.name && !isZNonEmptyString(errors?.name)
              : true
          }
          errorNode={errors?.name}
          className='w-full mt-4'
          onChange={(e) => {
            handleChange(e);
          }}
          onBlur={(e) => {
            handleBlur(e);
          }}
        />
      ) : null}

      {/* Email address */}
      {isClientCreatePage !== false || isClientUpdatePage !== false ? (
        <ZInput
          label='Email address*'
          name='email'
          value={values?.email}
          touched={touched?.email}
          isValid={
            touched.email !== undefined
              ? touched.email && !isZNonEmptyString(errors?.email)
              : true
          }
          errorNode={errors?.email}
          className='w-full mt-4'
          onChange={(e) => {
            handleChange(e);
          }}
          onBlur={(e) => {
            handleBlur(e);
          }}
        />
      ) : null}

      {/* Currency filed */}
      {isClientCreatePage !== false || isClientUpdatePage !== false ? (
        <ZSelect
          label='Default currency*'
          name='default_currency'
          isMulti={false}
          className='w-full mt-4'
          value={values?.default_currency}
          onBlur={(e) => {
            void setFieldTouched('default_currency', true);
          }}
          onChange={(e) => {
            void setFieldValue('default_currency', e, false);
          }}
          isValid={
            touched.default_currency !== undefined
              ? touched.default_currency &&
                !isZNonEmptyString(errors?.default_currency)
              : true
          }
          errorNode={errors?.default_currency}
          options={ZCurrenciesData}
        />
      ) : null}

      {/* Company Registration Number filed */}
      <ZInput
        label='Country registration number*'
        name='company_registration_number'
        value={values?.company_registration_number}
        touched={touched?.company_registration_number}
        className='w-full mt-4'
        isValid={
          touched.company_registration_number !== undefined
            ? touched.company_registration_number &&
              !isZNonEmptyString(errors?.company_registration_number)
            : true
        }
        errorNode={errors?.company_registration_number}
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      {/* Vat Number filed */}
      <ZInput
        label='VAT number*'
        name='vat_number'
        value={values?.vat_number}
        touched={touched?.vat_number}
        className='w-full mt-4'
        isValid={
          touched.vat_number !== undefined
            ? touched.vat_number && !isZNonEmptyString(errors?.vat_number)
            : true
        }
        errorNode={errors?.vat_number}
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      {/* Note filed */}
      {isClientCreatePage !== false || isClientUpdatePage !== false ? (
        <ZTextarea
          label='Note'
          name='note'
          value={values?.note}
          touched={touched?.note}
          isValid={
            touched.note !== undefined
              ? touched.note && !isZNonEmptyString(errors?.note)
              : true
          }
          errorNode={errors?.note}
          className='w-full mt-4'
          onChange={(e) => {
            handleChange(e);
          }}
          onBlur={(e) => {
            handleBlur(e);
          }}
          rows={2}
        />
      ) : null}
    </div>
  );
};

export default ProfileForm;
