// #region ---- Core Imports ----
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from 'react';

// #endregion

// #region ---- Packages Imports ----
import dayjs from 'dayjs';
import {
  AuthError,
  confirmResetPassword,
  resendSignUpCode,
  resetPassword
} from 'aws-amplify/auth';
import { useSetRecoilState } from 'recoil';

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUInput,
  ZRUText
} from '@/components/RadixUI';
import { ZPage } from '@/components/Elements';
import ZPublicNavTopBar from '@/components/common124/Navigation/TopBar';
import {
  Storage,
  isZNonEmptyString,
  reportCustomError,
  validateField,
  validateFields
} from '@/utils/helpers123';
import {
  ZFormik,
  ZFormikForm,
  useZFormikContext,
  type ZFormikHelpers,
  type zSetFieldErrorType,
  type zSetFieldValueType
} from '@/Packages/Formik';
import { useZNavigate } from '@/hook/navigation.hook';
import { AppRoutes } from '@/Routes/AppRoutes';
import { zValidationRuleE } from '@/utils/enums/index.enum';
import constants from '@/utils/constants';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/helpers/Notification';
import { messages } from '@/utils/messages123';

// #endregion

// #region ---- Types Imports ----
import { type ZUserI } from '@/types/auth/index.type';
import {
  ZRUHeadingAsE,
  ZRUTextAsE,
  ZRUVariantE
} from '@/types/radixUI/index.type';
import {
  ZAwsResetPasswordStep,
  ZErrorException
} from '@/types/apis/AWS/index.type';

// #endregion

// #region ---- Store Imports ----
import { ZUserRStateAtom } from '@/store/auth/user/index.recoil.ts';
import { ZAuthTokenData } from '@/store/auth/index.recoil';

// #endregion

// #region ---- Types Imports ----
interface resetPasswordI {
  email?: string;
  verificationCode?: string;
  otpValidTill?: string;
  password?: string;
  confirmPassword?: string;
  canResendOtp?: boolean;

  isApiError?: boolean;
}
// #endregion

const ForgotPassword: React.FC = () => {
  const [compState, setCompState] = useState<{
    currentStep: ZAwsResetPasswordStep;
    email?: string;
    otpValidTill?: string;
    isProcessing: boolean;
    resendCodeEnableTime?: string;
    canResendCode?: boolean;
    isCanResendBtnProcessing: boolean;
  }>({
    currentStep: ZAwsResetPasswordStep.resetPassword,
    email: '',
    otpValidTill: '',
    isProcessing: false,
    canResendCode: false,
    isCanResendBtnProcessing: false
  });

  // #region custom hooks
  const navigate = useZNavigate();
  // #endregion

  // #region Recoil
  const setZUserRState = useSetRecoilState(ZUserRStateAtom);

  const setZAuthTokenRStateAtom = useSetRecoilState(ZAuthTokenData);
  // #endregion

  // #region Function
  const processing = useCallback(() => {
    setCompState((oldValues) => ({
      ...oldValues,
      isProcessing: true
    }));
  }, []);

  const finishedProcessing = useCallback(() => {
    setCompState((oldValues) => ({
      ...oldValues,
      isProcessing: false
    }));
  }, []);

  const sendOtpHandler = useCallback(async (values: ZUserI) => {
    try {
      processing();
      const _response = await resetPassword({
        username: values?.email ?? ''
      });

      if (
        _response !== undefined &&
        _response !== null &&
        typeof _response === 'object'
      ) {
        if (
          _response?.nextStep?.resetPasswordStep ===
          ZAwsResetPasswordStep.confirmResetPasswordWithCode
        ) {
          const _resendCodeEnableTime = dayjs()
            .add(constants.timeInterval.resendCodeTimeInterval, 'm')
            .toISOString();

          const _resetPasswordData = {
            email: values?.email,
            currentStep: ZAwsResetPasswordStep.confirmResetPasswordWithCode,
            expiateAt: dayjs().add(
              constants.timeInterval.resetTimeInterval,
              'm'
            ),
            resendCodeEnableTime: _resendCodeEnableTime
          };

          await Storage.set(
            constants.localstorageKeys.resetPassword,
            _resetPasswordData
          );

          setCompState((oldValues) => ({
            ...oldValues,
            email: values.email,
            currentStep: ZAwsResetPasswordStep.confirmResetPasswordWithCode,
            resendCodeEnableTime: _resendCodeEnableTime
          }));

          finishedProcessing();

          showSuccessNotification(
            messages.user.resetPassword.otpSendSuccessfully
          );
        }
      }

      if (compState?.isProcessing) {
        finishedProcessing();
      }
    } catch (error) {
      finishedProcessing();
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyOtpHandler = useCallback(
    async (values: ZUserI, setFieldError: zSetFieldErrorType) => {
      try {
        processing();

        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const _response = await confirmResetPassword({
          confirmationCode: String(values?.verificationCode) ?? '',
          newPassword: values?.password ?? '',
          username: values?.email ?? ''
        });

        if (_response === undefined) {
          await Storage.remove(constants.localstorageKeys.resetPassword);

          finishedProcessing();

          showSuccessNotification(messages.auth.resetPasswordSuccess);

          void navigate({
            to: AppRoutes.login
          });
        }

        if (compState?.isProcessing) {
          finishedProcessing();
        }
      } catch (error) {
        finishedProcessing();
        if (error instanceof AuthError) {
          if (
            error?.name === ZErrorException.CodeMismatchException ||
            error?.name === ZErrorException.ExpiredCodeException
          ) {
            setFieldError('verificationCode', error.message);
          }
          if (error?.name === ZErrorException.InvalidPasswordException) {
            setFieldError('password', error.message);
          }
        }

        reportCustomError(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const formikSubmitHandler = useCallback(
    async (
      values: resetPasswordI,
      formikHelpers: ZFormikHelpers<resetPasswordI>
    ): Promise<void> => {
      try {
        if (compState?.currentStep === ZAwsResetPasswordStep.resetPassword) {
          await sendOtpHandler(values);
        } else if (
          compState?.currentStep ===
          ZAwsResetPasswordStep.confirmResetPasswordWithCode
        ) {
          await verifyOtpHandler(values, formikHelpers.setFieldError);
        }
      } catch (error) {
        reportCustomError(error);
      }
    },
    [compState?.currentStep]
  );

  const resendSignUpCodeHandler = useCallback(async () => {
    try {
      setCompState((prevState) => ({
        ...prevState,
        isCanResendBtnProcessing: true
      }));

      const _response = await resendSignUpCode({
        username: compState?.email ?? ''
      });

      if (
        _response !== undefined &&
        _response !== null &&
        isZNonEmptyString(_response?.destination)
      ) {
        const _resendCodeEnableTime = dayjs()
          .add(constants.timeInterval.resendCodeTimeInterval, 'm')
          .toISOString();

        await Storage.set(constants.localstorageKeys.resetPassword, {
          email: compState?.email,
          currentStep: ZAwsResetPasswordStep.confirmResetPasswordWithCode,
          expiateAt: dayjs().add(constants.timeInterval.resetTimeInterval, 'm'),
          resendCodeEnableTime: _resendCodeEnableTime
        });

        setCompState((prevState) => ({
          ...prevState,
          currentStep: ZAwsResetPasswordStep.confirmResetPasswordWithCode,
          isProcessing: false,
          isCanResendBtnProcessing: false,
          resendCodeEnableTime: _resendCodeEnableTime,
          canResendCode: false
        }));

        showSuccessNotification(messages.formValidations.resendCodeSuccess);
      }

      if (compState?.isProcessing || compState?.isCanResendBtnProcessing) {
        setCompState((prevState) => ({
          ...prevState,
          isCanResendBtnProcessing: false,
          isProcessing: false
        }));
      }
    } catch (error) {
      setCompState((prevState) => ({
        ...prevState,
        isCanResendBtnProcessing: false,
        isProcessing: false
      }));

      if (error instanceof AuthError) {
        if (error?.name === ZErrorException.LimitExceededException) {
          showErrorNotification(
            messages.formValidations.resendCodeLimitExceeded
          );
        }
      }

      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compState?.email]);

  const loginBtnClickHandler = useCallback((): void => {
    try {
      void navigate({ to: AppRoutes.login });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const goBackBtnHandler = useCallback((setFieldValue: zSetFieldValueType) => {
    setCompState((oldValues) => ({
      ...oldValues,
      currentStep: ZAwsResetPasswordStep.resetPassword
    }));

    void setFieldValue('verificationCode', '');
    void setFieldValue('password', '');
    void setFieldValue('confirmPassword', '');

    const _resetPasswordData = {
      currentStep: ZAwsResetPasswordStep.resetPassword,
      resendCodeEnableTime: null,
      expiateAt: null,
      email: null
    };

    void Storage.set(
      constants.localstorageKeys.resetPassword,
      _resetPasswordData
    );
  }, []);

  const formikValidationHandler = useCallback((values: resetPasswordI) => {
    const errors: { confirmPassword?: string } = {};

    if (compState.currentStep === ZAwsResetPasswordStep.resetPassword) {
      validateField(
        'email',
        values as Record<string, unknown>,
        errors,
        zValidationRuleE.email
      );
    }

    if (
      compState.currentStep ===
      ZAwsResetPasswordStep.confirmResetPasswordWithCode
    ) {
      validateFields(
        ['verificationCode', 'password', 'confirmPassword'],
        values as Record<string, unknown>,
        errors,
        [
          zValidationRuleE.otp,
          zValidationRuleE.password,
          zValidationRuleE.confirm_password
        ]
      );

      // checking the confirm password is === password ? validated : setting an error + invalidate
      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = messages?.formValidations?.passwordNotMatch;
      } else {
        delete errors.confirmPassword;
      }
    }

    return errors;
  }, []);

  const getResetStateFromStorage = useCallback(async (): Promise<
    | {
        email?: string;
        resendCodeEnableTime?: string;
        currentStep: ZAwsResetPasswordStep;
        expiateAt?: string;
      }
    | undefined
  > => {
    return await Storage.get<{
      email?: string;
      resendCodeEnableTime?: string;
      currentStep: ZAwsResetPasswordStep;
      expiateAt?: string;
    }>(constants.localstorageKeys.resetPassword);
  }, []);
  // #endregion

  // #region Constants
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

  const pageHelmet = useMemo(
    () => ({
      title: `${constants.productInfo.name} - Forgot password page - Zaions`
    }),
    []
  );
  // #endregion

  // #region Effects
  useLayoutEffect(() => {
    void (async () => {
      // const user = await getCurrentUser();
      const _register = await getResetStateFromStorage();
      if (_register !== undefined && _register !== null) {
        let _resendCodeEnableTime = dayjs()?.toString();
        if (
          _register?.resendCodeEnableTime !== undefined &&
          isZNonEmptyString(_register?.resendCodeEnableTime) &&
          dayjs(_register?.resendCodeEnableTime)?.isValid()
        ) {
          _resendCodeEnableTime = _register?.resendCodeEnableTime;
        } else {
          _resendCodeEnableTime = dayjs()
            ?.add(constants.timeInterval.resendCodeTimeInterval, 'm')
            ?.toString();
        }

        if (dayjs().isAfter(dayjs(_register?.expiateAt))) {
          setCompState((prevState) => ({
            ...prevState,
            currentStep: ZAwsResetPasswordStep.resetPassword,
            email: '',
            resendCodeEnableTime: '',
            canResendCode: false
          }));
        } else {
          setCompState((prevState) => ({
            ...prevState,
            currentStep: _register?.currentStep,
            email: _register?.email,
            resendCodeEnableTime: _resendCodeEnableTime,
            canResendCode: false
          }));
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (
      compState?.currentStep ===
        ZAwsResetPasswordStep.confirmResetPasswordWithCode &&
      compState?.resendCodeEnableTime !== undefined &&
      isZNonEmptyString(compState?.resendCodeEnableTime)
    ) {
      const limit = dayjs(compState?.resendCodeEnableTime).diff(dayjs());
      setTimeout(() => {
        setCompState((preState) => ({
          ...preState,
          canResendCode: true
        }));
      }, limit);
    }
    // eslint-disable-next-line
  }, [compState?.resendCodeEnableTime, compState?.canResendCode]);
  // #endregion

  return (
    <ZPage
      className='relative flex-col w-full min-h-screen bg-light h max-h-max'
      helmet={pageHelmet}
    >
      {/* Navigation */}
      <ZPublicNavTopBar />

      <ZRUBox className='flex flex-col items-center w-full h-full max-w-full mt-6'>
        <ZRUBox className='pt-3 mt-10 w-full sm:w-[25.5625rem] text-start px-1 sm:ps-4'>
          <ZFormik
            initialValues={formikInitialValues}
            enableReinitialize
            validate={(values) => {
              return formikValidationHandler(values);
            }}
            onSubmit={(values, formikHelpers) => {
              void formikSubmitHandler(values, formikHelpers);
            }}
          >
            {({ isValid, values, handleSubmit, setFieldValue, submitForm }) => {
              return (
                <ZFormikForm onSubmit={handleSubmit}>
                  <ZRUHeading
                    as={ZRUHeadingAsE.h2}
                    className='text-tertiary text-start text-[2.25rem] font-semibold normal-case maxMd:text-center mb-4'
                  >
                    Forget password
                  </ZRUHeading>

                  <ZRUBox className='mt-6'>
                    {compState?.currentStep ===
                    ZAwsResetPasswordStep.resetPassword ? (
                      <SendOtpStep />
                    ) : compState?.currentStep ===
                      ZAwsResetPasswordStep.confirmResetPasswordWithCode ? (
                      <VerifyOtpStep />
                    ) : null}
                  </ZRUBox>

                  <ZRUBox className='mt-6'>
                    <ZRUButton
                      size='3'
                      type='button'
                      className='flex items-center justify-center w-full normal-case'
                      onClick={() => {
                        void submitForm();
                      }}
                      loading={
                        compState?.currentStep ===
                          ZAwsResetPasswordStep.resetPassword &&
                        compState?.isProcessing
                      }
                      disabled={
                        !isValid ||
                        Boolean(values?.isApiError) ||
                        (compState?.currentStep ===
                          ZAwsResetPasswordStep.resetPassword &&
                          compState?.isProcessing)
                      }
                    >
                      {compState?.currentStep ===
                      ZAwsResetPasswordStep.resetPassword
                        ? 'Send code'
                        : ZAwsResetPasswordStep.confirmResetPasswordWithCode
                          ? 'Verify code'
                          : ''}
                    </ZRUButton>

                    {/*  */}
                    {compState?.currentStep ===
                    ZAwsResetPasswordStep.resetPassword ? (
                      <ZRUBox className='mt-2 text-center'>
                        <ZRUText
                          as={ZRUTextAsE.span}
                          className='cursor-pointer text-primary hover:underline'
                          onClick={loginBtnClickHandler}
                        >
                          Login
                        </ZRUText>
                      </ZRUBox>
                    ) : null}
                  </ZRUBox>

                  {compState?.currentStep ===
                  ZAwsResetPasswordStep.confirmResetPasswordWithCode ? (
                    <>
                      <ZRUBox className='flex w-full gap-1 pt-6 mt-6 maxSm:flex-col'>
                        <ZRUButton
                          size='3'
                          type='button'
                          variant={ZRUVariantE.outline}
                          className='flex-1 me-2'
                          onClick={() => {
                            goBackBtnHandler(setFieldValue);
                          }}
                        >
                          Go Back
                        </ZRUButton>

                        {/*  */}
                        <ZRUButton
                          size='3'
                          type='button'
                          className='flex items-center justify-center flex-1'
                          onClick={() => {
                            if (compState?.canResendCode) {
                              void resendSignUpCodeHandler();
                            }
                          }}
                          loading={compState?.isCanResendBtnProcessing}
                          disabled={
                            compState?.isCanResendBtnProcessing ||
                            !compState?.canResendCode
                          }
                        >
                          Resend
                        </ZRUButton>
                      </ZRUBox>
                      <ZRUBox className='w-full mt-4 text-sm font-medium text-end text-primary font-roboto-regular'>
                        You can request for resend after 5 minutes
                      </ZRUBox>
                    </>
                  ) : null}
                </ZFormikForm>
              );
            }}
          </ZFormik>
        </ZRUBox>
      </ZRUBox>
    </ZPage>
  );
};

const SendOtpStep: React.FC = () => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useZFormikContext<resetPasswordI>();
  return (
    <ZRUInput
      size='3'
      required
      name='email'
      inputClassName='w-full'
      label='Email address'
      value={values?.email}
      errorNode={errors?.email}
      isValid={
        touched.email !== undefined
          ? touched.email && !isZNonEmptyString(errors?.email)
          : true
      }
      onChange={(e) => {
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

  return (
    <ZRUBox className='w-full'>
      <ZRUInput
        size='3'
        required
        name='verificationCode'
        className='mt-5'
        inputClassName='w-full'
        label='Verification code'
        value={values?.verificationCode}
        errorNode={errors?.verificationCode}
        isValid={
          touched.verificationCode !== undefined
            ? touched.verificationCode &&
              !isZNonEmptyString(errors?.verificationCode)
            : true
        }
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZRUInput
        size='3'
        required
        name='password'
        className='mt-5'
        label='Password'
        inputClassName='w-full'
        value={values?.password}
        errorNode={errors?.password}
        isValid={
          touched.password !== undefined
            ? touched.password && !isZNonEmptyString(errors?.password)
            : true
        }
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZRUInput
        size='3'
        required
        name='confirmPassword'
        className='mt-5'
        label='Confirm password'
        inputClassName='w-full'
        value={values?.confirmPassword}
        errorNode={errors?.confirmPassword}
        isValid={
          touched.confirmPassword !== undefined
            ? touched.confirmPassword &&
              !isZNonEmptyString(errors?.confirmPassword)
            : true
        }
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />
    </ZRUBox>
  );
};

const ResetPassword: React.FC = () => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useZFormikContext<resetPasswordI>();
  return (
    <>
      <ZRUInput
        size='3'
        required
        name='password'
        className='mt-5'
        label='Password'
        inputClassName='w-full'
        value={values?.password}
        errorNode={errors?.password}
        isValid={
          touched.password !== undefined
            ? touched.password && !isZNonEmptyString(errors?.password)
            : true
        }
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZRUInput
        size='3'
        required
        name='confirmPassword'
        className='mt-5'
        label='Confirm password'
        inputClassName='w-full'
        value={values?.confirmPassword}
        errorNode={errors?.confirmPassword}
        isValid={
          touched.confirmPassword !== undefined
            ? touched.confirmPassword &&
              !isZNonEmptyString(errors?.confirmPassword)
            : true
        }
        onChange={(e) => {
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
