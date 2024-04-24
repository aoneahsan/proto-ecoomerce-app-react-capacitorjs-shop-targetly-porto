// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { ZClassNames } from '@/Packages/ClassNames';
import {
  ZFormik,
  ZFormikForm,
  type zSetFieldErrorType
} from '@/Packages/Formik';

// #endregion

// #region ---- Custom Imports ----
import ZButton from '@/Components/Elements/Button';
import {
  Storage,
  isZNonEmptyString,
  reportCustomError,
  validateField,
  zStringify
} from '@/utils/Helpers';
import { useZRQUpdateRequest } from '@/ZHooks/zreactquery.hooks';
import { extractInnerData } from '@/utils/Helpers/APIS';
import constants from '@/utils/Constants';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/Helpers/Notification';
import { messages } from '@/utils/Messages';
import BackDetailsForm from '@/Components/Inpage/BankDetailsForm';
import { useZNavigate } from '@/ZHooks/Navigation.hook';
import { AppRoutes } from '@/Routes/AppRoutes';

// #endregion

// #region ---- Types Imports ----
import { ZFill } from '@/utils/Enums/Elements.enum';
import { zValidationRuleE } from '@/utils/Enums/index.enum';
import { ApiUrlEnum } from '@/utils/Enums/apis.enum';
import { type ZAuthI } from '@/Types/Auth/index.type';
import {
  extractInnerDataObjectEnum,
  extractInnerDataOptionsEnum
} from '@/Types/APIs/index.type';

// #endregion

// #region ---- Store Imports ----
import { ZUserRStateAtom } from '@/Store/Auth/User';

// #endregion

// #region ---- Images Imports ----
import { SpinSvg } from '@/assets';
import { ZInvoiceTypeE } from '@/Types/Auth/Invoice';

// #endregion

// #region ---- Types Imports ----

// #endregion

const BankDetailsStep: React.FC = () => {
  const formikInitialValues = useMemo(
    () => ({
      bank_details: '',

      //
      isApiError: false
    }),
    []
  );

  // #region api
  const { mutateAsync: bankDetailMutateAsync, isPending: isBankDetailPending } =
    useZRQUpdateRequest({
      _url: ApiUrlEnum.bankDetails
    });
  // #endregion

  // #region Recoil
  const setZUserRStateAtom = useSetRecoilState(ZUserRStateAtom);
  // #endregion

  // #region custom hooks
  const navigate = useZNavigate();
  // #endregion

  // #region functions
  const formikSubmitHandler = async (
    value: string,
    setFieldError: zSetFieldErrorType
  ): Promise<void> => {
    try {
      const _response = await bankDetailMutateAsync({
        itemIds: [],
        urlDynamicParts: [],
        requestData: value
      });

      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData<ZAuthI>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data !== null && _data !== undefined) {
          // store User data.
          void Storage.set(constants.localstorageKeys.userData, _data);

          // Storing user data in user Recoil State.
          setZUserRStateAtom((oldValues) => ({
            ...oldValues,
            ..._data
          }));

          showSuccessNotification(messages.user.bankDetails);

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
          bank_details: string[];
        }>(
          error?.response?.data,
          extractInnerDataOptionsEnum.createRequestResponseData,
          extractInnerDataObjectEnum.error
        );
        if (Array.isArray(_data?.item) && isZNonEmptyString(_data?.item[0])) {
          showErrorNotification(_data?.item[0]);
        }
        if (
          Array.isArray(_data?.bank_details) &&
          isZNonEmptyString(_data?.bank_details[0])
        ) {
          setFieldError('bank_details', _data?.bank_details[0]);
        }
      }
    }
  };
  // #endregion

  return (
    <div className='w-full pt-3 mt-10 text-start ps-4'>
      <h2
        className={ZClassNames({
          'text-primary text-start text-[2.25rem] font-black uppercase font-mont-heavy maxMd:text-center mb-10':
            true
        })}
      >
        Bank details
      </h2>

      {/* Progress integrator */}
      <div className='flex items-center w-full gap-3 mt-1'>
        <div className='h-[4px] w-[18.65rem] mt-1 overflow-hidden max-w-auto rounded-full bg-[#cadad3] relative'>
          <div
            className={ZClassNames({
              'absolute h-full transition-all rounded-e-full bg-primary w-full':
                true
            })}
          ></div>
        </div>
        <span className='flex items-center text-[1rem] leading-[120%] font-semibold font-roboto-regular'>
          Step
          <span className='flex items-center ms-1'>
            <span className='text-primary'>4</span>/<span>4</span>
          </span>
        </span>
      </div>
      <ZFormik
        initialValues={formikInitialValues}
        validate={(values) => {
          const errors = {};

          validateField(
            'bank_details',
            values,
            errors,
            zValidationRuleE.string
          );

          return errors;
        }}
        onSubmit={(values, { setFieldError }) => {
          const zStringifyData = zStringify({
            bank_details: values.bank_details
          });

          void formikSubmitHandler(zStringifyData, setFieldError);
        }}
      >
        {({ isValid, handleSubmit }) => {
          return (
            <ZFormikForm onSubmit={handleSubmit}>
              <div className='mt-6'>
                <BackDetailsForm />

                <div className='flex gap-1 pt-5 mt-5 maxSm:flex-col'>
                  <ZButton
                    type='submit'
                    className={ZClassNames({
                      'flex items-center justify-center uppercase': true,
                      'cursor-not-allowed px-[1rem!important]':
                        isBankDetailPending
                    })}
                    disabled={!isValid || isBankDetailPending}
                  >
                    {isBankDetailPending ? (
                      <SpinSvg className='me-2 text-secondary' />
                    ) : (
                      ''
                    )}
                    Finish
                  </ZButton>
                  <ZButton
                    fill={ZFill.clear}
                    type='button'
                    onClick={() => {
                      void navigate({
                        to: AppRoutes.authRoutes.invoices,
                        params: {
                          invoiceType: ZInvoiceTypeE.inv
                        }
                      });
                    }}
                  >
                    <span className='me-2 pe-1 text-tertiary'>OR</span>
                    <span>SKIP FOR NOW</span>
                  </ZButton>
                </div>
              </div>
            </ZFormikForm>
          );
        }}
      </ZFormik>
    </div>
  );
};

export default BankDetailsStep;
