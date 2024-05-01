// #region ---- Core Imports ----
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useRecoilValue } from 'recoil';
import { AxiosError } from 'axios';
import { ZClassNames } from '@/Packages/ClassNames';
import { ZDropzone } from '@/Packages/ReactDropzone';
import { ZFieldArray, ZFormik, ZFormikForm } from '@/Packages/Formik';
import { useParams } from '@tanstack/react-router';

// #endregion

// #region ---- Custom Imports ----
import ZAuthNavigation from '@/Components/Auth/Navigation';
import ZButton from '@/Components/Elements/Button';
import Copyright from '@/Components/Inpage/Copyright';
import { useZLoader, useZModal } from '@/ZHooks/ZGlobalComponents.hook';
import InvoiceFormSkeleton from '@/Components/Skeleton/Form/invoiceFromSkeleton';
import {
  useZRQCreateRequest,
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZHooks/zreactquery.hooks';
import { queryKeys } from '@/utils/constants/query';
import ZInput from '@/Components/Elements/Input';
import {
  generateInvoiceNo,
  isZNonEmptyString,
  isZNonEmptyStrings,
  replaceUrlDynamicParts,
  reportCustomError,
  showZPrompt,
  validateField,
  validateFields,
  zStringify
} from '@/utils/Helpers';
import ZSelect, { ZBtnSelect } from '@/Components/Elements/Select';
import { extractInnerData } from '@/utils/Helpers/APIS';
import {
  showErrorNotification,
  showSuccessNotification,
  showWarningNotification
} from '@/utils/Helpers/Notification';
import { messages } from '@/utils/Messages';
import { useZNavigate } from '@/ZHooks/Navigation.hook';
import { AppRoutes } from '@/Routes/AppRoutes';

// #endregion

// #region ---- Types Imports ----
import { type ZFileI } from '@/Types/Auth/index.type';
import {
  ZInvoiceTypeE,
  type ZInvoiceI,
  type ZInvoiceItemI
} from '@/Types/Auth/Invoice';
import { ZColorEnum, ZFill } from '@/utils/Enums/Elements.enum';
import {
  ApiUrlEnum,
  RouteParams,
  ZRQGetRequestExtractEnum,
  ZRQUpdaterAction
} from '@/utils/Enums/apis.enum';
import { type ZClientI } from '@/Types/Auth/Clients/index.type';
import { type ZGenericObject } from '@/Types/Global/index.type';
import { zValidationRuleE } from '@/utils/Enums/index.enum';
import {
  extractInnerDataObjectEnum,
  extractInnerDataOptionsEnum
} from '@/Types/APIs/index.type';
import { zAxiosApiRequestContentType } from '@/Types/Global/zapi-hooks.type';

// #endregion

// #region ---- Store Imports ----
import { ZCountryData } from '@/Data/Countries.data';
import { ZUserRStateAtom } from '@/Store/Auth/User';
import { ZCurrenciesData } from '@/Data/Currencies.data';

// #endregion

// #region ---- Images Imports ----
import {
  AddSvg,
  CheckSvg,
  CloseSvg,
  EditSvg,
  ImageSvg,
  SpinSvg
} from '@/assets';
import constants from '@/utils/constants';
import ENVS from '@/utils/EnvKeys';
// #endregion

// #region ---- Types Imports ----

// #endregion

const ClientSelectModal: React.FC<{
  hideModal: <A>(props?: ZGenericObject<A>) => void;
}> = ({ hideModal }) => {
  const navigate = useZNavigate();
  // #region Apis
  const { data: allRQClients, isFetching: isAllRQClientFetching } =
    useZRQGetRequest<ZClientI[]>({
      _key: [queryKeys.clients.list],
      _url: ApiUrlEnum.getClients
    });
  // #endregion

  // #region Functions

  // #endregion

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between w-full'>
        <h2 className='uppercase text-primary me-9 text-[1.5rem] lg:text-[2.25rem] font-black font-mont-heavy'>
          Select Client
        </h2>
        <CloseSvg
          className='text-primary w-[1.2rem!important] h-[1.2rem!important] cursor-pointer'
          onClick={() => {
            hideModal();
          }}
        />
      </div>

      <div className='flex flex-col items-center justify-center w-full mt-5'>
        {isAllRQClientFetching ? (
          <div className='flex flex-col items-center justify-center w-full p-5'>
            <SpinSvg className='text-primary w-[2rem!important] h-[2rem!important]' />
          </div>
        ) : allRQClients !== undefined &&
          allRQClients !== null &&
          allRQClients?.length > 0 ? (
          <ul className='w-full'>
            {allRQClients?.map((el) => {
              return (
                <li
                  className='w-full p-3 pb-4 mb-5 font-light border-b cursor-pointer hover:text-primary border-tertiary text-tertiary'
                  key={el.id}
                  onClick={() => {
                    hideModal({
                      data: el
                    });
                  }}
                >
                  {el.company}
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            <h2 className='uppercase text-center text-tertiary mt-6 text-[1.5rem] font-black font-mont-heavy'>
              No Clients
            </h2>
            <ZButton
              className='flex items-center justify-center mt-6 uppercase maxMd:w-full md:w-max'
              onClick={() => {
                hideModal();
                void navigate({
                  to: AppRoutes.authRoutes.clientSub.create.completePath
                });
              }}
            >
              Add Client
            </ZButton>
          </>
        )}
      </div>
    </div>
  );
};

const InfoEditModal: React.FC<{
  hideModal: <A>(props?: ZGenericObject<A>) => void;
  companyData?: {
    company: string;
    address: string;
    company_number: string;
    vat_number: string;
    zipcode: string | number;
    country: string;
    city: string;
  };
}> = ({ hideModal, companyData }) => {
  // const { values, handleChange, handleBlur, errors } =
  //   useZFormikContext<ZAuthI>();
  const formikInitialValues = useMemo(
    () => ({
      company: companyData?.company ?? '',
      address: companyData?.address ?? '',
      company_number: companyData?.company_number ?? '',
      vat_number: companyData?.vat_number ?? '',
      zipcode: companyData?.zipcode ?? '',
      country: companyData?.country ?? '',
      city: companyData?.city ?? ''
    }),
    [companyData]
  );
  return (
    <div className='p-10'>
      <ZFormik
        initialValues={formikInitialValues}
        validate={(values) => {
          const errors = {};
          validateFields(
            [
              'company',
              'address',
              'company_number',
              'vat_number',
              'zipcode',
              'country',
              'city'
            ],
            values,
            errors,
            [
              zValidationRuleE.string,
              zValidationRuleE.string,
              zValidationRuleE.string,
              zValidationRuleE.string,
              zValidationRuleE.string,
              zValidationRuleE.string,
              zValidationRuleE.string
            ]
          );

          return errors;
        }}
        enableReinitialize
        onSubmit={(values) => {
          hideModal(values);
        }}
      >
        {({
          isValid,
          dirty,
          values,
          touched,
          errors,
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldTouched,
          setFieldValue,
          resetForm
        }) => {
          return (
            <>
              <div className='flex items-center justify-end'>
                <CloseSvg
                  className='text-primary w-[1.2rem!important] h-[1.2rem!important] cursor-pointer'
                  onClick={() => {
                    resetForm();

                    hideModal();
                  }}
                />
              </div>
              <ZFormikForm
                onSubmit={handleSubmit}
                className='flex flex-col w-full gap-5'
              >
                {/* Company filed */}
                <ZInput
                  label='Company*'
                  name='company'
                  value={values.company}
                  touched={touched?.company}
                  errorNode={errors?.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={
                    touched.company !== undefined
                      ? touched.company && !isZNonEmptyString(errors?.company)
                      : true
                  }
                />

                {/* Address filed */}
                <ZInput
                  label='Address*'
                  name='address'
                  value={values.address}
                  touched={touched?.address}
                  errorNode={errors?.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={
                    touched.address !== undefined
                      ? touched.address && !isZNonEmptyString(errors?.address)
                      : true
                  }
                />

                {/* Country filed */}
                <ZSelect
                  label='Country*'
                  name='country'
                  isMulti={false}
                  className='w-full'
                  value={ZCountryData?.find(
                    (el) => el?.value === values?.country
                  )}
                  onBlur={(e) => {
                    void setFieldTouched('country', true);
                  }}
                  onChange={(e) => {
                    const _value = e?.value;
                    void setFieldValue('country', _value, false);
                  }}
                  isValid={
                    touched.country !== undefined
                      ? touched.country && !isZNonEmptyString(errors?.country)
                      : true
                  }
                  errorNode={errors?.country}
                  options={ZCountryData}
                />

                {/* City filed */}
                <ZInput
                  label='City*'
                  name='city'
                  value={values.city}
                  touched={touched?.city}
                  errorNode={errors?.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={
                    touched.city !== undefined
                      ? touched.city && !isZNonEmptyString(errors?.city)
                      : true
                  }
                />

                {/* Company number */}
                <ZInput
                  label='Company number*'
                  name='company_number'
                  value={values.company_number}
                  touched={touched?.company_number}
                  errorNode={errors?.company_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={
                    touched.company_number !== undefined
                      ? touched.company_number &&
                        !isZNonEmptyString(errors?.company_number)
                      : true
                  }
                />

                {/* VAT number */}
                <ZInput
                  label='VAT number*'
                  name='vat_number'
                  value={values.vat_number}
                  touched={touched?.vat_number}
                  errorNode={errors?.vat_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={
                    touched.vat_number !== undefined
                      ? touched.vat_number &&
                        !isZNonEmptyString(errors?.vat_number)
                      : true
                  }
                />

                {/* Zip Code */}
                <ZInput
                  label='Zip Code*'
                  name='zipcode'
                  value={values.zipcode}
                  touched={touched?.zipcode}
                  errorNode={errors?.zipcode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={
                    touched.zipcode !== undefined
                      ? touched.zipcode && !isZNonEmptyString(errors?.zipcode)
                      : true
                  }
                />

                {/*  */}
                <div className='flex w-full pt-3 maxSm:flex-col-reverse maxSm:gap-y-2 sm:items-center sm:justify-between'>
                  <ZButton
                    fill={ZFill.clear}
                    className='uppercase'
                    onClick={() => {
                      resetForm();

                      hideModal();
                    }}
                  >
                    Cancel
                  </ZButton>
                  <ZButton
                    type='submit'
                    className={ZClassNames({
                      'flex items-center justify-center uppercase': true,
                      'cursor-not-allowed': !dirty || !isValid
                    })}
                    disabled={!isValid || !dirty}
                  >
                    {/* {isCreateClientPending || isUpdateClientPending ? (
                  <SpinSvg className='me-2 text-secondary' />
                ) : (
                  ''
                )} */}
                    Save
                  </ZButton>
                </div>
              </ZFormikForm>
            </>
          );
        }}
      </ZFormik>
    </div>
  );
};

const InvoicesForm: React.FC = () => {
  const cuRef = useRef(null);
  // When it's edit route that we will get clientId from route params
  const { invoiceId, invoiceType } = useParams({
    from: AppRoutes.authRoutes.invoiceSub.update.completePath
  });

  // #region Recoil
  const ZUserRState = useRecoilValue(ZUserRStateAtom);
  // #endregion

  // #region Custom hooks
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const navigate = useZNavigate();
  const { showLoader, hideLoader } = useZLoader();
  // #endregion

  // #region Modals
  const { showModal: showClientSelectModal } = useZModal({
    component: ClientSelectModal,
    bgColor: ZColorEnum.tertiary,
    containerClassName:
      'w-[31.25rem!important] h-[max-content!important] max-h-[95%!important] overflow-y-auto min-h-[23rem!important]'
  });

  const { showModal: showInfoEditModal } = useZModal({
    component: InfoEditModal,
    bgColor: ZColorEnum.tertiary,
    containerClassName: 'w-[31.25rem!important] h-[max-content!important]'
  });
  // #endregion

  // #region Apis
  // If Invoice create route the below api is used to create a invoice
  const {
    mutateAsync: createInvoiceMutateAsync,
    isPending: isCreateInvoicePending
  } = useZRQCreateRequest({
    _url: ApiUrlEnum.createInvoice,
    _itemsIds: [invoiceType],
    _urlDynamicParts: [RouteParams.invoiceType]
  });

  // file upload api
  const { mutateAsync: uploadFileMutateAsync, isPending: isUploadFilePending } =
    useZRQCreateRequest({
      _url: ApiUrlEnum.uploadSingleFile,
      _contentType: zAxiosApiRequestContentType.FormData
    });

  // Invoice list apis
  const { data: allRQInvoiceLists } = useZRQGetRequest<ZInvoiceI[]>({
    _key: [queryKeys.invoice.list],
    _url: ApiUrlEnum.getInvoices,
    _itemsIds: [invoiceType],
    _urlDynamicParts: [RouteParams.invoiceType]
  });

  // If Invoice update route the below api is used to update a invoice
  const {
    mutateAsync: updateInvoiceMutateAsync,
    isPending: isUpdateInvoicePending
  } = useZRQUpdateRequest({
    _url: ApiUrlEnum.updateInvoice
  });

  // If this is a update invoice route then invoiceId will be received from params though that invoice data will fetch below
  const {
    data: selectedInvoiceData,
    isFetching: isSelectedInvoiceDataFetching,
    error: selectedInvoiceError
  } = useZRQGetRequest<ZInvoiceI>({
    _url: ApiUrlEnum.viewInvoice,
    _itemsIds: [invoiceType, invoiceId],
    _urlDynamicParts: [RouteParams.invoiceType, RouteParams.invoiceId],
    _key:
      invoiceType === ZInvoiceTypeE.inv
        ? [queryKeys.invoice.get, invoiceId]
        : invoiceType === ZInvoiceTypeE.exp
          ? [queryKeys.expense.get, invoiceId]
          : [],
    _shouldFetchWhenIdPassed: !isZNonEmptyString(invoiceId),
    _extractType: ZRQGetRequestExtractEnum.extractItem
  });

  // If this is a update invoice route this api is used to delete invoice api
  const { mutateAsync: deleteInvoiceAsyncMutate } = useZRQDeleteRequest({
    _url: ApiUrlEnum.deleteInvoice
  });

  // #endregion
  const formikInitialValues: ZInvoiceI = useMemo(
    () => ({
      user: {
        company:
          selectedInvoiceData?.user?.company ?? ZUserRState?.company ?? '',
        address:
          selectedInvoiceData?.user?.address ?? ZUserRState?.address ?? '',
        company_number:
          selectedInvoiceData?.user?.company_number ??
          ZUserRState?.company_registration_number ??
          '',
        vat_number:
          selectedInvoiceData?.user?.vat_number ??
          ZUserRState?.vat_number ??
          '',
        zipcode:
          selectedInvoiceData?.user?.zipcode ?? ZUserRState?.zipcode ?? 0,
        country:
          selectedInvoiceData?.user?.country ?? ZUserRState?.country ?? '',
        city: selectedInvoiceData?.user?.city ?? ZUserRState?.city ?? ''
      },
      invoice_no: selectedInvoiceData?.invoice_no ?? '',
      invoice_logo: {
        path:
          selectedInvoiceData?.invoice_logo?.path ??
          ZUserRState?.logo?.path ??
          '',
        url:
          selectedInvoiceData?.invoice_logo?.url ?? ZUserRState?.logo?.url ?? ''
      },
      invoice_logo_file: null,
      client: selectedInvoiceData?.client ?? null,
      date: selectedInvoiceData?.date ?? '',
      due_date: selectedInvoiceData?.due_date ?? '',
      items: selectedInvoiceData?.items ?? [],
      is_invoice_vat_applied:
        Boolean(selectedInvoiceData?.is_invoice_vat_applied) ?? false,
      vat_value: selectedInvoiceData?.vat_value ?? 0,
      invoice_notes:
        selectedInvoiceData?.invoice_notes ?? ZUserRState?.note ?? '',
      invoice_bank_details:
        selectedInvoiceData?.invoice_bank_details ??
        ZUserRState?.bank_details ??
        '',
      selected_currency:
        selectedInvoiceData?.selected_currency ??
        ZUserRState?.default_currency ??
        null,
      invoice_no_edit_mode: false
    }),
    [ZUserRState, selectedInvoiceData]
  );

  // #region Functions
  const calculateTotal = useCallback(
    (items?: ZInvoiceItemI[] | null, isVatEnable = false, vatValue = 0) => {
      let subTotal = 0;
      if (Array.isArray(items) && items?.length > 0) {
        subTotal = items.reduce((acc, item) => {
          return acc + Number(item.amount);
        }, 0);
      }
      if (isVatEnable) {
        const vatAmount = (subTotal * Number(vatValue)) / 100;
        return subTotal + vatAmount;
      }
      return subTotal;
    },
    []
  );

  const invoiceHandler = useCallback(
    async (value: string) => {
      try {
        let _response;

        if (isZNonEmptyString(invoiceId)) {
          _response = await updateInvoiceMutateAsync({
            requestData: value,
            itemIds: [invoiceType, invoiceId],
            urlDynamicParts: [RouteParams.invoiceType, RouteParams.invoiceId]
          });
        } else {
          _response = await createInvoiceMutateAsync(value);
        }

        if (_response !== undefined && _response !== null) {
          const _data = extractInnerData<ZInvoiceI>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (isZNonEmptyString(_data?.id)) {
            await updateRQCDataHandler({
              key:
                invoiceType === ZInvoiceTypeE.inv
                  ? [queryKeys.invoice.list]
                  : invoiceType === ZInvoiceTypeE.exp
                    ? [queryKeys.expense.list]
                    : [],
              data: _data,
              id: invoiceId,
              updaterAction: isZNonEmptyString(invoiceId)
                ? ZRQUpdaterAction.replace
                : ZRQUpdaterAction.add
            });

            if (isZNonEmptyString(invoiceId)) {
              await updateRQCDataHandler({
                key:
                  invoiceType === ZInvoiceTypeE.inv
                    ? [queryKeys.invoice.get, invoiceId]
                    : invoiceType === ZInvoiceTypeE.exp
                      ? [queryKeys.expense.get, invoiceId]
                      : [],
                data: _data,
                updaterAction: ZRQUpdaterAction.updateHole,
                extractType: ZRQGetRequestExtractEnum.extractItem
              });
              showSuccessNotification(
                invoiceType === ZInvoiceTypeE.inv
                  ? messages.invoice.update
                  : invoiceType === ZInvoiceTypeE.exp
                    ? messages.expense.update
                    : ''
              );
            } else {
              showSuccessNotification(
                invoiceType === ZInvoiceTypeE.inv
                  ? messages.invoice.added
                  : invoiceType === ZInvoiceTypeE.exp
                    ? messages.expense.added
                    : ''
              );

              // Redirect to edit page
              void navigate({
                to: AppRoutes.authRoutes.invoiceSub.update.completePath,
                params: {
                  invoiceType,
                  invoiceId: _data?.id ?? ''
                }
              });
            }
          }
        }
      } catch (error) {}
      // eslint-disable-next-line
    },
    // eslint-disable-next-line
    [invoiceId, invoiceType]
  );

  const UploadFileHandler = useCallback(
    async (
      value: FormData
    ): Promise<{
      url: string;
      path: string;
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
              url: _data?.fileUrl,
              path: _data?.filePath
            };
          }
        }

        return {
          url: '',
          path: ''
        };
      } catch (error) {
        reportCustomError(error);
        return {
          url: '',
          path: ''
        };
      }
    },
    // eslint-disable-next-line
    []
  );

  const fromikSubmitHandler = useCallback(
    async (values: ZInvoiceI): Promise<void> => {
      try {
        let formData = null;
        let _path = values?.invoice_logo?.path;
        let _url = values?.invoice_logo?.url;
        if (
          values.invoice_logo_file !== null &&
          values.invoice_logo_file !== undefined
        ) {
          formData = new FormData();
          formData.append('file', values.invoice_logo_file);
          // console.log({
          //   c1: isZNonEmptyString(invoiceId),
          //   c2: values?.should_delete_old_file,
          //   c3: typeof selectedInvoiceData?.invoice_logo === 'object',
          //   c4: isZNonEmptyString(selectedInvoiceData?.invoice_logo?.path),
          //   c5: selectedInvoiceData
          // });
          // if (
          //   isZNonEmptyString(invoiceId) &&
          //   values?.should_delete_old_file &&
          //   typeof selectedInvoiceData?.invoice_logo === 'object' &&
          //   isZNonEmptyString(selectedInvoiceData?.invoice_logo?.path)
          // ) {
          //   const oldFileDetail = zStringify({
          //     should_delete_old_file: values?.should_delete_old_file,
          //     old_file_path: selectedInvoiceData?.invoice_logo?.path
          //   });
          //   formData?.append('old_file_detail', oldFileDetail);
          // }
          const { path, url } = await UploadFileHandler(formData);
          _path = path;
          _url = url;
        }

        const zStringifyData = zStringify({
          client_unique_id: values?.client?.id,
          invoice_no: values?.invoice_no,
          date: values.date,
          due_date: values.due_date,
          vat_value: values.vat_value,
          is_invoice_vat_applied: values.is_invoice_vat_applied,
          items: zStringify(values.items),
          invoice_notes: values.invoice_notes,
          invoice_bank_details: values.invoice_bank_details,
          selected_currency: zStringify(values.selected_currency),
          user: zStringify({
            company: values?.user?.company,
            address: values?.user?.address,
            company_number: values?.user?.company_number,
            vat_number: values?.user?.vat_number,
            zipcode: values?.user?.zipcode,
            country: values?.user?.country,
            city: values?.user?.city
          }),
          invoice_logo: zStringify({
            path: _path,
            url: _url
          }),
          sub_total: calculateTotal(values?.items),
          total: calculateTotal(
            values?.items,
            values?.is_invoice_vat_applied,
            values?.vat_value
          )
        });
        void invoiceHandler(zStringifyData);
      } catch (error) {
        reportCustomError(error);
      }
    },
    // eslint-disable-next-line
    [invoiceId, invoiceType]
  );

  const deleteInvoiceHandler = async (): Promise<void> => {
    try {
      if (isZNonEmptyString(invoiceId)) {
        showLoader(
          invoiceType === ZInvoiceTypeE.inv
            ? messages.invoice.deletingLoader
            : invoiceType === ZInvoiceTypeE.exp
              ? messages.expense.deletingLoader
              : ''
        );
        const _response = await deleteInvoiceAsyncMutate({
          itemIds: [invoiceType, invoiceId ?? ''],
          urlDynamicParts: [RouteParams.invoiceType, RouteParams.invoiceId]
        });

        if (_response !== undefined && _response !== null) {
          const _data = extractInnerData<{ success: boolean }>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data?.success === true) {
            await updateRQCDataHandler({
              id: invoiceId,
              key:
                invoiceType === ZInvoiceTypeE.inv
                  ? [queryKeys.invoice.list]
                  : invoiceType === ZInvoiceTypeE.exp
                    ? [queryKeys.expense.list]
                    : [],
              updaterAction: ZRQUpdaterAction.delete
            });

            hideLoader();
            showSuccessNotification(
              invoiceType === ZInvoiceTypeE.inv
                ? messages.invoice.deleted
                : invoiceType === ZInvoiceTypeE.exp
                  ? messages.expense.deleted
                  : ''
            );

            void navigate({
              to: AppRoutes.authRoutes.invoices,
              params: {
                invoiceType
              }
            });
          }
        }
      }
    } catch (error) {
      hideLoader();
      reportCustomError(error);
    }
  };

  // #endregion

  // #region useEffect
  useEffect(() => {
    if (selectedInvoiceError !== undefined && selectedInvoiceError !== null) {
      if (selectedInvoiceError instanceof AxiosError) {
        const _errorResponse = selectedInvoiceError?.response?.data;

        if (_errorResponse !== undefined && _errorResponse !== null) {
          const _errors = extractInnerData<string[]>(
            _errorResponse,
            extractInnerDataOptionsEnum.createRequestResponseItem,
            extractInnerDataObjectEnum.error
          );
          if (_errors !== undefined && isZNonEmptyString(_errors[0])) {
            showErrorNotification(_errors[0]);

            void navigate({
              to: AppRoutes.authRoutes.invoices,
              params: {
                invoiceType
              }
            });
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [selectedInvoiceError]);
  // #endregion

  return (
    <div className='relative flex flex-col items-center justify-between w-full min-h-screen overflow-x-hidden gap-y-12 max-h-max bg-pearl-mist'>
      <div className='w-full'>
        <div className='w-full py-3 bg-secondary lg:pe-8 maxLg:px-2'>
          <div className='max-w-[85.4rem] w-full mx-auto'>
            <ZAuthNavigation />
          </div>
        </div>

        <ZFormik
          initialValues={formikInitialValues}
          enableReinitialize
          validate={(values) => {
            const errors: { client?: string } = {};

            if (!isZNonEmptyString(values?.client?.id)) {
              errors.client = 'Please select a client.';
            }

            validateField(
              'invoice_no',
              values as Record<string, unknown>,
              errors
            );

            return errors;
          }}
          onSubmit={async (values) => {
            await fromikSubmitHandler(values);
          }}
        >
          {({
            values,
            isValid,
            dirty,
            errors,
            touched,
            setFieldValue,
            handleBlur,
            handleChange,
            setErrors,
            setFieldTouched
          }) => {
            return (
              <ZFormikForm className='max-w-[64.5625rem] w-full mx-auto maxLg:px-2'>
                {isZNonEmptyString(invoiceId) &&
                isSelectedInvoiceDataFetching ? (
                  <InvoiceFormSkeleton />
                ) : (
                  <div>
                    <div className='flex items-center w-full py-5 maxMd:flex-col md:flex-row maxMd:gap-y-3 md:gap-y-0'>
                      <div className='flex items-center md:w-2/3 maxMd:w-full maxMd:flex-col maxMd:gap-y-3 md:gap-y-0 md:flex-row'>
                        <h2 className='uppercase text-primary me-9 text-[1.5rem] lg:text-[2.25rem] font-black font-mont-heavy'>
                          {isZNonEmptyString(invoiceId) ? 'Update' : 'Create'}{' '}
                          {invoiceType === ZInvoiceTypeE.inv
                            ? 'Invoice'
                            : invoiceType === ZInvoiceTypeE.exp
                              ? 'Expense'
                              : ''}
                        </h2>
                        <ZBtnSelect
                          name='selected_currency'
                          onChange={(e) => {
                            void setFieldValue('selected_currency', e, false);
                          }}
                          value={{
                            label: values?.selected_currency?.value,
                            value: values?.selected_currency?.value,
                            symbol: values?.selected_currency?.symbol
                          }}
                          options={
                            ZCurrenciesData?.length > 0
                              ? ZCurrenciesData.map((el) => {
                                  return {
                                    value: el.value,
                                    label: el.value,
                                    symbol: el.symbol
                                  };
                                })
                              : []
                          }
                        />
                      </div>

                      <div className='flex items-center maxMd:flex-col-reverse md:w-1/3 maxMd:w-full md:justify-end'>
                        {isZNonEmptyString(invoiceId) ? (
                          <>
                            <ZButton
                              fill={ZFill.clear}
                              color={ZColorEnum.danger}
                              className={ZClassNames({
                                'flex items-center justify-center uppercase me-2 maxMd:w-full md:w-max':
                                  true,
                                'cursor-not-allowed':
                                  isCreateInvoicePending ||
                                  isUpdateInvoicePending ||
                                  isUploadFilePending
                              })}
                              disabled={
                                isCreateInvoicePending ||
                                isUpdateInvoicePending ||
                                isUploadFilePending
                              }
                              onClick={() => {
                                if (
                                  !isCreateInvoicePending &&
                                  !isUpdateInvoicePending &&
                                  !isUploadFilePending
                                ) {
                                  void (async () => {
                                    const { value } = await showZPrompt({
                                      title:
                                        invoiceType === ZInvoiceTypeE.inv
                                          ? messages.invoice.confirmDialog.title
                                          : invoiceType === ZInvoiceTypeE.exp
                                            ? messages.expense.confirmDialog
                                                .title
                                            : '',
                                      message:
                                        invoiceType === ZInvoiceTypeE.inv
                                          ? messages.invoice.confirmDialog
                                              .messages
                                          : invoiceType === ZInvoiceTypeE.exp
                                            ? messages.expense.confirmDialog
                                                .messages
                                            : ''
                                    });

                                    if (isZNonEmptyString(value)) {
                                      if (
                                        value?.toLowerCase() ===
                                        constants.deleteConfirmWords.global?.toLowerCase()
                                      ) {
                                        void deleteInvoiceHandler();
                                      } else {
                                        showWarningNotification(
                                          messages?.auth?.confirmNotMatch
                                        );
                                      }
                                    }
                                  })();
                                }
                              }}
                            >
                              delete
                            </ZButton>

                            <ZButton
                              fill={ZFill.outline}
                              onClick={() => {
                                const url = replaceUrlDynamicParts({
                                  url: `${ENVS.backendUrl}${ApiUrlEnum.downloadInvoice}`,
                                  urlDynamicParts: [
                                    RouteParams.invoiceType,
                                    RouteParams.invoiceId
                                  ],
                                  itemsId: [invoiceType, invoiceId]
                                });
                                window.open(url);
                              }}
                              className={ZClassNames({
                                'flex items-center me-2 justify-center uppercase maxMd:w-full md:w-max py-[.35rem!important]':
                                  true,
                                'cursor-not-allowed':
                                  !isValid ||
                                  isCreateInvoicePending ||
                                  isUpdateInvoicePending ||
                                  isUploadFilePending ||
                                  dirty
                              })}
                              disabled={
                                !isValid ||
                                isCreateInvoicePending ||
                                isUpdateInvoicePending ||
                                isUploadFilePending ||
                                dirty
                              }
                            >
                              {/* {isCreateInvoicePending ||
                              isUpdateInvoicePending ||
                              isUploadFilePending ? (
                                <SpinSvg className='me-2 text-secondary' />
                              ) : (
                                ''
                              )} */}
                              Download
                            </ZButton>
                          </>
                        ) : null}

                        <ZButton
                          type='submit'
                          className={ZClassNames({
                            'flex items-center justify-center uppercase maxMd:w-full md:w-max':
                              true,
                            'cursor-not-allowed':
                              !isValid ||
                              isCreateInvoicePending ||
                              isUpdateInvoicePending ||
                              isUploadFilePending ||
                              !dirty
                          })}
                          disabled={
                            !isValid ||
                            isCreateInvoicePending ||
                            isUpdateInvoicePending ||
                            isUploadFilePending ||
                            !dirty
                          }
                        >
                          {isCreateInvoicePending ||
                          isUpdateInvoicePending ||
                          isUploadFilePending ? (
                            <SpinSvg className='me-2 text-secondary' />
                          ) : (
                            ''
                          )}
                          Save
                        </ZButton>
                      </div>
                    </div>

                    <div className='w-full' ref={cuRef}>
                      <div className='w-full px-5 pt-6 pb-4 bg-white rounded-[0.625rem] shadow-[0_0.625rem_0.625rem_#0000001a]'>
                        <div className='flex w-full'>
                          <div className='w-1/2'>
                            <div className='flex items-start justify-between w-full'>
                              <div className='w-full'>
                                <span className='block font-medium text-[.95rem] font-roboto-regular'>
                                  {values?.user?.company}
                                </span>
                                <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                                  {values?.user?.address}
                                </span>
                                {typeof values?.user === 'object' &&
                                isZNonEmptyStrings([
                                  values?.user?.city,
                                  values?.user?.country
                                ]) ? (
                                  <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                                    {values?.user?.city},{' '}
                                    {values?.user?.country}
                                  </span>
                                ) : null}
                                <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                                  {values?.user?.country}
                                </span>
                                <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                                  Company Number: {values?.user?.company_number}
                                </span>
                                <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                                  VAT Number: {values?.user?.vat_number}
                                </span>
                              </div>

                              <div className=''>
                                <EditSvg
                                  className='text-primary w-[1.5rem!important] h-[1.5rem!important] cursor-pointer'
                                  onClick={() => {
                                    showInfoEditModal({
                                      componentProps: {
                                        companyData: {
                                          company: values?.user?.company,
                                          address: values?.user?.address,
                                          company_number:
                                            values?.user?.company_number,
                                          vat_number: values?.user?.vat_number,
                                          zipcode: values?.user?.zipcode,
                                          country: values?.user?.country,
                                          city: values?.user?.city
                                        }
                                      },
                                      onDidDismiss: (props) => {
                                        const _data = props as {
                                          company: string;
                                          address: string;
                                          company_number: string;
                                          vat_number: string;
                                          zipcode: string | number;
                                          country: string;
                                          city: string;
                                        };
                                        if (isZNonEmptyString(_data?.company)) {
                                          void setFieldValue(
                                            'user',
                                            {
                                              company: _data?.company,
                                              address: _data?.address,
                                              company_number:
                                                _data?.company_number,
                                              vat_number: _data?.vat_number,
                                              zipcode: _data?.zipcode,
                                              country: _data?.country,
                                              city: _data?.city
                                            },
                                            false
                                          );
                                        }
                                      }
                                    });
                                  }}
                                />
                              </div>
                            </div>

                            <div className='mt-[3rem]'>
                              <div className='block text-[#b9c6db] font-medium text-[.95rem] font-roboto-regular'>
                                Bill To:
                              </div>
                              <div
                                className='w-full border cursor-pointer border-[#a4a8b7] border-dashed rounded-lg min-h-[3.28rem] flex items-center'
                                onClick={() => {
                                  showClientSelectModal({
                                    onDidDismiss: (props) => {
                                      void (async () => {
                                        await setFieldTouched('client', true);
                                        const _data = (
                                          props as unknown as {
                                            data?: ZClientI;
                                          }
                                        )?.data;
                                        if (
                                          _data !== undefined &&
                                          _data !== null &&
                                          typeof _data === 'object'
                                        ) {
                                          await setFieldValue(
                                            'client',
                                            _data,
                                            false
                                          );

                                          await setFieldValue(
                                            'invoice_notes',
                                            _data?.notes,
                                            false
                                          );

                                          void setFieldValue(
                                            'selected_currency',
                                            _data?.default_currency,
                                            false
                                          );

                                          setErrors({});

                                          // only in it's creating
                                          if (!isZNonEmptyString(invoiceId)) {
                                            const invoiceLength =
                                              (allRQInvoiceLists?.length ?? 0) +
                                              1;
                                            const invoiceNumber =
                                              generateInvoiceNo(
                                                invoiceType as ZInvoiceTypeE,
                                                _data?.company,
                                                String(invoiceLength).padStart(
                                                  2,
                                                  '0'
                                                )
                                              );
                                            await setFieldValue(
                                              'invoice_no',
                                              invoiceNumber,
                                              false
                                            );
                                          }
                                        }
                                      })();
                                    }
                                  });
                                }}
                              >
                                {values?.client !== null ? (
                                  <div className='w-full block ms-8 font-medium my-4 text-[.95rem] font-roboto-regular'>
                                    <span className='block font-medium text-[.95rem] font-roboto-regular'>
                                      {values?.client?.company}
                                    </span>
                                    <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                                      {values?.client?.address}
                                    </span>
                                    <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                                      {values?.client?.city},{' '}
                                      {values?.client?.country}
                                    </span>
                                    <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                                      {values?.client?.country}
                                    </span>
                                    <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                                      Company Number:{' '}
                                      {
                                        values?.client
                                          ?.company_registration_number
                                      }
                                    </span>
                                    <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                                      VAT Number: {values?.client?.vat_number}
                                    </span>
                                  </div>
                                ) : (
                                  <span className='block ms-8 font-medium mt-1 text-[.95rem] font-roboto-regular'>
                                    Add Client*
                                  </span>
                                )}
                              </div>
                              {touched?.client === true &&
                              isZNonEmptyString(errors?.client) ? (
                                <span className='text-[0.75rem] ps-4 leading-[1rem] tracking-[0.4px] font-medium font-roboto-regular text-danger'>
                                  {errors?.client}
                                </span>
                              ) : null}
                            </div>
                          </div>

                          {/*  */}
                          <div className='flex flex-col items-end w-1/2'>
                            <ZDropzone
                              onDrop={(acceptedFiles) => {
                                void (async () => {
                                  if (
                                    acceptedFiles !== undefined &&
                                    acceptedFiles !== null
                                  ) {
                                    await setFieldValue(
                                      'invoice_logo_file',
                                      acceptedFiles[0],
                                      false
                                    );

                                    //
                                    const url = URL.createObjectURL(
                                      acceptedFiles[0]
                                    );

                                    if (isZNonEmptyString(url)) {
                                      await setFieldValue(
                                        'invoice_logo',
                                        {
                                          url
                                        },
                                        false
                                      );
                                    }
                                  }
                                })();
                              }}
                            >
                              {({ getRootProps, getInputProps }) => {
                                return (
                                  <div
                                    className='w-[12.5rem] h-[12.5rem] cursor-pointer'
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />
                                    {isZNonEmptyString(
                                      values?.invoice_logo?.url
                                    ) ? (
                                      <div
                                        style={{
                                          backgroundImage: `url(${values?.invoice_logo?.url})`
                                        }}
                                        className='object-cover w-full h-full bg-center bg-no-repeat bg-contain'
                                      ></div>
                                    ) : (
                                      <div className='flex flex-col items-center justify-center w-full h-full gap-2 border bg-light'>
                                        <ImageSvg className='text-primary w-[2rem!important] h-[2rem!important]' />
                                        <span>Add image</span>
                                      </div>
                                    )}
                                  </div>
                                );
                              }}
                            </ZDropzone>

                            <h3 className='text-[3rem] font-normal font-roboto-regular text-[#3c445f]'>
                              {invoiceType === ZInvoiceTypeE.inv
                                ? 'Invoice'
                                : invoiceType === ZInvoiceTypeE.exp
                                  ? 'Expense'
                                  : ''}
                            </h3>
                            <div className='flex items-center justify-end w-full'>
                              <span className='me-2 text-[#b9c6db] font-medium mt-1 font-roboto-regular'>
                                Invoice no:
                              </span>
                              {values.invoice_no_edit_mode === true ? (
                                <span>
                                  <div className='flex items-center w-full'>
                                    <input
                                      name='invoice_no'
                                      className='w-[10rem] h-[2rem] px-1 bg-light border border-light text-dark text-sm rounded-md  block outline-none'
                                      value={values?.invoice_no}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                    <CheckSvg
                                      className={ZClassNames({
                                        'ms-1 text-primary w-[1.5rem!important] h-[1.5rem!important]':
                                          true,
                                        'cursor-pointer': !isZNonEmptyString(
                                          errors?.invoice_no
                                        ),
                                        'opacity-65 cursor-not-allowed':
                                          isZNonEmptyString(errors?.invoice_no)
                                      })}
                                      onClick={() => {
                                        if (
                                          isZNonEmptyString(
                                            values?.invoice_no
                                          ) &&
                                          !isZNonEmptyString(errors?.invoice_no)
                                        ) {
                                          void setFieldValue(
                                            'invoice_no_edit_mode',
                                            false,
                                            false
                                          );
                                        }
                                      }}
                                    />
                                  </div>
                                  {touched?.invoice_no === true &&
                                  isZNonEmptyString(errors?.invoice_no) ? (
                                    <span className='text-[0.75rem] ps-4 leading-[1rem] tracking-[0.4px] font-medium font-roboto-regular text-danger'>
                                      {errors?.invoice_no}
                                    </span>
                                  ) : null}
                                </span>
                              ) : (
                                <span
                                  className='cursor-pointer'
                                  onClick={() => {
                                    void setFieldValue(
                                      'invoice_no_edit_mode',
                                      true,
                                      false
                                    );
                                  }}
                                >
                                  {isZNonEmptyString(values.invoice_no)
                                    ? values?.invoice_no
                                    : '############'}
                                </span>
                              )}
                            </div>
                            <div className='flex items-center justify-end w-full'>
                              <span className='me-2 text-[#b9c6db] font-medium pt-2 font-roboto-regular'>
                                Date:
                              </span>

                              <div className='relative max-w-sm mt-2 font-normal font-roboto-regular'>
                                <input
                                  type='date'
                                  className='border-dashed border border-[#d2ddec] rounded-[.25rem] p-[.125rem_.5rem] text-[.8125rem] w-[8.2rem]'
                                  placeholder='Select date'
                                  name='date'
                                  value={values.date}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className='flex items-center justify-end w-full'>
                              <span className='me-2 text-[#b9c6db] font-medium pt-2 font-roboto-regular'>
                                Due Date:
                              </span>

                              <div className='relative max-w-sm mt-2 font-normal font-roboto-regular'>
                                <input
                                  type='date'
                                  className='border-dashed border border-[#d2ddec] rounded-[.25rem] p-[.125rem_.5rem] text-[.8125rem] w-[8.2rem]'
                                  placeholder='Select date'
                                  name='due_date'
                                  value={values.due_date}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='w-full'>
                          <table className='table w-full my-4'>
                            <thead className='bg-[#f4f4f4] w-full'>
                              <tr className='w-full'>
                                <th className='p-4 text-left bg-transparent border-t-0'>
                                  <span className='text-[#3c445f] text-[.625rem] uppercase font-normal tracking-[-.02em]'>
                                    Item &amp; Description
                                  </span>
                                </th>

                                <th className='p-4 text-left bg-transparent border-t-0'>
                                  <span className='text-[#3c445f] text-left text-[.625rem] uppercase font-normal tracking-[-.02em]'>
                                    Quantity
                                  </span>
                                </th>

                                <th className='p-4 text-left bg-transparent border-t-0'>
                                  <span className='text-[#3c445f] text-left text-[.625rem] uppercase font-normal tracking-[-.02em]'>
                                    Rate
                                  </span>
                                </th>

                                <th className='p-4 text-left bg-transparent border-t-0'>
                                  <span className='text-[#3c445f] text-left text-[.625rem] uppercase font-normal tracking-[-.02em]'>
                                    Amount
                                  </span>
                                </th>

                                <th className='p-4 bg-transparent border-t-0'>
                                  <span className='text-[#3c445f] text-[.625rem] uppercase font-normal tracking-[-.02em]'></span>
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              <ZFieldArray name='items'>
                                {({ push, remove }) => {
                                  return (
                                    <>
                                      {values.items?.map((el, index) => {
                                        return (
                                          <tr
                                            className='w-full border-t border-[#edf2f9]'
                                            key={index}
                                          >
                                            <td className='w-1/2'>
                                              <input
                                                type='text'
                                                className='border-dashed border outline-none font-normal border-[#d2ddec] rounded-[.25rem] p-[.125rem_.5rem] text-[.8125rem] w-full'
                                                name={`items.${index}.description`}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={
                                                  values.items !== undefined &&
                                                  values.items !== null
                                                    ? values.items[index]
                                                        ?.description
                                                    : ''
                                                }
                                              />
                                            </td>

                                            <td className='p-4 text-left bg-transparent border-t-0'>
                                              <input
                                                type='number'
                                                className='border-dashed border outline-none font-normal border-[#d2ddec] rounded-[.25rem] p-[.125rem_.5rem] text-[.8125rem] w-full'
                                                placeholder='0'
                                                name={`items.${index}.quantity`}
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                  handleChange(e);
                                                  if (
                                                    values.items !==
                                                      undefined &&
                                                    values.items !== null
                                                  ) {
                                                    // Quantity
                                                    const _value = Number(
                                                      e?.target?.value
                                                    );

                                                    // Rate
                                                    const _rate =
                                                      Number(
                                                        values.items[index]
                                                          ?.rate
                                                      ) ?? 0;

                                                    // Amount
                                                    const _amount =
                                                      _value * _rate;

                                                    void setFieldValue(
                                                      `items.${index}.amount`,
                                                      _amount,
                                                      false
                                                    );
                                                  }
                                                }}
                                                value={
                                                  values.items !== undefined &&
                                                  values.items !== null
                                                    ? values.items[index]
                                                        ?.quantity
                                                    : ''
                                                }
                                              />
                                            </td>

                                            <td className='p-4 text-left bg-transparent border-t-0'>
                                              <input
                                                type='number'
                                                className='border-dashed border outline-none font-normal border-[#d2ddec] rounded-[.25rem] p-[.125rem_.5rem] text-[.8125rem] w-full'
                                                placeholder='0'
                                                name={`items.${index}.rate`}
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                  handleChange(e);
                                                  if (
                                                    values.items !==
                                                      undefined &&
                                                    values.items !== null
                                                  ) {
                                                    // Rate
                                                    const _value = Number(
                                                      e?.target?.value
                                                    );

                                                    // Quantity
                                                    const _rate =
                                                      Number(
                                                        values.items[index]
                                                          ?.quantity
                                                      ) ?? 0;

                                                    // Amount
                                                    const _amount =
                                                      _value * _rate;

                                                    void setFieldValue(
                                                      `items.${index}.amount`,
                                                      _amount,
                                                      false
                                                    );
                                                  }
                                                }}
                                                value={
                                                  values.items !== undefined &&
                                                  values.items !== null
                                                    ? values.items[index]?.rate
                                                    : ''
                                                }
                                              />
                                            </td>
                                            <td className='py-4 font-normal text-right bg-transparent font-roboto-light text-[.825rem] overflow-hidden text-ellipsis border-t-0 max-w-[8.6875rem]'>
                                              <div className='font-roboto-light text-[.825rem] h-full'>
                                                {
                                                  values?.selected_currency
                                                    ?.symbol
                                                }{' '}
                                                {el?.amount}
                                              </div>
                                            </td>
                                            <td className='flex items-center justify-end p-4 bg-transparent border-t-0'>
                                              <ZButton
                                                className='rounded-full p-[.75rem!important] flex items-center justify-center'
                                                color={ZColorEnum.danger}
                                                onClick={() => {
                                                  remove(index);
                                                }}
                                              >
                                                <CloseSvg className='w-[1rem!important] h-[1rem!important]' />
                                              </ZButton>
                                            </td>
                                          </tr>
                                        );
                                      })}

                                      {/*  */}
                                      <tr className='w-full border-t border-[#edf2f9]'>
                                        <td className='p-4 text-left bg-transparent border-t-0'>
                                          <div
                                            className='flex items-center gap-2 cursor-pointer w-max'
                                            onClick={() => {
                                              push({
                                                description: '',
                                                quantity: 1,
                                                rate: 0,
                                                amount: 0
                                              });
                                            }}
                                          >
                                            <div className='w-[2.4375rem] h-[2.4375rem] flex items-center justify-center rounded-full bg-primary'>
                                              <AddSvg className='text-white w-[1rem!important] h-[1rem!important]' />
                                            </div>
                                            <span className='font-normal font-roboto-regular text-primary text-[.9375rem] pt-1 ps-1'>
                                              Add a line item
                                            </span>
                                          </div>
                                        </td>

                                        <td className='p-4 text-left bg-transparent border-t-0'></td>
                                        <td className='p-4 text-left bg-transparent border-t-0'></td>
                                        <td className='p-4 text-left bg-transparent border-t-0'></td>
                                        <td className='p-4 text-left bg-transparent border-t-0'></td>
                                      </tr>
                                    </>
                                  );
                                }}
                              </ZFieldArray>

                              <tr className='w-full border-t border-[#edf2f9]'>
                                <td
                                  className='p-4 text-right bg-transparent border-t-0'
                                  colSpan={2}
                                >
                                  <span className='font-bold text-[1.01rem] font-roboto-black text-gray-900 ms-2 dark:text-gray-300'>
                                    Subtotal
                                  </span>
                                </td>

                                <td
                                  className='p-4 text-right bg-transparent border-t-0'
                                  colSpan={3}
                                >
                                  <span className='font-normal text-[1.01rem] font-roboto-regular text-gray-900 ms-2 dark:text-gray-300'>
                                    <span className='me-1'>
                                      {values?.selected_currency?.symbol}
                                    </span>
                                    {calculateTotal(values.items)}
                                  </span>
                                </td>
                              </tr>

                              <tr className='w-full border-t border-[#edf2f9]'>
                                <td
                                  className='p-4 text-left bg-transparent border-t-0'
                                  colSpan={2}
                                >
                                  <div className='flex items-center justify-end'>
                                    <input
                                      id='vat-checkbox'
                                      type='checkbox'
                                      name='is_invoice_vat_applied'
                                      onChange={({ target }) => {
                                        void setFieldValue(
                                          'is_invoice_vat_applied',
                                          target?.checked,
                                          false
                                        );
                                      }}
                                      onBlur={handleBlur}
                                      checked={values.is_invoice_vat_applied}
                                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                    />
                                    <label
                                      htmlFor='vat-checkbox'
                                      className='text-sm font-bold text-[1.01rem] font-roboto-black text-gray-900 ms-2 dark:text-gray-300'
                                    >
                                      VAT (%)
                                    </label>
                                  </div>
                                </td>

                                <td
                                  className='p-4 text-left bg-transparent border-t-0'
                                  colSpan={3}
                                >
                                  <input
                                    type='number'
                                    disabled={
                                      values?.is_invoice_vat_applied === false
                                    }
                                    className={ZClassNames({
                                      'border-dashed border outline-none font-normal border-[#d2ddec] rounded-[.25rem] p-[.125rem_.5rem] text-[.8125rem] w-full':
                                        true,
                                      'bg-[#d3d3d3]':
                                        values?.is_invoice_vat_applied === false
                                    })}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='vat_value'
                                    value={values.vat_value}
                                    placeholder='0'
                                  />
                                </td>
                              </tr>

                              <tr className='w-full border-t border-[#edf2f9]'>
                                <td
                                  className='p-4 text-right bg-transparent border-t-0'
                                  colSpan={2}
                                >
                                  <span className='font-bold text-[1.01rem] font-roboto-black text-gray-900 ms-2 dark:text-gray-300'>
                                    TOTAL (
                                    <span>
                                      {values?.selected_currency?.symbol}
                                    </span>
                                    )
                                  </span>
                                </td>

                                <td
                                  className='p-4 text-end bg-transparent border-t-0 border-b border-[#edf2f9]'
                                  colSpan={3}
                                >
                                  <span className='font-normal text-[1.01rem] font-roboto-regular text-gray-900 ms-2 dark:text-gray-300'>
                                    <span className='me-1'>
                                      {values?.selected_currency?.symbol}
                                    </span>
                                    {calculateTotal(
                                      values.items,
                                      values?.is_invoice_vat_applied,
                                      values.vat_value
                                    )}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className='w-full border-t border-[#edf2f9] mt-9'></div>

                          <div className='mt-5'>
                            <label
                              htmlFor='notes'
                              className='block text-sm font-medium uppercase mt-1 text-[1.02rem] font-roboto-regular'
                            >
                              Notes
                            </label>
                            <textarea
                              id='notes'
                              value={values?.invoice_notes}
                              name='invoice_notes'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              rows={2}
                              className='border-dashed border border-[#d2ddec] rounded-[.25rem] block p-2.5 w-full text-sm text-gray-900 focus:border-[#2c7be5] font-normal outline-none transition-all'
                            />
                          </div>

                          <div className='mt-5'>
                            <label
                              htmlFor='notes'
                              className='block text-sm font-medium uppercase mt-1 text-[1.02rem] font-roboto-regular'
                            >
                              Bank Details
                            </label>
                            <textarea
                              id='bank_details'
                              value={values?.invoice_bank_details}
                              name='invoice_bank_details'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              rows={2}
                              className='border-dashed border border-[#d2ddec] rounded-[.25rem] block p-2.5 w-full text-sm text-gray-900 focus:border-[#2c7be5] font-normal outline-none transition-all'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </ZFormikForm>
            );
          }}
        </ZFormik>
      </div>

      <div className='flex items-end w-full text-center bg-secondary'>
        <Copyright className='py-[2rem] w-full' />
      </div>
    </div>
  );
};

export default InvoicesForm;
