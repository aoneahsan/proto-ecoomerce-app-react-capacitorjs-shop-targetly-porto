// #region ---- Core Imports ----
import React, { useCallback, useMemo, useState } from 'react';

// #endregion

// #region ---- Packages Imports ----
import {
  signIn,
  getCurrentUser,
  fetchUserAttributes,
  AuthError,
  fetchAuthSession
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
} from '@/Components/RadixUI';
import { ZPage } from '@/Components/Elements';
import ZPublicNavTopBar from '@/Components/Common/Navigation/TopBar';
import {
  ZFormik,
  ZFormikForm,
  type zSetFieldErrorType
} from '@/Packages/Formik';
import {
  isZNonEmptyString,
  reportCustomError,
  validateField
} from '@/utils/Helpers';
import { useZNavigate } from '@/ZHooks/Navigation.hook';
import constants from '@/utils/constants12';
import { showSuccessNotification } from '@/utils/Helpers/Notification';
import { messages } from '@/utils/Messages';

// #endregion

// #region ---- Types Imports ----
import { zValidationRuleE } from '@/utils/Enums/index.enum';
import { AppRoutes } from '@/Routes/AppRoutes';
import { ZUserI, type ZAuthI } from '@/Types/Auth/index.type';
import { ZRUHeadingAsE, ZRUTextAsE } from '@/Types/radixUI/index.type';
import { ZErrorException } from '@/Types/APIs/AWS/index.type';

// #endregion

// #region ---- Store Imports ----
import { ZUserRStateAtom } from '@/Store/Auth/User';
import { ZAuthTokenData } from '@/Store/Auth/index.recoil';

// #endregion

const Login: React.FC = () => {
  const [compState, setCompState] = useState({ isProcessing: false });

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

  const registerBtnClickHandler = useCallback((): void => {
    try {
      void navigate({ to: AppRoutes.register });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const forgotBtnClickHandler = useCallback((): void => {
    try {
      void navigate({ to: AppRoutes.forgotPassword });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const formikSubmitHandler = useCallback(
    async (values: ZUserI, setFieldError: zSetFieldErrorType) => {
      try {
        processing();
        const _response = await signIn({
          username: values?.email ?? '',
          password: values?.password
        });

        if (
          _response !== undefined &&
          _response !== null &&
          typeof _response === 'object'
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
            ..._userAttribute
          }));

          showSuccessNotification(messages.login.loggedIn);

          finishedProcessing();

          // void navigate({
          //   to: AppRoutes.profile
          // });
        }

        if (compState?.isProcessing) {
          finishedProcessing();
        }
      } catch (error) {
        finishedProcessing();
        if (error instanceof AuthError) {
          if (error?.name === ZErrorException.NotAuthorizedException) {
            setFieldError('password', error.message);
          }
        }

        reportCustomError(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  // #endregion

  // #region constants
  const pageHelmet = useMemo(
    () => ({
      title: `${constants.productInfo.name} - Login page - Zaions`
    }),
    []
  );

  const formikInitialValues = useMemo(
    () => ({
      email: '',
      password: '',

      // Just for frontend
      isApiError: false
    }),
    []
  );
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
            validate={(values) => {
              const errors = {};
              validateField('email', values, errors, zValidationRuleE.email);
              validateField(
                'password',
                values,
                errors,
                zValidationRuleE.password
              );

              return errors;
            }}
            onSubmit={(values, { setFieldError, setFieldValue }) => {
              void formikSubmitHandler(values, setFieldError);
            }}
          >
            {({
              values,
              touched,
              errors,
              isValid,
              handleSubmit,
              handleChange,
              handleBlur,
              submitForm
            }) => {
              return (
                <ZFormikForm onSubmit={handleSubmit}>
                  <ZRUHeading
                    as={ZRUHeadingAsE.h2}
                    className='text-tertiary text-start text-[2.25rem] font-semibold normal-case maxMd:text-center mb-4'
                  >
                    Login
                  </ZRUHeading>

                  <ZRUBox className='mt-5'>
                    {/* Email filed */}
                    <ZRUInput
                      size='3'
                      required
                      name='email'
                      inputClassName='w-full'
                      label='Username or email address'
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
                    <ZRUBox className='text-end'>
                      <ZRUText
                        as={ZRUTextAsE.span}
                        className='cursor-pointer text-primary hover:underline'
                        onClick={forgotBtnClickHandler}
                      >
                        Forgot your password?
                      </ZRUText>
                    </ZRUBox>
                  </ZRUBox>

                  <ZRUBox className='mt-6'>
                    <ZRUButton
                      type='button'
                      size='3'
                      loading={compState?.isProcessing}
                      className='flex items-center justify-center w-full normal-case'
                      disabled={
                        (!isValid && !values?.isApiError) ||
                        compState?.isProcessing
                      }
                      onClick={() => {
                        void submitForm();
                      }}
                    >
                      Log in
                    </ZRUButton>

                    <ZRUText
                      as={ZRUTextAsE.p}
                      className='mt-2 maxSm:text-center'
                    >
                      New here?{' '}
                      <ZRUText
                        as={ZRUTextAsE.span}
                        className='cursor-pointer text-primary hover:underline'
                        onClick={registerBtnClickHandler}
                      >
                        Register now
                      </ZRUText>{' '}
                      to unlock exclusive features and benefits!
                    </ZRUText>
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

export default Login;
