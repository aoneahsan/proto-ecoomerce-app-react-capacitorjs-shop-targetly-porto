// #region ---- Core Imports ----
import React, { useCallback, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import {
  ZFormik,
  ZFormikForm,
  type zSetFieldErrorType
} from '@/Packages/Formik';

// #endregion

// #region ---- Custom Imports ----
import ZButton from '@/components123/Elements/Button';
import CurrencyForm from '@/components123/inpage123/CurrencyForm';
import {
  useZRQCreateRequest,
  useZRQUpdateRequest
} from '@/hook123/zreactquery.hooks';
import {
  Storage,
  isZNonEmptyString,
  reportCustomError,
  validateFields,
  zStringify
} from '@/utils/helpers123';
import { extractInnerData } from '@/utils/helpers123/APIS';
import constants from '@/utils/constants';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/helpers123/Notification';
import { messages } from '@/utils/messages123';

// #endregion

// #region ---- Types Imports ----
import { zValidationRuleE } from '@/utils/enums123/index.enum';
import { ZFill } from '@/utils/enums123/Elements.enum';
import { ApiUrlEnum } from '@/utils/enums123/apis.enum';
import {
  extractInnerDataObjectEnum,
  extractInnerDataOptionsEnum
} from '@/types123/apis123/index.type';

// #endregion

// #region ---- Store Imports ----
import { ZUserRStateAtom } from '@/store123/auth123/user123/index.recoil.ts';
import { SpinSvg } from '@/assets';
import { ZClassNames } from '@/Packages/ClassNames';
import { type ZFileI } from '@/types123/auth123/index.type';
import { zAxiosApiRequestContentType } from '@/types123/global123/zapi-hooks.type';

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

const Currency: React.FC = () => {
  // #region Recoil
  const [ZUserRState, setZUserRStateAtom] = useRecoilState(ZUserRStateAtom);
  // #endregion

  // #region Apis
  const {
    mutateAsync: currencyDetailsAsyncMutate,
    isPending: isCurrencyDetailsPending
  } = useZRQUpdateRequest({
    _url: ApiUrlEnum.currencyDetails
  });

  const { mutateAsync: uploadFileMutateAsync, isPending: isUploadFilePending } =
    useZRQCreateRequest({
      _url: ApiUrlEnum.uploadSingleFile,
      _contentType: zAxiosApiRequestContentType.FormData
    });
  // #endregion

  // #region Functions
  const UploadFileHandler = useCallback(
    async (
      value: FormData
    ): Promise<{
      filePath: string;
      fileUrl: string;
    }> => {
      try {
        const _response = await uploadFileMutateAsync(value);

        if (_response !== undefined && _response !== null) {
          const _data = extractInnerData<ZFileI>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data !== undefined && _data !== null) {
            return {
              filePath: _data?.filePath,
              fileUrl: _data?.fileUrl
            };
          }
        }
        return {
          filePath: '',
          fileUrl: ''
        };
      } catch (error) {
        reportCustomError(error);
        return {
          filePath: '',
          fileUrl: ''
        };
      }
    },
    // eslint-disable-next-line
    []
  );

  const formikSubmitHandler = async (
    value: string,
    setFieldError: zSetFieldErrorType
  ): Promise<void> => {
    try {
      const _response = await currencyDetailsAsyncMutate({
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

          showSuccessNotification(messages.user.currencyDetailsUpdated);
        }
      }
    } catch (error) {
      reportCustomError(error);
      if (error instanceof AxiosError) {
        const _data = extractInnerData<{
          item: string[];
          logo: string[];
          default_currency: string[];
        }>(
          error?.response?.data,
          extractInnerDataOptionsEnum.createRequestResponseData,
          extractInnerDataObjectEnum.error
        );
        if (Array.isArray(_data?.item) && isZNonEmptyString(_data?.item[0])) {
          showErrorNotification(_data?.item[0]);
        }

        if (Array.isArray(_data?.logo) && isZNonEmptyString(_data?.logo[0])) {
          setFieldError('logoUrl', _data?.logo[0]);
        }

        if (
          Array.isArray(_data?.default_currency) &&
          isZNonEmptyString(_data?.default_currency[0])
        ) {
          setFieldError('default_currency', _data?.default_currency[0]);
        }
      }
    }
  };
  // #endregion

  const formikInitialValues = useMemo(
    () => ({
      default_currency: ZUserRState?.default_currency ?? null,
      logoUrl: ZUserRState?.logo?.url ?? '',
      logoFile: null
    }),
    [ZUserRState]
  );
  return (
    <>
      <h2 className='uppercase text-primary text-[1.5rem] md:text-[2.25rem] font-black font-mont-heavy'>
        Currency & Logo
      </h2>

      <ZFormik
        initialValues={formikInitialValues}
        enableReinitialize
        validate={(values) => {
          const errors: { default_currency?: string } = {};

          validateFields(['logoUrl'], values, errors, [
            zValidationRuleE.string
          ]);

          if (
            values?.default_currency === null ||
            values?.default_currency === undefined ||
            (typeof values?.default_currency === 'object' &&
              values?.default_currency !== null &&
              !isZNonEmptyString(String(values?.default_currency?.value)))
          ) {
            errors.default_currency = messages.formValidations.currency;
          } else {
            delete errors?.default_currency;
          }

          return errors;
        }}
        onSubmit={(values, { setFieldError }) => {
          void (async () => {
            let formData = null;
            let _filePath = '';
            let _fileUrl = '';
            if (values.logoFile !== null && values.logoFile !== undefined) {
              formData = new FormData();
              formData.append('file', values.logoFile);

              const { filePath, fileUrl } = await UploadFileHandler(formData);
              _filePath = filePath;
              _fileUrl = fileUrl;
            }

            const zStringifyData = zStringify({
              logo: zStringify({
                path: _filePath,
                url: _fileUrl
              }),
              default_currency: zStringify(values.default_currency)
            });

            await formikSubmitHandler(zStringifyData, setFieldError);
          })();
        }}
      >
        {({ handleSubmit, isValid, dirty }) => {
          return (
            <ZFormikForm onSubmit={handleSubmit} className='maxSm:px-3'>
              <CurrencyForm width='23.4375rem' />

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
                      !isValid ||
                      isCurrencyDetailsPending ||
                      !dirty ||
                      isUploadFilePending
                  })}
                  disabled={
                    !isValid ||
                    isCurrencyDetailsPending ||
                    !dirty ||
                    isUploadFilePending
                  }
                >
                  {isCurrencyDetailsPending || isUploadFilePending ? (
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

export default Currency;
