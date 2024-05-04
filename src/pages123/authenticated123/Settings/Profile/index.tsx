// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { AxiosError } from 'axios';
// import { useBlocker } from '@tanstack/react-router';
import { Formik } from 'formik';
import { useRecoilState } from 'recoil';
import { ZFormikForm, type zSetFieldErrorType } from '@/Packages/Formik';

// #endregion

// #region ---- Custom Imports ----
import ZButton from '@/components123/Elements/Button';
import ProfileForm from '@/components123/inpage123/ProfileForm';
import {
  Storage,
  isZNonEmptyString,
  reportCustomError,
  validateFields,
  zStringify
} from '@/utils/helpers123';
import constants from '@/utils/constants';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/helpers123/Notification';
import { messages } from '@/utils/messages123';

// #endregion

// #region ---- Types Imports ----
import { ZFill } from '@/utils/enums123/Elements.enum';
import { zValidationRuleE } from '@/utils/enums123/index.enum';
import { useZRQUpdateRequest } from '@/hook123/zreactquery.hooks';
import { ApiUrlEnum } from '@/utils/enums123/apis.enum';
import { extractInnerData } from '@/utils/helpers123/APIS';
import {
  extractInnerDataObjectEnum,
  extractInnerDataOptionsEnum
} from '@/types123/apis123/index.type';

// #endregion

// #region ---- Store Imports ----
import { ZUserRStateAtom } from '@/store123/auth123/user123/index.recoil.ts';
import { SpinSvg } from '@/assets';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

const Profile: React.FC = () => {
  // const [shouldBlock, setShouldBlock] = useState(true);

  // useBlocker(() => window.confirm("Are you sure you want to leave?"), true);

  // #region Recoil
  const [ZUserRState, setZUserRStateAtom] = useRecoilState(ZUserRStateAtom);
  // #endregion

  // #region Apis
  const {
    mutateAsync: profileDetailsAsyncMutate,
    isPending: isProfileDetailsPending
  } = useZRQUpdateRequest({
    _url: ApiUrlEnum.profileDetails
  });
  // #endregion

  // #region Functions
  const formikSubmitHandler = async (
    value: string,
    setFieldError: zSetFieldErrorType
  ): Promise<void> => {
    try {
      const _response = await profileDetailsAsyncMutate({
        requestData: value
      });

      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data !== undefined && _data !== null) {
          // store User token.
          void Storage.set(constants.localstorageKeys.userData, _data);

          // Storing user data in user Recoil State.
          setZUserRStateAtom((oldValues) => ({
            ...oldValues,
            ..._data
          }));

          showSuccessNotification(messages.user.profileDetailsUpdated);
        }
      }
    } catch (error) {
      reportCustomError(error);
      if (error instanceof AxiosError) {
        const _data = extractInnerData<{
          item: string[];
          company: string[];
          address: string[];
          zipcode: string[];
          city: string[];
          country: string[];
          company_registration_number: string[];
          vat_number: string[];
        }>(
          error?.response?.data,
          extractInnerDataOptionsEnum.createRequestResponseData,
          extractInnerDataObjectEnum.error
        );
        if (Array.isArray(_data?.item) && isZNonEmptyString(_data?.item[0])) {
          showErrorNotification(_data?.item[0]);
        }

        if (
          Array.isArray(_data?.company) &&
          isZNonEmptyString(_data?.company[0])
        ) {
          setFieldError('company', _data?.company[0]);
        }

        if (
          Array.isArray(_data?.address) &&
          isZNonEmptyString(_data?.address[0])
        ) {
          setFieldError('address', _data?.address[0]);
        }

        if (
          Array.isArray(_data?.zipcode) &&
          isZNonEmptyString(_data?.zipcode[0])
        ) {
          setFieldError('zipcode', _data?.zipcode[0]);
        }

        if (Array.isArray(_data?.city) && isZNonEmptyString(_data?.city[0])) {
          setFieldError('city', _data?.city[0]);
        }

        if (
          Array.isArray(_data?.country) &&
          isZNonEmptyString(_data?.country[0])
        ) {
          setFieldError('country', _data?.country[0]);
        }

        if (
          Array.isArray(_data?.vat_number) &&
          isZNonEmptyString(_data?.vat_number[0])
        ) {
          setFieldError('vat_number', _data?.vat_number[0]);
        }

        if (
          Array.isArray(_data?.company_registration_number) &&
          isZNonEmptyString(_data?.company_registration_number[0])
        ) {
          setFieldError(
            'company_registration_number',
            _data?.company_registration_number[0]
          );
        }
      }
    }
  };
  // #endregion

  const fromikInitialValue = useMemo(
    () => ({
      company: ZUserRState?.company ?? '',
      address: ZUserRState?.address ?? '',
      zipcode: ZUserRState?.zipcode ?? '',
      city: ZUserRState?.city ?? '',
      country: ZUserRState?.country ?? '',
      company_registration_number:
        ZUserRState?.company_registration_number ?? '',
      vat_number: ZUserRState?.vat_number ?? '',
      name: ZUserRState?.name ?? ''
    }),
    [ZUserRState]
  );

  return (
    <div>
      <h2 className='uppercase text-primary text-[1.5rem] md:text-[2.25rem] font-black font-mont-heavy'>
        Your Profile
      </h2>

      <Formik
        initialValues={fromikInitialValue}
        enableReinitialize
        validate={(values) => {
          const errors = {};

          validateFields(
            [
              'company',
              'address',
              'zipcode',
              'city',
              'country',
              'company_registration_number',
              'vat_number',
              'name'
            ],
            values,
            errors,
            [
              zValidationRuleE.string,
              zValidationRuleE.string,
              zValidationRuleE.string,
              zValidationRuleE.string,
              zValidationRuleE.string,
              zValidationRuleE.string,
              zValidationRuleE.string,
              zValidationRuleE.string
            ]
          );

          return errors;
        }}
        onSubmit={(values, { setFieldError }) => {
          const zStringifyData = zStringify({
            company: values.company,
            address: values.address,
            zipcode: values.zipcode,
            city: values.city,
            country: values.country,
            company_registration_number: values.company_registration_number,
            vat_number: values.vat_number
          });

          void formikSubmitHandler(zStringifyData, setFieldError);
        }}
      >
        {({ handleSubmit, isValid, dirty }) => {
          return (
            <ZFormikForm onSubmit={handleSubmit} className='maxSm:px-3'>
              <ProfileForm width='23.4375rem' />

              <div className='flex pt-3 mt-10 maxSm:flex-col-reverse maxSm:gap-y-2 sm:items-center sm:justify-between'>
                <ZButton fill={ZFill.clear} className='uppercase'>
                  Cancel
                </ZButton>
                <ZButton
                  type='submit'
                  className={ZClassNames({
                    'flex items-center justify-center uppercase maxMd:w-full md:w-max':
                      true,
                    'cursor-not-allowed':
                      !isValid || isProfileDetailsPending || !dirty
                  })}
                  disabled={!isValid || isProfileDetailsPending || !dirty}
                >
                  {isProfileDetailsPending ? (
                    <SpinSvg className='me-2 text-secondary' />
                  ) : (
                    ''
                  )}
                  Save
                </ZButton>
              </div>
            </ZFormikForm>
          );
        }}
      </Formik>
    </div>
  );
};

export default Profile;
