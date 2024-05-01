// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Formik } from 'formik';
import { ZFormikForm, type zSetFieldErrorType } from '@/Packages/Formik';
import { AxiosError } from 'axios';
import { SpinSvg } from '@/assets';
import { ZClassNames } from '@/Packages/ClassNames';
import { useRecoilState } from 'recoil';

// #endregion

// #region ---- Custom Imports ----
import ZButton from '@/Components/Elements/Button';
import ZInput from '@/Components/Elements/Input';
import {
  Storage,
  isZNonEmptyString,
  reportCustomError,
  validateFields,
  zStringify
} from '@/utils/Helpers';
import constants from '@/utils/constants12';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/Helpers/Notification';
import { messages } from '@/utils/Messages';

// #endregion

// #region ---- Types Imports ----
import { ZFill } from '@/utils/Enums/Elements.enum';
import { zValidationRuleE } from '@/utils/Enums/index.enum';
import { ZUserRStateAtom } from '@/Store/Auth/User';
import { useZRQUpdateRequest } from '@/ZHooks/zreactquery.hooks';
import { ApiUrlEnum } from '@/utils/Enums/apis.enum';
import { extractInnerData } from '@/utils/Helpers/APIS';
import {
  extractInnerDataObjectEnum,
  extractInnerDataOptionsEnum
} from '@/Types/APIs/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

const Credentials: React.FC = () => {
  // #region Recoil
  const [ZUserRState, setZUserRStateAtom] = useRecoilState(ZUserRStateAtom);
  // #endregion

  // #region Api
  const {
    mutateAsync: changeCredentialsAsyncMutate,
    isPending: isChangeCredentialsPending
  } = useZRQUpdateRequest({
    _url: ApiUrlEnum.changeCredentials
  });
  // #endregion

  // #region Function
  const formikSubmitHandler = async (
    value: string,
    setFieldError: zSetFieldErrorType
  ): Promise<void> => {
    try {
      const _response = await changeCredentialsAsyncMutate({
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

          showSuccessNotification(messages.user.changeCredentialsUpdated);
        }
      }
    } catch (error) {
      reportCustomError(error);
      if (error instanceof AxiosError) {
        const _data = extractInnerData<{
          item: string[];
          email: string[];
          password: string[];
        }>(
          error?.response?.data,
          extractInnerDataOptionsEnum.createRequestResponseData,
          extractInnerDataObjectEnum.error
        );
        if (Array.isArray(_data?.item) && isZNonEmptyString(_data?.item[0])) {
          showErrorNotification(_data?.item[0]);
        }

        if (Array.isArray(_data?.email) && isZNonEmptyString(_data?.email[0])) {
          setFieldError('email', _data?.email[0]);
        }

        if (
          Array.isArray(_data?.password) &&
          isZNonEmptyString(_data?.password[0])
        ) {
          setFieldError('password', _data?.password[0]);
        }
      }
    }
  };
  // #endregion

  const fromikInitialValue = useMemo(
    () => ({
      email: ZUserRState?.email ?? '',
      password: ''
    }),
    [ZUserRState]
  );
  return (
    <>
      <h2 className='uppercase text-primary text-[1.5rem] md:text-[2.25rem] font-black font-mont-heavy'>
        Credentials
      </h2>

      <Formik
        initialValues={fromikInitialValue}
        enableReinitialize
        validate={(values) => {
          const errors = {};

          validateFields(['email', 'password'], values, errors, [
            zValidationRuleE.email,
            zValidationRuleE.password
          ]);

          return errors;
        }}
        onSubmit={(values, { setFieldError }) => {
          const zStringifyData = zStringify({
            email: values.email,
            password: values.password
          });

          void formikSubmitHandler(zStringifyData, setFieldError);
        }}
      >
        {({
          values,
          touched,
          errors,
          isValid,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit
        }) => {
          return (
            <ZFormikForm
              className='flex flex-col mt-1 maxSm:px-3 maxMd:items-center'
              onSubmit={handleSubmit}
            >
              <ZInput
                value={values?.email}
                name='email'
                label='Email'
                touched={touched?.email}
                isValid={touched?.email && !isZNonEmptyString(errors?.email)}
                errorNode={errors?.email}
                onChange={(e) => {
                  handleChange(e);
                }}
                onBlur={(e) => {
                  handleBlur(e);
                }}
                className='maxSm:w-[100%!important] sm:w-[23.4375rem] max-w-full'
              />

              {/* Password filed */}
              <ZInput
                name='password'
                label='Password'
                type='password'
                className='w-full maxSm:w-[100%!important] sm:w-[23.4375rem] max-w-full mt-4'
                value={values?.password}
                touched={touched?.password}
                isValid={
                  touched?.password && !isZNonEmptyString(errors?.password)
                }
                errorNode={errors?.password}
                onChange={(e) => {
                  handleChange(e);
                }}
                onBlur={(e) => {
                  handleBlur(e);
                }}
              />

              <div className='flex w-full pt-3 mt-10 maxSm:flex-col-reverse maxSm:gap-y-2 sm:items-center sm:justify-between'>
                <ZButton fill={ZFill.clear} className='uppercase'>
                  Cancel
                </ZButton>
                <ZButton
                  type='submit'
                  className={ZClassNames({
                    'flex items-center justify-center uppercase maxMd:w-full md:w-max':
                      true,
                    'cursor-not-allowed':
                      !isValid || !dirty || isChangeCredentialsPending
                  })}
                  disabled={!isValid || !dirty || isChangeCredentialsPending}
                >
                  {isChangeCredentialsPending ? (
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
    </>
  );
};

export default Credentials;
