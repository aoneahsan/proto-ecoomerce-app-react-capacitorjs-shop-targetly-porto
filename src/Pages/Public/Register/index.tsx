// #region ---- Core Imports ----
import React, {
  useCallback,
  useMemo,
  useState,
  useLayoutEffect,
  useEffect
} from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import {
  confirmSignUp,
  signUp,
  autoSignIn,
  resendSignUpCode,
  AuthError,
  getCurrentUser,
  fetchUserAttributes,
  fetchAuthSession
} from 'aws-amplify/auth';

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUInput,
  ZRUText
} from '@/Components/RadixUI';
import ZPublicNavTopBar from '@/Components/Public/Navigation/TopBar';
import { ZPage } from '@/Components/Elements';
import {
  ZFormik,
  ZFormikForm,
  type zSetFieldErrorType,
  type zSetFieldValueType
} from '@/Packages/Formik';
import { ZClassNames } from '@/Packages/ClassNames';
import {
  Storage,
  isZNonEmptyString,
  reportCustomError,
  validateFields
} from '@/utils/Helpers';
import { useZNavigate } from '@/ZHooks/Navigation.hook';
import constants from '@/utils/Constants';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/Helpers/Notification';
import { messages } from '@/utils/Messages';
import { AppRoutes } from '@/Routes/AppRoutes';

// #endregion

// #region ---- Types Imports ----
import { ZUserI, type ZAuthI } from '@/Types/Auth/index.type';
import { zValidationRuleE } from '@/utils/Enums/index.enum';
import {
  ZRUHeadingAsE,
  ZRUTextAsE,
  ZRUVariantE
} from '@/Types/radixUI/index.type';
import { ZAwsSignUpStep, ZErrorException } from '@/Types/APIs/AWS/index.type';

// #endregion

// #region ---- Store Imports ----
import { ZUserRStateAtom } from '@/Store/Auth/User';
import { ZAuthTokenData } from '@/Store/Auth/index.recoil';

// #endregion

const Register: React.FC = () => {
  const [compState, setCompState] = useState<{
    isProcessing: boolean;
    currentStep: ZAwsSignUpStep | string;
    email?: string;
    username?: string;
    resendCodeEnableTime?: string;
    canResendCode?: boolean;
  }>({
    isProcessing: false,
    currentStep: ZAwsSignUpStep.signUp,
    canResendCode: false
  });

  // #region custom hooks
  const navigate = useZNavigate();
  // #endregion

  // #region Recoil
  const setZUserRState = useSetRecoilState(ZUserRStateAtom);

  const setZAuthTokenRStateAtom = useSetRecoilState(ZAuthTokenData);
  // #endregion

  // #region Functions
  const processing = useCallback(() => {
    setCompState((prevState) => ({
      ...prevState,
      isProcessing: true
    }));
  }, []);

  const finishedProcessing = useCallback(() => {
    setCompState((prevState) => ({
      ...prevState,
      isProcessing: false
    }));
  }, []);

  const formikRegisterSubmitHandler = useCallback(
    async (
      values: ZUserI,
      setFieldError: zSetFieldErrorType
    ): Promise<void> => {
      try {
        processing();

        const _response = await signUp({
          username: values.username ?? '',
          password: values.password ?? '',
          options: {
            userAttributes: {
              email: values.email
            },
            autoSignIn: true,
            clientMetadata: {}
          }
        });

        if (
          _response !== undefined &&
          _response !== null &&
          typeof _response === 'object'
        ) {
          if (
            _response?.nextStep?.signUpStep === ZAwsSignUpStep.confirmSignUp
          ) {
            await Storage.set(constants.localstorageKeys.register, {
              email: values.email,
              username: values.username,
              currentStep: _response?.nextStep?.signUpStep,
              expiateAt: dayjs().add(
                constants.timeInterval.resetTimeInterval,
                'm'
              ),
              resendCodeEnableTime: dayjs()
                .add(constants.timeInterval.resendCodeTimeInterval, 'm')
                .toISOString()
            });
            setCompState((prevState) => ({
              ...prevState,
              currentStep: ZAwsSignUpStep.confirmSignUp,
              username: values.username,
              email: values.email,
              isProcessing: false,
              resendCodeEnableTime: dayjs()
                .add(constants.timeInterval.resendCodeTimeInterval, 'm')
                .toISOString()
            }));
          }
        }

        if (compState?.isProcessing) {
          finishedProcessing();
        }
      } catch (error) {
        finishedProcessing();

        if (error instanceof AuthError) {
          if (
            error?.name === ZErrorException.UsernameExistsException ||
            error?.name === ZErrorException.EmptySignUpUsername
          ) {
            setFieldError('username', error.message);
          }
          if (error?.name === ZErrorException.InvalidPasswordException) {
            setFieldError('password', error.message);
          }
        }
        reportCustomError(error);
      }
    },
    []
  );

  const formikConfirmRegisterHandler = useCallback(
    async (
      values: ZUserI,
      setFieldError: zSetFieldErrorType,
      setFieldValue: zSetFieldValueType
    ) => {
      try {
        processing();

        const _response = await confirmSignUp({
          confirmationCode: values.verificationCode ?? '',
          username: compState?.username ?? ''
        });
        if (
          _response !== undefined &&
          _response !== null &&
          typeof _response === 'object'
        ) {
          await Storage.remove(constants.localstorageKeys.register);
          if (
            _response?.nextStep?.signUpStep ===
            ZAwsSignUpStep.completeAutoSignIn
          ) {
            // const autoSignInRes = await autoSignIn();
            const _autoSignInResponse = await autoSignIn();

            if (
              _autoSignInResponse !== undefined &&
              _autoSignInResponse !== null &&
              _autoSignInResponse?.isSignedIn
            ) {
              const _user = await getCurrentUser();
              const _userAttribute = await fetchUserAttributes();
              const { accessToken, idToken } =
                (await fetchAuthSession()).tokens ?? {};

              setZAuthTokenRStateAtom((oldValues) => ({
                ...oldValues,
                token: idToken?.toString(),
                accessToken: accessToken?.toString()
              }));

              setZUserRState((oldValues) => ({
                ...oldValues,
                username: _user?.username,
                id: _user?.userId,
                attributes: _userAttribute
              }));

              showSuccessNotification(messages.login.loggingIn);
              // void navigate({
              //   to: AppRoutes.profile
              // });
            }

            finishedProcessing();

            // await navigate({
            //   to: AppRoutes.profile
            // });
          } else {
            finishedProcessing();

            showSuccessNotification(messages.register.signUpDoneLogin);
            void navigate({
              to: AppRoutes.login
            });
          }
        }
      } catch (error) {
        finishedProcessing();

        if (error instanceof AuthError) {
          if (error?.name === ZErrorException.AliasExistsException) {
            await setFieldValue('verificationCode', '');
            setCompState((prevState) => ({
              ...prevState,
              username: values.username,
              email: values.email,
              currentStep: ZAwsSignUpStep.signUp
            }));

            await Storage.set(constants.localstorageKeys.register, {
              email: values.email,
              username: values.username,
              response: {
                nextStep: {
                  signUpStep: ZAwsSignUpStep.signUp
                }
              }
            });
            setFieldError('email', error.message);
          }

          if (error?.name === ZErrorException.CodeMismatchException) {
            setFieldError('verificationCode', error.message);
          }
        }

        reportCustomError(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [compState?.username]
  );

  const loginBtnClickHandler = useCallback((): void => {
    try {
      void navigate({ to: AppRoutes.login });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const resendSignUpCodeHandler = useCallback(async () => {
    try {
      processing();

      const _response = await resendSignUpCode({
        username: compState?.username ?? ''
      });

      if (
        _response !== undefined &&
        _response !== null &&
        isZNonEmptyString(_response?.destination)
      ) {
        showSuccessNotification(messages.register.resendCodeSuccess);

        await Storage.set(constants.localstorageKeys.register, {
          email: compState?.email,
          username: compState?.username,
          currentStep: ZAwsSignUpStep.confirmSignUp,
          expiateAt: dayjs().add(constants.timeInterval.resetTimeInterval, 'm'),
          resendCodeEnableTime: dayjs()
            .add(constants.timeInterval.resendCodeTimeInterval, 'm')
            .toISOString()
        });
        setCompState((prevState) => ({
          ...prevState,
          currentStep: ZAwsSignUpStep.confirmSignUp,
          isProcessing: false,
          resendCodeEnableTime: dayjs()
            .add(constants.timeInterval.resendCodeTimeInterval, 'm')
            .toISOString(),
          canResendCode: false
        }));
      }

      finishedProcessing();
    } catch (error) {
      finishedProcessing();

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
  }, [compState?.username]);
  // #endregion

  // #region constants
  const formikInitialValues = useMemo(
    () => ({
      username: '',
      email: '',
      password: '',

      //
      verificationCode: '',

      //
      isApiError: false,
      isRegisterPending: false
    }),
    []
  );

  const pageHelmet = useMemo(
    () => ({
      title: `${constants.productInfo.name} - Register page - Zaions`
    }),
    []
  );
  // #endregion

  // #region Effects
  useLayoutEffect(() => {
    void (async () => {
      // const user = await getCurrentUser();
      const _register = await Storage.get<{
        email: string;
        username: string;
        currentStep: ZAwsSignUpStep;
        expiateAt: string;
        resendCodeEnableTime: string;
      }>(constants.localstorageKeys.register);
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
            currentStep: ZAwsSignUpStep.signUp,
            email: '',
            username: '',
            resendCodeEnableTime: '',
            canResendCode: false
          }));
        } else {
          setCompState((prevState) => ({
            ...prevState,
            currentStep: _register?.currentStep,
            email: _register?.email,
            username: _register?.username,
            resendCodeEnableTime: _resendCodeEnableTime,
            canResendCode: false
          }));
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (
      compState?.currentStep === ZAwsSignUpStep.confirmSignUp &&
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

  //
  return (
    <ZPage
      helmet={pageHelmet}
      className='relative w-full min-h-screen flx-col bg-light h max-h-max'
    >
      {/* Navigation */}
      <ZPublicNavTopBar />

      <ZRUBox className='flex flex-col items-center w-full h-full mt-6'>
        <ZRUBox className='pt-3 mt-10 w-full sm:w-[25.5625rem] text-start px-1 sm:ps-4'>
          <ZRUHeading
            as={ZRUHeadingAsE.h2}
            className={ZClassNames({
              'text-tertiary text-start text-[2.25rem] font-semibold normal-case maxMd:text-center mb-4':
                true
            })}
          >
            Register
          </ZRUHeading>

          <ZFormik
            initialValues={formikInitialValues}
            enableReinitialize
            validate={(values) => {
              const errors = {};

              if (compState?.currentStep === ZAwsSignUpStep.signUp) {
                validateFields(
                  ['email', 'username', 'password'],
                  values,
                  errors,
                  [
                    zValidationRuleE.email,
                    zValidationRuleE.string,
                    zValidationRuleE.password
                  ]
                );
              } else if (
                compState?.currentStep === ZAwsSignUpStep.confirmSignUp
              ) {
                validateFields(['verificationCode'], values, errors, [
                  zValidationRuleE.otp
                ]);
              }

              return errors;
            }}
            onSubmit={(values, { setFieldError, setFieldValue }) => {
              if (compState?.currentStep === ZAwsSignUpStep.signUp) {
                void formikRegisterSubmitHandler(values, setFieldError);
              } else if (
                compState?.currentStep === ZAwsSignUpStep.confirmSignUp
              ) {
                void formikConfirmRegisterHandler(
                  values,
                  setFieldError,
                  setFieldValue
                );
              }
            }}
          >
            {({
              values,
              touched,
              errors,
              isValid,
              handleChange,
              handleBlur,
              setFieldValue,
              submitForm
            }) => {
              return (
                <ZFormikForm>
                  {/* Form */}
                  <ZRUBox className='mt-6'>
                    {compState.currentStep === ZAwsSignUpStep.signUp ? (
                      <>
                        {/* Name filed */}
                        <ZRUInput
                          size='3'
                          required
                          name='username'
                          inputClassName='w-full'
                          label='Username'
                          value={values?.username}
                          errorNode={errors?.username}
                          isValid={
                            touched.username !== undefined
                              ? touched.username &&
                                !isZNonEmptyString(errors?.username)
                              : true
                          }
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {
                            handleBlur(e);
                          }}
                        />

                        {/* Email filed */}
                        <ZRUInput
                          size='3'
                          required
                          name='email'
                          className='mt-5'
                          inputClassName='w-full'
                          label='Email address'
                          value={values?.email}
                          errorNode={errors?.email}
                          isValid={
                            touched.email !== undefined
                              ? touched.email &&
                                !isZNonEmptyString(errors?.email)
                              : true
                          }
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={(e) => {
                            handleBlur(e);
                          }}
                        />

                        {/* Password filed */}
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
                              ? touched.password &&
                                !isZNonEmptyString(errors?.password)
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
                    ) : compState.currentStep ===
                      ZAwsSignUpStep.confirmSignUp ? (
                      <>
                        <ZRUText className='mt-3 text-lg font-normal ion-no-padding maxSm:text-center'>
                          Enter the confirmation code sent to [
                          <ZRUText className='font-bold'>
                            {values.email}
                          </ZRUText>
                          ]. Check your inbox and spam folder. No code? Request
                          a new one.
                        </ZRUText>

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
                      </>
                    ) : null}
                  </ZRUBox>

                  <ZRUBox className='mt-6'>
                    <ZRUButton
                      type='submit'
                      size='3'
                      loading={compState?.isProcessing}
                      className='flex items-center justify-center w-full normal-case'
                      onClick={() => {
                        void submitForm();
                      }}
                      disabled={
                        (!isValid && !values?.isApiError) ||
                        compState?.isProcessing
                      }
                    >
                      {compState?.currentStep === ZAwsSignUpStep.signUp
                        ? 'Register'
                        : compState?.currentStep ===
                            ZAwsSignUpStep.confirmSignUp
                          ? 'Enter Code'
                          : ''}
                    </ZRUButton>

                    {compState?.currentStep === ZAwsSignUpStep.signUp ? (
                      <ZRUText
                        as={ZRUTextAsE.p}
                        className='mt-2 maxSm:text-center'
                      >
                        Already have a account.{' '}
                        <ZRUText
                          as={ZRUTextAsE.span}
                          className='cursor-pointer text-primary hover:underline'
                          onClick={loginBtnClickHandler}
                        >
                          Login
                        </ZRUText>{' '}
                        instead.
                      </ZRUText>
                    ) : compState?.currentStep ===
                      ZAwsSignUpStep.confirmSignUp ? (
                      <ZRUButton
                        size='3'
                        variant={ZRUVariantE?.outline}
                        className='flex items-center justify-center w-full mt-3 normal-case'
                        disabled={
                          compState.isProcessing || !compState?.canResendCode
                        }
                        onClick={() => {
                          if (compState?.canResendCode) {
                            void resendSignUpCodeHandler();
                          }
                        }}
                      >
                        Resend
                      </ZRUButton>
                    ) : null}
                  </ZRUBox>
                </ZFormikForm>
              );
            }}
          </ZFormik>
        </ZRUBox>
      </ZRUBox>
    </ZPage>
  );
};

export default Register;
