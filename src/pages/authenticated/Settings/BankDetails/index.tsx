// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import {
  ZFormik,
  ZFormikForm,
  type zSetFieldErrorType
} from '@/Packages/Formik';

// #endregion

// #region ---- Custom Imports ----
import ZButton from '@/components/Elements/Button';
import {
  Storage,
  isZNonEmptyString,
  reportCustomError,
  validateFields,
  zStringify
} from '@/utils/helpers';
import BackDetailsForm from '@/components/inpage/BankDetailsForm';
import { useZRQUpdateRequest } from '@/hooks/zreactquery.hooks';
import { extractInnerData } from '@/utils/helpers/APIS';
import constants from '@/utils/constants';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/helpers/Notification';
import { messages } from '@/utils/messages';

// #endregion

// #region ---- Types Imports ----
import { ZFill } from '@/utils/enums/elements.enum';
import { zValidationRuleE } from '@/utils/enums/index.enum';
import { ApiUrlEnum } from '@/utils/enums/apis.enum';
import {
  extractInnerDataObjectEnum,
  extractInnerDataOptionsEnum
} from '@/types/apis/index.type';

// #endregion

// #region ---- Store Imports ----
import { ZUserRStateAtom } from '@/store/auth/user/index.recoil.ts';
import { SpinSvg } from '@/assets';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

const BankDetails: React.FC = () => {
  // #region Recoil
  const [ZUserRState, setZUserRStateAtom] = useRecoilState(ZUserRStateAtom);
  // #endregion

  // #region Apis
  const {
    mutateAsync: bankDetailsAsyncMutate,
    isPending: isBankDetailsPending
  } = useZRQUpdateRequest({
    _url: ApiUrlEnum.bankDetails
  });
  // #endregion

  // #region Functions
  const formikSubmitHandler = async (
    value: string,
    setFieldError: zSetFieldErrorType
  ): Promise<void> => {
    try {
      const _response = await bankDetailsAsyncMutate({
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

          showSuccessNotification(messages.user.bankDetailsUpdated);
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

  const formikInitialValues = useMemo(
    () => ({
      bank_details: ZUserRState?.bank_details ?? '',

      //
      isApiError: false
    }),
    [ZUserRState]
  );

  return (
    <>
      <h2 className='uppercase text-primary text-[1.5rem] md:text-[2.25rem] font-black font-mont-heavy'>
        Bank details
      </h2>

      <ZFormik
        initialValues={formikInitialValues}
        validate={(values) => {
          const errors = {};

          validateFields(['bank_details'], values, errors, [
            zValidationRuleE.string
          ]);

          return errors;
        }}
        onSubmit={(values, { setFieldError }) => {
          const zStringifyData = zStringify({
            bank_details: values.bank_details
          });

          void formikSubmitHandler(zStringifyData, setFieldError);
        }}
      >
        {({ handleSubmit, isValid, dirty }) => {
          return (
            <ZFormikForm onSubmit={handleSubmit} className='maxSm:px-3'>
              <BackDetailsForm width='23.4375rem' />

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
                      !isValid || !dirty || isBankDetailsPending
                  })}
                  disabled={!isValid || !dirty || isBankDetailsPending}
                >
                  {isBankDetailsPending ? (
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
      </ZFormik>
    </>
  );
};

export default BankDetails;
