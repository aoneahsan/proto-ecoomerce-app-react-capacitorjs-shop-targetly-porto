// #region ---- Core Imports ----
import React, { useEffect, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { AxiosError } from 'axios';
import { useParams } from '@tanstack/react-router';
import {
  ZFormik,
  ZFormikForm,
  type zSetFieldErrorType
} from '@/Packages/Formik';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----
import ZAuthNavigation from '@/Components/Auth/Navigation';
import BackDetailsForm from '@/Components/Inpage/BankDetailsForm';
import Copyright from '@/Components/Inpage/Copyright';
import ProfileForm from '@/Components/Inpage/ProfileForm';
import ZButton from '@/Components/Elements/Button';
import {
  useZRQCreateRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZHooks/zreactquery.hooks';
import { queryKeys } from '@/utils/Constants/Query';
import {
  isZNonEmptyString,
  reportCustomError,
  validateFields,
  zStringify
} from '@/utils/Helpers';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/Helpers/Notification';
import { messages } from '@/utils/Messages';
import { useZNavigate } from '@/ZHooks/Navigation.hook';
import { AppRoutes } from '@/Routes/AppRoutes';
import ZClientFormSkeleton from '@/Components/Skeleton/Form/clientFormSkeleton';

// #endregion

// #region ---- Types Imports ----
import { extractInnerData } from '@/utils/Helpers/APIS';
import {
  ApiUrlEnum,
  RouteParams,
  ZRQGetRequestExtractEnum,
  ZRQUpdaterAction
} from '@/utils/Enums/apis.enum';
import { ZFill } from '@/utils/Enums/Elements.enum';
import { type ZClientI } from '@/Types/Auth/Clients/index.type';
import {
  extractInnerDataObjectEnum,
  extractInnerDataOptionsEnum
} from '@/Types/APIs/index.type';
import { zValidationRuleE } from '@/utils/Enums/index.enum';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
import { SpinSvg, productVector } from '@/assets';

// #endregion

const ClientForm: React.FC = () => {
  // When it's edit route that we will get clientId from route params
  const { clientId } = useParams({
    from: AppRoutes.authRoutes.clientSub.update.completePath
  });

  // #region Custom hooks
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const navigate = useZNavigate();
  // #endregion

  // #region Apis
  // If client create route the below api is used to create a client
  const {
    mutateAsync: createClientMutateAsync,
    isPending: isCreateClientPending
  } = useZRQCreateRequest({
    _url: ApiUrlEnum.createClient
  });

  // If client update route the below api is used to update a client
  const {
    mutateAsync: updateClientMutateAsync,
    isPending: isUpdateClientPending
  } = useZRQUpdateRequest({
    _url: ApiUrlEnum.updateClient
  });

  // If this is a update client route then clientId will be received from params though that client data will fetch below
  const {
    data: selectedClientData,
    isFetching: isSelectedClientDataFetching,
    error: selectedClientError
  } = useZRQGetRequest<ZClientI>({
    _url: ApiUrlEnum.viewClient,
    _itemsIds: [clientId],
    _urlDynamicParts: [RouteParams.clientId],
    _key: [queryKeys.clients.get, clientId],
    _shouldFetchWhenIdPassed: !isZNonEmptyString(clientId),
    _extractType: ZRQGetRequestExtractEnum.extractItem
  });
  // #endregion

  // #region Functions
  const formikSubmitHandler = async (
    value: string,
    setFieldError: zSetFieldErrorType
  ): Promise<void> => {
    try {
      let _response;
      if (isZNonEmptyString(clientId)) {
        _response = await updateClientMutateAsync({
          requestData: value,
          itemIds: [clientId],
          urlDynamicParts: [RouteParams.clientId]
        });
      } else {
        _response = await createClientMutateAsync(value);
      }

      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData<ZClientI>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );
        if (isZNonEmptyString(_data?.id)) {
          await updateRQCDataHandler({
            key: [queryKeys.clients.list],
            data: _data,
            id: clientId,
            updaterAction: isZNonEmptyString(clientId)
              ? ZRQUpdaterAction.replace
              : ZRQUpdaterAction.add
          });

          if (isZNonEmptyString(clientId)) {
            await updateRQCDataHandler({
              key: [queryKeys.clients.get, clientId],
              data: _data,
              updaterAction: ZRQUpdaterAction.updateHole,
              extractType: ZRQGetRequestExtractEnum.extractItem
            });
            showSuccessNotification(messages.client.update);
          } else {
            showSuccessNotification(messages.client.added);
          }

          await navigate({
            to: AppRoutes.authRoutes.client
          });
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _data = extractInnerData<{
          item: string[];
          name: string[];
          email: string[];
          // phone_number: string[];
          address: string[];
          company: string[];
          country: string[];
          notes: string[];
          company_registration_number: string[];
          city: string[];
          zipcode: string[];
          vat_number: string[];
          default_currency: string[];
          bank_details: string[];
        }>(
          error?.response?.data,
          extractInnerDataOptionsEnum.createRequestResponseData,
          extractInnerDataObjectEnum.error
        );
        if (Array.isArray(_data?.item) && isZNonEmptyString(_data?.item[0])) {
          showErrorNotification(messages.general.failed);
        }

        if (Array.isArray(_data?.name) && isZNonEmptyString(_data?.name[0])) {
          setFieldError('name', _data?.name[0]);
        }

        if (Array.isArray(_data?.email) && isZNonEmptyString(_data?.email[0])) {
          setFieldError('email', _data?.email[0]);
        }

        // if (_data?.phone_number !== undefined && isZNonEmptyString(_data?.phone_number[0])) {
        //   setFieldError('phoneNumber', _data?.phone_number[0]);
        // }

        if (
          Array.isArray(_data?.address) &&
          isZNonEmptyString(_data?.address[0])
        ) {
          setFieldError('address', _data?.address[0]);
        }

        if (
          Array.isArray(_data?.company) &&
          isZNonEmptyString(_data?.company[0])
        ) {
          setFieldError('company', _data?.company[0]);
        }

        if (
          Array.isArray(_data?.country) &&
          isZNonEmptyString(_data?.country[0])
        ) {
          setFieldError('country', _data?.country[0]);
        }

        if (Array.isArray(_data?.notes) && isZNonEmptyString(_data?.notes[0])) {
          setFieldError('note', _data?.notes[0]);
        }

        if (
          Array.isArray(_data?.company_registration_number) &&
          _data?.company_registration_number !== undefined &&
          isZNonEmptyString(_data?.company_registration_number[0])
        ) {
          setFieldError(
            'company_registration_number',
            _data?.company_registration_number[0]
          );
        }

        if (Array.isArray(_data?.city) && isZNonEmptyString(_data?.city[0])) {
          setFieldError('city', _data?.city[0]);
        }

        if (
          Array.isArray(_data?.zipcode) &&
          isZNonEmptyString(_data?.zipcode[0])
        ) {
          setFieldError('zipcode', _data?.zipcode[0]);
        }

        if (
          Array.isArray(_data?.vat_number) &&
          isZNonEmptyString(_data?.vat_number[0])
        ) {
          setFieldError('vat_number', _data?.vat_number[0]);
        }

        if (
          Array.isArray(_data?.default_currency) &&
          isZNonEmptyString(_data?.default_currency[0])
        ) {
          setFieldError('default_currency', _data?.default_currency[0]);
        }

        if (
          Array.isArray(_data?.bank_details) &&
          isZNonEmptyString(_data?.bank_details[0])
        ) {
          setFieldError('bank_details', _data?.bank_details[0]);
        }
      }
      reportCustomError(error);
    }
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    if (selectedClientError !== undefined && selectedClientError !== null) {
      if (selectedClientError instanceof AxiosError) {
        const _errorResponse = selectedClientError?.response?.data;

        if (_errorResponse !== undefined && _errorResponse !== null) {
          const _errors = extractInnerData<string[]>(
            _errorResponse,
            extractInnerDataOptionsEnum.createRequestResponseItem,
            extractInnerDataObjectEnum.error
          );
          if (_errors !== undefined && isZNonEmptyString(_errors[0])) {
            showErrorNotification(_errors[0]);

            void navigate({
              to: AppRoutes.authRoutes.client
            });
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [selectedClientError]);

  // #endregion

  const formikInitialValues = useMemo(
    () => ({
      company: selectedClientData?.company ?? '',
      address: selectedClientData?.address ?? '',
      name: selectedClientData?.name ?? '',
      email: selectedClientData?.email ?? '',
      // phoneNumber: selectedClientData?.phone_number ?? '',
      country: selectedClientData?.country ?? '',
      note: selectedClientData?.notes ?? '',
      company_registration_number:
        selectedClientData?.company_registration_number ?? '',
      city: selectedClientData?.city ?? '',
      zipcode: selectedClientData?.zipcode ?? '',
      default_currency: selectedClientData?.default_currency ?? null,
      vat_number: selectedClientData?.vat_number ?? '',
      bank_details: selectedClientData?.bank_details ?? ''
    }),
    [selectedClientData]
  );
  return (
    <div className='relative flex flex-col items-center justify-between w-full min-h-screen pt-5 overflow-x-hidden bg-secondary h max-h-max lg:pe-8 maxLg:px-2'>
      <div className='max-w-[85.4rem] w-full mx-auto'>
        <ZAuthNavigation />

        <div className='w-[64.4375rem] max-w-full mx-auto maxMd:mt-[1.6rem] md:mt-[2.4rem]'>
          <h2 className='uppercase maxLg:text-center text-primary md:me-9 text-[1.5rem] md:text-[2.25rem] font-black font-mont-heavy'>
            {isZNonEmptyString(clientId) ? 'Update' : 'Add New'} Client
          </h2>
          <ZFormik
            initialValues={formikInitialValues}
            enableReinitialize={true}
            validate={(values) => {
              const errors: { default_currency?: string } = {};
              validateFields(
                [
                  'name',
                  'email',
                  // 'phoneNumber',
                  'address',
                  'company',
                  'city',
                  'country',
                  'company_registration_number',
                  'zipcode',
                  'vat_number',
                  'default_currency',
                  'bank_details'
                ],
                values,
                errors,
                [
                  zValidationRuleE.string,
                  zValidationRuleE.email,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string
                  // zValidationRuleE.string
                ]
              );

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
              const zStringifyData = zStringify({
                name: values.name,
                email: values.email,
                // phone_number: values.phoneNumber,
                address: values.address,
                company: values.company,
                country: values.country,
                notes: values.note,
                company_registration_number: values.company_registration_number,
                city: values.city,
                zipcode: values.zipcode,
                vat_number: values.vat_number,
                default_currency: zStringify(values.default_currency),
                bank_details: values.bank_details
              });

              void formikSubmitHandler(zStringifyData, setFieldError);
            }}
          >
            {({ isValid, handleSubmit, dirty }) => {
              return (
                <ZFormikForm
                  onSubmit={handleSubmit}
                  className='flex flex-col items-center w-full mt-5'
                >
                  {isZNonEmptyString(clientId) &&
                  isSelectedClientDataFetching ? (
                    <ZClientFormSkeleton />
                  ) : (
                    <>
                      <ProfileForm />
                      <BackDetailsForm className='mt-4' />

                      <div className='flex pt-3 max-w-[23.438rem] w-full mt-10 maxSm:flex-col-reverse maxSm:gap-y-2 sm:items-center sm:justify-between'>
                        <ZButton fill={ZFill.clear} className='uppercase'>
                          Cancel
                        </ZButton>
                        <ZButton
                          type='submit'
                          className={ZClassNames({
                            'flex items-center justify-center uppercase': true,
                            'cursor-not-allowed':
                              isCreateClientPending ||
                              isUpdateClientPending ||
                              !dirty
                          })}
                          disabled={
                            !isValid ||
                            isCreateClientPending ||
                            isUpdateClientPending ||
                            !dirty
                          }
                        >
                          {isCreateClientPending || isUpdateClientPending ? (
                            <SpinSvg className='me-2 text-secondary' />
                          ) : (
                            ''
                          )}
                          Save
                        </ZButton>
                      </div>
                    </>
                  )}
                </ZFormikForm>
              );
            }}
          </ZFormik>
        </div>
      </div>

      <div className='flex items-start flex-col w-full maxMd:mt-[2rem] md:mt-[7.15rem]'>
        <img
          src={productVector}
          alt='product vector'
          className='maxLg:hidden absolute bottom-0 left-0 z-1 maxMd:w-[16rem] maxXl:w-[17rem] w-[19.5rem]'
        />
        <div className='flex items-end w-full text-center'>
          <Copyright className='pb-[1.2rem] pt-[2.5rem] w-full' />
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
