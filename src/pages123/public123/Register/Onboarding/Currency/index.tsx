// #region ---- Core Imports ----
import React, { useCallback, useMemo } from 'react';

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
import ZButton from '@/components123/Elements/Button';
import {
  Storage,
  isZNonEmptyString,
  reportCustomError,
  zStringify
} from '@/utils/helpers123';
import {
  useZRQCreateRequest,
  useZRQUpdateRequest
} from '@/hook123/zreactquery.hooks';
import { AppRoutes } from '@/Routes/AppRoutes';
import { useZNavigate } from '@/hook123/navigation123.hook';
import constants from '@/utils/constants';
import { extractInnerData } from '@/utils/helpers123/APIS';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/helpers123/Notification';
import { messages } from '@/utils/messages123';

// #endregion

// #region ---- Types Imports ----
import { ZFill } from '@/utils/enums123/Elements.enum';
import { ApiUrlEnum } from '@/utils/enums123/apis.enum';
import { type ZFileI, type ZAuthI } from '@/types123/auth123/index.type';
import {
  extractInnerDataObjectEnum,
  extractInnerDataOptionsEnum
} from '@/types123/apis123/index.type';

// #endregion

// #region ---- Store Imports ----
import { ZUserRStateAtom } from '@/store123/auth123/user123/index.recoil.ts';

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
import { SpinSvg } from '@/assets';
import CurrencyForm from '@/components123/inpage123/CurrencyForm';
import { zAxiosApiRequestContentType } from '@/types123/global123/zapi-hooks.type';

// #endregion

const CurrencyStep: React.FC = () => {
  const formikInitialValues: ZAuthI = useMemo(
    () => ({
      default_currency: null,
      logoUrl: '',
      logoPath: '',
      logoFile: null,

      //
      isApiError: false,
      isRegisterPending: false
    }),
    []
  );

  // #region custom hooks
  const navigate = useZNavigate();
  // #endregion

  // #region api
  const {
    mutateAsync: currencyDetailMutateAsync,
    isPending: isCurrencyDetailPending
  } = useZRQUpdateRequest({
    _url: ApiUrlEnum.currencyDetails
  });

  // file upload api
  const { mutateAsync: uploadFileMutateAsync, isPending: isUploadFilePending } =
    useZRQCreateRequest({
      _url: ApiUrlEnum.uploadSingleFile,
      _contentType: zAxiosApiRequestContentType.FormData
    });
  // #endregion

  // #region Recoil
  const setZUserRStateAtom = useSetRecoilState(ZUserRStateAtom);
  // #endregion

  // #region functions
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
      const _response = await currencyDetailMutateAsync({
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

          showSuccessNotification(messages.user.currencyDetails);

          void navigate({
            to: AppRoutes.onBoardingSub.bankDetailsStep.completePath
          });
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

  const skipForNowBthHandler = useCallback(() => {
    void navigate({
      to: AppRoutes.onBoardingSub.bankDetailsStep.completePath
    });
    // eslint-disable-next-line
  }, []);
  // #endregion

  return (
    <div className='w-full pt-3 mt-10 text-start ps-4'>
      <h2
        className={ZClassNames({
          'text-primary text-start text-[2.25rem] font-black uppercase font-mont-heavy maxMd:text-center mb-10':
            true
        })}
      >
        Currency & Logo
      </h2>

      {/* Progress integrator */}
      <div className='flex items-center w-full gap-3 mt-1'>
        <div className='h-[4px] w-[18.65rem] mt-1 overflow-hidden max-w-auto rounded-full bg-[#cadad3] relative'>
          <div
            className={ZClassNames({
              'absolute h-full transition-all rounded-e-full bg-primary w-[75%]':
                true
            })}
          ></div>
        </div>
        <span className='flex items-center text-[1rem] leading-[120%] font-semibold font-roboto-regular'>
          Step
          <span className='flex items-center ms-1'>
            <span className='text-primary'>3</span>/<span>4</span>
          </span>
        </span>
      </div>
      <ZFormik
        initialValues={formikInitialValues}
        validate={(values) => {
          const errors: { default_currency?: string } = {};

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
        {({ isValid, handleSubmit }) => {
          return (
            <ZFormikForm onSubmit={handleSubmit}>
              <div className='mt-6'>
                <CurrencyForm />

                <div className='flex gap-1 pt-3 mt-3 maxSm:flex-col'>
                  <ZButton
                    type='submit'
                    className={ZClassNames({
                      'flex items-center justify-center uppercase': true,
                      'cursor-not-allowed px-[1rem!important]':
                        isCurrencyDetailPending || isUploadFilePending
                    })}
                    disabled={
                      !isValid || isCurrencyDetailPending || isUploadFilePending
                    }
                  >
                    {isCurrencyDetailPending || isUploadFilePending ? (
                      <SpinSvg className='me-2 text-secondary' />
                    ) : (
                      ''
                    )}
                    Continue
                  </ZButton>
                  <ZButton
                    fill={ZFill.clear}
                    type='button'
                    onClick={skipForNowBthHandler}
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

export default CurrencyStep;
