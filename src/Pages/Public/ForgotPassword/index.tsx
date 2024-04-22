// #region ---- Core Imports ----
import React, { useEffect, useMemo, useState } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZClassNames } from '@/Packages/ClassNames';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import {
  ZFormik,
  ZFormikForm,
  useZFormikContext,
  type ZFormikHelpers,
  type zSetFieldErrorType,
  type zSetFieldValueType
} from '@/Packages/Formik';

// #endregion

// #region ---- Custom Imports ----
import Copyright from '@/Components/Inpage/Copyright';
import ZInput from '@/Components/Elements/Input';
import ZButton from '@/Components/Elements/Button';
import { useZRQUpdateRequest } from '@/ZHooks/zreactquery.hooks';
import { useZNavigate } from '@/ZHooks/Navigation.hook';
import { AppRoutes } from '@/Routes/AppRoutes';
import {
  Storage,
  isZNonEmptyString,
  reportCustomError,
  validateField,
  validateFields,
  zStringify
} from '@/utils/Helpers';
import { zValidationRuleE } from '@/utils/Enums/index.enum';
import { extractInnerData } from '@/utils/Helpers/APIS';
import { constants } from '@/utils/Constants';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/Helpers/Notification';
import { messages } from '@/utils/Messages';

// #endregion

// #region ---- Types Imports ----
import { ZFill } from '@/utils/Enums/Elements.enum';
import { ApiUrlEnum } from '@/utils/Enums/apis.enum';
import { type ZAuthI } from '@/Types/Auth/index.type';
import {
  extractInnerDataObjectEnum,
  extractInnerDataOptionsEnum
} from '@/Types/APIs/index.type';
import { ZInvoiceTypeE } from '@/Types/Auth/Invoice';

// #endregion

// #region ---- Store Imports ----
import { ZUserRStateAtom } from '@/Store/Auth/User';
import { ZAuthTokenData } from '@/Store/Auth/index.recoil';

// #endregion

// #region ---- Images Imports ----
import { SpinSvg, productLogo, productVector } from '@/assets';
import dayjs from 'dayjs';

// #endregion

// #region ---- Types Imports ----
enum currentStepE {
  sentOtp = 'sentOtp',
  verifyOtp = 'verifyOtp',
  resetPassword = 'resetPassword'
}

interface resetPasswordI {
  email?: string;
  otp?: string;
  otpValidTill?: string;
  password?: string;
  confirmPassword?: string;
  canResendOtp?: boolean;

  isApiError?: boolean;
}
// #endregion

const ForgotPassword: React.FC = () => {
  const [compState, setCompState] = useState<{
    currentStep: currentStepE;
    email?: string;
    otpValidTill?: string;
  }>({
    currentStep: currentStepE.sentOtp,
    email: '',
    otpValidTill: ''
  });

  // #region custom hooks
  const navigate = useZNavigate();
  // #endregion

  // #region APIs
  const {
    mutateAsync: forgotPasswordMutateAsync,
    isPending: isForgotPasswordPending
  } = useZRQUpdateRequest({
    _url: ApiUrlEnum.forgotPasswordOtp,
    _authenticated: false
  });

  const { mutateAsync: verifyOtpMutateAsync, isPending: isVerifyOtpPending } =
    useZRQUpdateRequest({
      _url: ApiUrlEnum.verifyOtp,
      _authenticated: false
    });

  const {
    mutateAsync: resetPasswordMutateAsync,
    isPending: isResetPasswordPending
  } = useZRQUpdateRequest({
    _url: ApiUrlEnum.resetPassword,
    _authenticated: false
  });
  // #endregion

  // #region Recoil
  const setZUserRStateAtom = useSetRecoilState(ZUserRStateAtom);

  const setZAuthTokenRStateAtom = useSetRecoilState(ZAuthTokenData);
  // #endregion

  // #region Function
  const signInBtnClickHandler = (): void => {
    try {
      void navigate({ to: AppRoutes.login });
    } catch (error) {
      reportCustomError(error);
    }
  };

  const sendOtpHandler = async (
    value: string,
    setFieldError: zSetFieldErrorType,
    setFieldValue: zSetFieldValueType
  ): Promise<void> => {
    try {
      const _response = await forgotPasswordMutateAsync({
        requestData: value
      });

      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData<{
          success: boolean;
          email: string;
          otp_code_valid_till: string;
        }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

        if (_data?.success) {
          const _resetPasswordData = {
            email: _data?.email,
            currentStep: currentStepE.verifyOtp,
            otpValidTill: _data?.otp_code_valid_till
          };

          await Storage.set(
            constants.localstorageKeys.resetPassword,
            _resetPasswordData
          );

          setCompState((oldValues) => ({
            ...oldValues,
            currentStep: currentStepE.verifyOtp
          }));

          await setFieldValue(
            'otpValidTill',
            _data?.otp_code_valid_till,
            false
          );

          showSuccessNotification(
            messages.user.resetPassword.otpSendSuccessfully
          );
        }
      }
    } catch (error) {
      reportCustomError(error);

      if (error instanceof AxiosError) {
        const _data = extractInnerData<{
          item: string[];
          email: string[];
        }>(
          error?.response?.data,
          extractInnerDataOptionsEnum.createRequestResponseData,
          extractInnerDataObjectEnum.error
        );
        void setFieldValue('isApiError', true, false);

        if (Array.isArray(_data?.item) && isZNonEmptyString(_data?.item[0])) {
          setFieldError('email', _data?.item[0]);
        }

        if (Array.isArray(_data?.email) && isZNonEmptyString(_data?.email[0])) {
          setFieldError('email', _data?.email[0]);
        }
      }
    }
  };

  const verifyOtpHandler = async (
    value: string,
    setFieldError: zSetFieldErrorType,
    setFieldValue: zSetFieldValueType
  ): Promise<void> => {
    try {
      const _response = await verifyOtpMutateAsync({
        requestData: value
      });

      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData<{
          success: boolean;
          email?: string;
        }>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

        if (_data?.success) {
          const _resetPasswordData = {
            email: _data?.email,
            currentStep: currentStepE.resetPassword,
            otpValidTill: null
          };

          await Storage.set(
            constants.localstorageKeys.resetPassword,
            _resetPasswordData
          );

          setCompState((oldValues) => ({
            ...oldValues,
            currentStep: currentStepE.resetPassword
          }));

          await setFieldValue('otpValidTill', '', false);

          showSuccessNotification(
            messages.user.resetPassword.otpVerifiedSuccessfully
          );
        }
      }
    } catch (error) {
      reportCustomError(error);

      if (error instanceof AxiosError) {
        const _data = extractInnerData<{
          item: string[];
          otp_code: string[];
        }>(
          error?.response?.data,
          extractInnerDataOptionsEnum.createRequestResponseData,
          extractInnerDataObjectEnum.error
        );
        void setFieldValue('isApiError', true, false);
        if (Array.isArray(_data?.item) && isZNonEmptyString(_data?.item[0])) {
          setFieldError('otp', _data?.item[0]);
        }

        if (
          Array.isArray(_data?.otp_code) &&
          isZNonEmptyString(_data?.otp_code[0])
        ) {
          setFieldError('otp', _data?.otp_code[0]);
        }
      }
    }
  };

  const resetPasswordHandler = async (
    value: string,
    setFieldError: zSetFieldErrorType,
    setFieldValue: zSetFieldValueType
  ): Promise<void> => {
    try {
      const _response = await resetPasswordMutateAsync({
        requestData: value
      });

      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData<{
          success: boolean;
          user: ZAuthI;
          token: string;
        }>(_response, extractInnerDataOptionsEnum.createRequestResponseData);

        if (_data?.success) {
          await Storage.remove(constants.localstorageKeys.resetPassword);

          // store User data.
          void Storage.set(constants.localstorageKeys.userData, _data?.user);

          // store auth token.
          void Storage.set(constants.localstorageKeys.authToken, _data?.token);

          // Storing user data in user Recoil State.
          setZUserRStateAtom((oldValues) => ({
            ...oldValues,
            ..._data?.user
          }));

          // Storing token data in token Recoil State.
          setZAuthTokenRStateAtom((oldValues) => ({
            ...oldValues,
            token: _data?.token
          }));

          showSuccessNotification(messages.auth.resetPasswordSuccess);

          void navigate({
            to: AppRoutes.authRoutes.invoices,
            params: {
              invoiceType: ZInvoiceTypeE.inv
            }
          });
        }
      }
    } catch (error) {
      reportCustomError(error);

      if (error instanceof AxiosError) {
        const _data = extractInnerData<{
          item: string[];
          confirm_password: string[];
          password: string[];
        }>(
          error?.response?.data,
          extractInnerDataOptionsEnum.createRequestResponseData,
          extractInnerDataObjectEnum.error
        );
        void setFieldValue('isApiError', true, false);
        if (Array.isArray(_data?.item) && isZNonEmptyString(_data?.item[0])) {
          showErrorNotification(_data?.item[0]);
        }

        if (
          Array.isArray(_data?.password) &&
          isZNonEmptyString(_data?.password[0])
        ) {
          setFieldError('password', _data?.password[0]);
        }

        if (
          Array.isArray(_data?.confirm_password) &&
          isZNonEmptyString(_data?.confirm_password[0])
        ) {
          setFieldError('confirmPassword', _data?.confirm_password[0]);
        }
      }
    }
  };

  const formikSubmitHandler = async (
    values: resetPasswordI,
    formikHelpers: ZFormikHelpers<resetPasswordI>
  ): Promise<void> => {
    try {
      if (compState?.currentStep === currentStepE.sentOtp) {
        await sendOtpHandler(
          zStringify({
            email: values?.email
          }),
          formikHelpers.setFieldError,
          formikHelpers.setFieldValue
        );
      } else if (compState?.currentStep === currentStepE.verifyOtp) {
        await verifyOtpHandler(
          zStringify({
            email: values?.email,
            otp_code: String(values?.otp),
            otp_code_valid_till: values?.otpValidTill
          }),
          formikHelpers.setFieldError,
          formikHelpers.setFieldValue
        );
      } else if (compState?.currentStep === currentStepE.resetPassword) {
        await resetPasswordHandler(
          zStringify({
            email: values?.email,
            password: values?.password,
            password_confirmation: values?.confirmPassword
          }),
          formikHelpers.setFieldError,
          formikHelpers.setFieldValue
        );
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  const getResetStateFromStorage = async (): Promise<
    | {
        email?: string | undefined;
        otpValidTill?: string | undefined;
        currentStep: currentStepE;
      }
    | undefined
  > => {
    return await Storage.get<{
      email?: string;
      otpValidTill?: string;
      currentStep: currentStepE;
    }>(constants.localstorageKeys.resetPassword);
  };
  // #endregion

  const formikInitialValues: resetPasswordI = useMemo(
    () => ({
      email: compState?.email ?? '',
      otp: '',
      otpValidTill: compState?.otpValidTill ?? '',
      password: '',
      confirmPassword: '',
      canResendOtp: false,
      isApiError: false
    }),
    [compState]
  );

  useEffect(() => {
    const _setData = async (): Promise<void> => {
      const _data = await getResetStateFromStorage();

      if (_data !== undefined && _data !== null) {
        let _otpValidTill = dayjs()?.toString();
        if (
          _data?.otpValidTill !== undefined &&
          isZNonEmptyString(_data?.otpValidTill) &&
          dayjs(_data?.otpValidTill)?.isValid()
        ) {
          _otpValidTill = _data?.otpValidTill;
        } else {
          _otpValidTill = dayjs()?.add(constants.otpTimeLimit, 'm')?.toString();
        }

        setCompState((oldValues) => ({
          ...oldValues,
          currentStep: _data?.currentStep,
          email: _data?.email,
          otpValidTill: _otpValidTill
        }));
      }
    };

    void _setData();
  }, []);
  return (
    <div className='relative flex flex-col items-center justify-between w-full min-h-screen pt-10 bg-secondary h max-h-max pe-8'>
      <div className='flex flex-col items-center w-[25.5625rem] max-w-full h-full mt-6'>
        <img
          className='w-[4.8rem] cursor-pointer h-[4.8rem] maxSm:mx-auto relative'
          alt='Logo'
          src={productLogo}
          onClick={() => {
            void navigate({ to: AppRoutes.home });
          }}
        />

        <div className='w-full pt-3 mt-10 text-start ps-4'>
          <ZFormik
            initialValues={formikInitialValues}
            enableReinitialize
            validate={(values) => {
              const errors: { confirmPassword?: string } = {};

              if (compState.currentStep === currentStepE.sentOtp) {
                validateField(
                  'email',
                  values as Record<string, unknown>,
                  errors,
                  zValidationRuleE.email
                );
              }

              if (compState.currentStep === currentStepE.verifyOtp) {
                validateField(
                  'otp',
                  values as Record<string, unknown>,
                  errors,
                  zValidationRuleE.otp
                );
              }

              if (compState.currentStep === currentStepE.resetPassword) {
                validateFields(
                  ['password', 'confirmPassword'],
                  values as Record<string, unknown>,
                  errors,
                  [zValidationRuleE.password, zValidationRuleE.confirm_password]
                );

                // checking the confirm password is === password ? validated : setting an error + invalidate
                if (values.confirmPassword !== values.password) {
                  errors.confirmPassword =
                    messages?.formValidations?.passwordNotMatch;
                } else {
                  delete errors.confirmPassword;
                }
              }

              return errors;
            }}
            onSubmit={(values, formikHelpers) => {
              void formikSubmitHandler(values, formikHelpers);
            }}
          >
            {({
              handleSubmit,
              isValid,
              values,
              setFieldError,
              setFieldValue,
              submitForm
            }) => {
              return (
                <ZFormikForm onSubmit={handleSubmit}>
                  <h2
                    className={ZClassNames({
                      'text-primary text-start text-[2.25rem] font-black uppercase font-mont-heavy maxMd:text-center mb-9':
                        true
                    })}
                  >
                    Forget password
                  </h2>

                  <div className='mt-6'>
                    {compState?.currentStep === currentStepE.sentOtp ? (
                      <SendOtpStep />
                    ) : compState?.currentStep === currentStepE.verifyOtp ? (
                      <VerifyOtpStep />
                    ) : compState?.currentStep ===
                      currentStepE.resetPassword ? (
                      <ResetPassword />
                    ) : null}
                  </div>

                  <div className='flex gap-1 pt-6 mt-6 maxSm:flex-col'>
                    <ZButton
                      type='button'
                      onClick={() => {
                        void submitForm();
                      }}
                      className={ZClassNames({
                        'flex items-center justify-center uppercase': true,
                        'cursor-not-allowed':
                          (compState?.currentStep === currentStepE.sentOtp &&
                            isForgotPasswordPending) ||
                          isVerifyOtpPending ||
                          isResetPasswordPending
                      })}
                      disabled={
                        !isValid ||
                        Boolean(values?.isApiError) ||
                        (compState?.currentStep === currentStepE.sentOtp &&
                          isForgotPasswordPending) ||
                        isVerifyOtpPending ||
                        isResetPasswordPending
                      }
                    >
                      {(compState?.currentStep === currentStepE.sentOtp &&
                        isForgotPasswordPending) ||
                      isVerifyOtpPending ||
                      isResetPasswordPending ? (
                        <SpinSvg className='me-2 text-secondary' />
                      ) : (
                        ''
                      )}
                      {compState?.currentStep === currentStepE.sentOtp
                        ? 'Send OTP'
                        : compState?.currentStep === currentStepE.verifyOtp
                          ? 'Verify OTP'
                          : compState?.currentStep ===
                              currentStepE.resetPassword
                            ? 'New Password'
                            : ''}
                    </ZButton>

                    {/*  */}
                    {compState?.currentStep === currentStepE.sentOtp ? (
                      <ZButton
                        fill={ZFill.clear}
                        type='button'
                        onClick={signInBtnClickHandler}
                      >
                        <span className='me-2 pe-1 text-tertiary'>OR</span>
                        <span>SIGN IN</span>
                      </ZButton>
                    ) : null}
                  </div>

                  {compState?.currentStep === currentStepE.verifyOtp ? (
                    <>
                      <div className='flex w-full gap-1 pt-6 mt-6 maxSm:flex-col'>
                        <ZButton
                          fill={ZFill.outline}
                          type='button'
                          className='w-1/2 me-2'
                          onClick={() => {
                            setCompState((oldValues) => ({
                              ...oldValues,
                              currentStep:
                                oldValues?.currentStep ===
                                currentStepE.verifyOtp
                                  ? currentStepE.sentOtp
                                  : currentStepE.verifyOtp
                            }));

                            const _resetPasswordData = {
                              currentStep: currentStepE.sentOtp,
                              otpValidTill: null,
                              email: null
                            };

                            void Storage.set(
                              constants.localstorageKeys.resetPassword,
                              _resetPasswordData
                            );
                          }}
                        >
                          Go Back
                        </ZButton>

                        {/*  */}
                        <ZButton
                          onClick={() => {
                            void sendOtpHandler(
                              zStringify({
                                email: values?.email
                              }),
                              setFieldError,
                              setFieldValue
                            );

                            void setFieldValue('canResendOtp', false, false);
                          }}
                          fill={ZFill.outline}
                          className={ZClassNames({
                            'flex items-center w-1/2 justify-center uppercase':
                              true,
                            'cursor-not-allowed':
                              isForgotPasswordPending || !values?.canResendOtp
                          })}
                          disabled={
                            isForgotPasswordPending || !values?.canResendOtp
                          }
                        >
                          {isForgotPasswordPending ? (
                            <SpinSvg className='me-2 text-primary' />
                          ) : (
                            ''
                          )}
                          resend
                        </ZButton>
                      </div>
                      <div className='w-full mt-4 text-sm font-medium text-end text-primary font-roboto-regular'>
                        You can request for resend after 5 minutes
                      </div>
                    </>
                  ) : null}
                </ZFormikForm>
              );
            }}
          </ZFormik>
        </div>
      </div>

      <img
        src={productVector}
        alt='product vector'
        className='maxMd:hidden absolute bottom-0 left-0 maxMd:w-[16rem] maxLg:w-[17rem] w-[19.5rem]'
      />
      <div className='flex items-end w-full text-center'>
        <Copyright className='pb-[1.2rem] pt-[2.5rem] w-full' />
      </div>
    </div>
  );
};

const SendOtpStep: React.FC = () => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useZFormikContext<resetPasswordI>();
  return (
    <ZInput
      label='Email*'
      name='email'
      value={values?.email}
      touched={touched?.email}
      className='w-full max-w-[23.438rem]'
      isValid={
        touched.email !== undefined
          ? touched.email && !isZNonEmptyString(errors?.email)
          : true
      }
      errorNode={errors?.email}
      onChange={(e) => {
        if (values?.isApiError) {
          void setFieldValue('isApiError', false, false);
        }
        handleChange(e);
      }}
      onBlur={(e) => {
        handleBlur(e);
      }}
    />
  );
};

const VerifyOtpStep: React.FC = () => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useZFormikContext<resetPasswordI>();

  useEffect(() => {
    if (
      values?.otpValidTill !== undefined &&
      isZNonEmptyString(values?.otpValidTill)
    ) {
      const limit = dayjs(values?.otpValidTill).diff(dayjs());
      setTimeout(() => {
        void setFieldValue('canResendOtp', true, false);
      }, limit);
    }
    // eslint-disable-next-line
  }, [values?.otpValidTill]);

  return (
    <div className='w-full'>
      <ZInput
        label='OTP*'
        name='otp'
        value={values?.otp}
        type='number'
        touched={touched?.otp}
        className='w-full max-w-[23.438rem]'
        isValid={
          touched.otp !== undefined
            ? touched.otp && !isZNonEmptyString(errors?.otp)
            : true
        }
        errorNode={errors?.otp}
        onChange={(e) => {
          if (values?.isApiError) {
            void setFieldValue('isApiError', false, false);
          }
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />
    </div>
  );
};

const ResetPassword: React.FC = () => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useZFormikContext<resetPasswordI>();
  return (
    <>
      <ZInput
        name='password'
        label='Password*'
        type='password'
        className='w-full max-w-[23.438rem] mt-4'
        value={values?.password}
        touched={touched?.password}
        isValid={
          touched.password !== undefined
            ? touched.password && !isZNonEmptyString(errors?.password)
            : true
        }
        errorNode={errors?.password}
        onChange={(e) => {
          if (values?.isApiError) {
            void setFieldValue('isApiError', false, false);
          }
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        name='confirmPassword'
        label='Confirm Password*'
        type='password'
        className='w-full max-w-[23.438rem] mt-4'
        value={values?.confirmPassword}
        touched={touched?.confirmPassword}
        isValid={
          touched.confirmPassword !== undefined
            ? touched.confirmPassword &&
              !isZNonEmptyString(errors?.confirmPassword)
            : true
        }
        errorNode={errors?.confirmPassword}
        onChange={(e) => {
          if (values?.isApiError) {
            void setFieldValue('isApiError', false, false);
          }
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />
    </>
  );
};

export default ForgotPassword;
