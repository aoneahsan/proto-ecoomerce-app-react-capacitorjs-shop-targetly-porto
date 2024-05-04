// #region ---- Core Imports ----
import React, { useEffect, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import advancedFormat from 'dayjs/plugin/advancedFormat';
import dayjs from 'dayjs';
import { useParams } from '@tanstack/react-router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ZClassNames } from '@/Packages/ClassNames';
// #endregion

// #region ---- Custom Imports ----
import ZAuthNavigation from '@/components/auth/Navigation';
import ZButton from '@/components/Elements/Button';
import Copyright from '@/components/inpage/Copyright';
import { useZNavigate } from '@/hook/navigation.hook';
import { AppRoutes } from '@/Routes/AppRoutes';
import {
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZUpdateRQCacheData
} from '@/hook/zreactquery.hooks';
import { queryKeys } from '@/utils/constants/query';
import TableSkeleton from '@/components/skeleton/Table';
import { ZInvoiceTypeE, type ZInvoiceI } from '@/types/auth/invoice123';
import { useZLoader } from '@/hook/globalComponents.hook';
import { messages } from '@/utils/messages123';
import { extractInnerData } from '@/utils/helpers/APIS';
import {
  showSuccessNotification,
  showWarningNotification
} from '@/utils/helpers/Notification';
import {
  isZNonEmptyString,
  reportCustomError,
  showZPrompt
} from '@/utils/helpers123';
import { ZBtnSelect } from '@/components/Elements/Select';
import { ZSearchBtnInput } from '@/components/Elements/Input';

// #endregion

// #region ---- Types Imports ----
import { ZFill } from '@/utils/enums/Elements.enum';
import {
  ApiUrlEnum,
  RouteParams,
  ZRQUpdaterAction
} from '@/utils/enums/apis.enum';
import { extractInnerDataOptionsEnum } from '@/types/apis/index.type';
import { type ZClientI } from '@/types/auth/clients/index.type';
import { type ZRSelectOptions } from '@/types/elements/Select.type';

// #endregion

// #region ---- Store Imports ----
import {
  ZExpenseFiltersRStateAtom,
  ZExpenseRStateAtom,
  ZExpenseRStateSelector,
  ZInvoiceFiltersRStateAtom,
  ZInvoiceRStateAtom,
  ZInvoiceRStateSelector
} from '@/store/invoice/index.recoil';
import { ItemPerPage } from '@/Data/ItemPerPage.data';

// #endregion

// #region ---- Images Imports ----
import { productVector, TrashBinSvg, EllipsisSvg } from '@/assets';
import constants from '@/utils/constants';

// #endregion
dayjs.extend(advancedFormat);

const Invoices: React.FC = () => {
  // Getting invoice type from param
  const { invoiceType } = useParams({
    from: AppRoutes.authRoutes.invoices
  });
  // #region Custom hooks
  const navigate = useZNavigate();
  const { showLoader, hideLoader } = useZLoader();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region Recoil
  const [ZInvoiceFiltersStateAtom, setZInvoiceFiltersStateAtom] =
    useRecoilState(
      invoiceType === ZInvoiceTypeE.exp
        ? ZExpenseFiltersRStateAtom
        : ZInvoiceFiltersRStateAtom
    );

  const setZInvoiceRStateAtom = useSetRecoilState(
    invoiceType === ZInvoiceTypeE.exp ? ZExpenseRStateAtom : ZInvoiceRStateAtom
  );

  const zInvoicesDataRStateSelector = useRecoilValue(
    invoiceType === ZInvoiceTypeE.exp
      ? ZExpenseRStateSelector
      : ZInvoiceRStateSelector
  );
  // #endregion

  // #region Apis
  const { data: allRQClients } = useZRQGetRequest<ZClientI[]>({
    _key: [queryKeys.clients.list],
    _url: ApiUrlEnum.getClients
  });

  const { data: allRQInvoiceLists, isFetching: isAllRQInvoiceFetching } =
    useZRQGetRequest<ZInvoiceI[]>({
      _key:
        invoiceType === ZInvoiceTypeE.inv
          ? [queryKeys.invoice.list]
          : invoiceType === ZInvoiceTypeE.exp
            ? [queryKeys.expense.list]
            : [],
      _url: ApiUrlEnum.getInvoices,
      _itemsIds: [invoiceType],
      _urlDynamicParts: [RouteParams.invoiceType]
    });

  const { mutateAsync: deleteInvoiceAsyncMutate } = useZRQDeleteRequest({
    _url: ApiUrlEnum.deleteInvoice
  });
  // #endregion

  // #region Function
  const deleteInvoiceHandler = async (id?: string): Promise<void> => {
    try {
      showLoader(
        invoiceType === ZInvoiceTypeE.inv
          ? messages.invoice.deletingLoader
          : invoiceType === ZInvoiceTypeE.exp
            ? messages.expense.deletingLoader
            : ''
      );
      const _response = await deleteInvoiceAsyncMutate({
        itemIds: [invoiceType, id ?? ''],
        urlDynamicParts: [RouteParams.invoiceType, RouteParams.invoiceId]
      });

      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData<{ success: boolean }>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data?.success === true) {
          await updateRQCDataHandler({
            id,
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
        }
      }
    } catch (error) {
      hideLoader();
      reportCustomError(error);
    }
  };
  // #endregion

  // #region Use Effects.
  useEffect(() => {
    if (
      allRQInvoiceLists !== null &&
      allRQInvoiceLists !== undefined &&
      allRQInvoiceLists?.length > 0
    ) {
      setZInvoiceRStateAtom(() => [...allRQInvoiceLists]);
    }
    // eslint-disable-next-line
  }, [allRQInvoiceLists]);
  // #endregion

  const clientOptions = useMemo(
    () => [
      constants?.showAllOption,
      ...((allRQClients?.map((el) => ({
        label: el?.name,
        value: el?.id
      })) ?? []) as ZRSelectOptions[])
    ],
    [allRQClients]
  );

  return (
    <div className='relative flex flex-col items-center justify-between w-full min-h-screen pt-5 overflow-x-hidden bg-secondary h max-h-max lg:pe-8 maxLg:px-2'>
      <div className='max-w-[85.4rem] w-full mx-auto'>
        <ZAuthNavigation />

        <div className='w-[64.4375rem] max-w-full mx-auto maxMd:mt-[1.6rem] md:mt-[2.4rem]'>
          <div className='flex items-center w-full maxMd:flex-col maxLg:items-end lg:flex-row maxLg:gap-y-3 lg:gap-y-0'>
            <div className='flex items-center md:w-full maxLg:flex-wrap maxMd:w-full maxMd:flex-col maxMd:gap-y-3 md:gap-y-0 md:flex-row'>
              <h2 className='uppercase maxLg:w-full text-primary maxMd:text-center md:me-9 text-[1.5rem]  md:text-[2.25rem] font-black font-mont-heavy'>
                {invoiceType === ZInvoiceTypeE.inv
                  ? 'Invoices'
                  : invoiceType === ZInvoiceTypeE.exp
                    ? 'Expenses'
                    : null}
              </h2>
              {/* <ZButton
                className='flex items-center justify-center uppercase maxMd:w-full md:w-max p-[.3rem_1.3rem!important]'
                fill={ZFill.outline}
                disabled={
                  allRQInvoiceLists === undefined ||
                  allRQInvoiceLists === null ||
                  allRQInvoiceLists?.length === 0
                }
              >
                10
                <ZChevronDown className='ms-2 w-[1.75rem] h-[1.75rem]' />
              </ZButton> */}
              <ZBtnSelect
                options={ItemPerPage}
                isDisabled={
                  allRQInvoiceLists === undefined ||
                  allRQInvoiceLists === null ||
                  allRQInvoiceLists?.length === 0
                }
                value={ItemPerPage?.find(
                  (el) => el.value === ZInvoiceFiltersStateAtom?.itemPerPage
                )}
                onChange={(el) => {
                  setZInvoiceFiltersStateAtom((oldValues) => ({
                    ...oldValues,
                    itemPerPage: Number(el?.value)
                  }));
                }}
              />
              {/* <ZButton
                className='flex items-center justify-center uppercase maxMd:w-full md:w-max lg:p-[.3rem_1.3rem!important] md:p-[.3rem_.9rem!important] md:ms-[.5rem] lg:ms-[1.1rem]'
                fill={ZFill.outline}
                disabled={
                  allRQInvoiceLists === undefined ||
                  allRQInvoiceLists === null ||
                  allRQInvoiceLists?.length === 0
                }
              >
                Search
                <SearchSvg className='ms-2 w-[1.75rem] h-[1.75rem] stroke-primary text-medium' />
              </ZButton> */}
              <ZSearchBtnInput
                disabled={
                  allRQInvoiceLists === undefined ||
                  allRQInvoiceLists === null ||
                  allRQInvoiceLists?.length === 0
                }
                className='md:ms-[.5rem] lg:ms-[1.1rem]'
                value={ZInvoiceFiltersStateAtom?.search}
                placeholder='Search'
                onChange={({ target }) => {
                  if (
                    allRQInvoiceLists !== undefined &&
                    allRQInvoiceLists !== null &&
                    allRQInvoiceLists?.length > 0
                  ) {
                    setZInvoiceFiltersStateAtom((oldValues) => ({
                      ...oldValues,
                      search: target?.value
                    }));
                  }
                }}
              />

              {/* <ZButton
                className='flex items-center justify-center uppercase maxMd:w-full md:w-max lg:p-[.3rem_1.3rem!important] md:p-[.3rem_.9rem!important] md:ms-[.5rem] lg:ms-[1.1rem]'
                fill={ZFill.outline}
                disabled={
                  allRQInvoiceLists === undefined ||
                  allRQInvoiceLists === null ||
                  allRQInvoiceLists?.length === 0
                }
              >
                Show All
                <ZChevronDown className='ms-2 w-[1.75rem] h-[1.75rem]' />
              </ZButton> */}

              <ZBtnSelect
                className='md:ms-[.5rem] lg:ms-[1.1rem]'
                options={clientOptions}
                isDisabled={
                  allRQInvoiceLists === undefined ||
                  allRQInvoiceLists === null ||
                  allRQInvoiceLists?.length === 0 ||
                  allRQClients === undefined ||
                  allRQClients === null ||
                  allRQClients?.length === 0
                }
                value={clientOptions?.find(
                  (el) => el.value === ZInvoiceFiltersStateAtom?.showAll
                )}
                onChange={(el) => {
                  setZInvoiceFiltersStateAtom((oldValues) => ({
                    ...oldValues,
                    showAll: String(el?.value)
                  }));
                }}
              />
            </div>

            <div className='flex md:w-max maxMd:w-full maxMd:justify-center lg:justify-end'>
              {allRQInvoiceLists !== undefined &&
              allRQInvoiceLists !== null &&
              allRQInvoiceLists?.length > 0 ? (
                <ZButton
                  className='flex items-center justify-center uppercase maxMd:w-full md:w-max'
                  onClick={() => {
                    void navigate({
                      to: AppRoutes.authRoutes.invoiceSub.create.completePath,
                      params: {
                        invoiceType
                      }
                    });
                  }}
                >
                  Create{' '}
                  {invoiceType === ZInvoiceTypeE.inv
                    ? 'Invoice'
                    : invoiceType === ZInvoiceTypeE.exp
                      ? 'Expense'
                      : null}
                </ZButton>
              ) : null}
            </div>
          </div>

          {isAllRQInvoiceFetching ? (
            <TableSkeleton />
          ) : allRQInvoiceLists !== undefined &&
            allRQInvoiceLists !== null &&
            allRQInvoiceLists?.length > 0 ? (
            <div className='pt-1 overflow-auto mt-7'>
              <div className='w-[64.4375rem]'>
                <div className='flex items-center w-full py-3 border-b border-[rgba(58,54,83,0.54)]'>
                  <span className='w-[12.8125rem] text-tertiary text-start ps-4 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'>
                    Invoice number
                  </span>
                  <span className='w-[12.8125rem] text-tertiary text-start ps-4 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'>
                    Company name
                  </span>
                  <span className='w-[12.8125rem] text-tertiary text-start ps-4 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'>
                    Due Date
                  </span>
                  <span className='w-[7.9375rem] text-tertiary text-end text-[1rem] pe-4 font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'>
                    Total
                  </span>
                  <span className='w-[12.8125rem] text-tertiary text-start ps-12 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'>
                    Currency
                  </span>
                </div>

                {zInvoicesDataRStateSelector?.data?.map((el) => {
                  return (
                    <div
                      className='flex items-center w-full py-[.4rem] border-b border-[rgba(58,54,83,0.54)]'
                      key={el.id}
                    >
                      <span className='w-[12.8125rem] text-tertiary text-start ps-4 text-[1rem] font-normal font-roboto-regular tracking-[0.15px] leading-[1.5rem]'>
                        {el?.invoice_no}
                      </span>
                      <span className='w-[12.8125rem] text-tertiary text-start ps-4 text-[1rem] font-normal font-roboto-regular tracking-[0.15px] leading-[1.5rem]'>
                        {el?.user?.company}
                      </span>
                      <span className='w-[12.8125rem] text-tertiary text-start ps-4 text-[1rem] font-normal font-roboto-regular tracking-[0.15px] leading-[1.5rem]'>
                        {dayjs(el.created_at).format('MMMM, Do YYYY')}
                      </span>
                      <span className='w-[7.9375rem] text-tertiary text-end text-[1rem] pe-2 font-normal font-roboto-regular tracking-[0.15px] leading-[1.5rem]'>
                        {el?.total}
                      </span>
                      <span className='w-max flex items-center text-tertiary text-start ps-[5rem] ms-1 text-[1rem] font-normal font-roboto-regular tracking-[0.15px] leading-[1.5rem]'>
                        {el?.selected_currency?.value}
                        <span className='w-max text-tertiary text-start ps-9 ms-1 text-[1rem] font-normal font-roboto-regular tracking-[0.15px] leading-[1.5rem]'>
                          <ZButton
                            fill={ZFill.clear}
                            className='p-[0!important] w-max h-max flex items-center justify-center'
                            onClick={() => {
                              void (async () => {
                                const { value } = await showZPrompt({
                                  title:
                                    invoiceType === ZInvoiceTypeE.inv
                                      ? messages.invoice.confirmDialog.title
                                      : invoiceType === ZInvoiceTypeE.exp
                                        ? messages.expense.confirmDialog.title
                                        : '',
                                  message:
                                    invoiceType === ZInvoiceTypeE.inv
                                      ? messages.invoice.confirmDialog.messages
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
                                    void deleteInvoiceHandler(el?.id);
                                  } else {
                                    showWarningNotification(
                                      messages?.auth?.confirmNotMatch
                                    );
                                  }
                                }
                              })();
                            }}
                          >
                            <TrashBinSvg className='w-6 h-6 text-danger' />
                          </ZButton>
                        </span>
                        <span className='w-max text-tertiary text-start ps-6 ms-1 text-[1rem] font-normal font-roboto-regular tracking-[0.15px] leading-[1.5rem]'>
                          <ZButton
                            fill={ZFill.outline}
                            className='uppercase p-[0!important] w-[5.5rem] flex items-center justify-center h-[2.6875rem]'
                            onClick={() => {
                              void navigate({
                                to: AppRoutes.authRoutes.invoiceSub.update
                                  .completePath,
                                params: {
                                  invoiceId: el?.id ?? '',
                                  invoiceType
                                }
                              });
                            }}
                          >
                            Edit
                          </ZButton>
                        </span>
                      </span>
                    </div>
                  );
                })}

                <div className='flex justify-center mt-5 items-center w-full py-[.4rem]'>
                  <div className='w-1/2'>
                    <span className='font-normal ps-4 text-primary text-[1rem] leading-[120%] font-roboto-medium'>
                      Showing{' '}
                      {zInvoicesDataRStateSelector?.paginationInfo?.from} to{' '}
                      {zInvoicesDataRStateSelector?.paginationInfo?.to} of{' '}
                      {allRQInvoiceLists?.length} results
                    </span>
                  </div>

                  <div className='flex items-center justify-end w-1/2'>
                    <ZButton
                      className={ZClassNames({
                        uppercase: true,
                        'cursor-not-allowed':
                          !zInvoicesDataRStateSelector?.paginationInfo
                            ?.canGoPrevious
                      })}
                      fill={ZFill.clear}
                      disabled={
                        !zInvoicesDataRStateSelector?.paginationInfo
                          ?.canGoPrevious
                      }
                      onClick={() => {
                        if (
                          zInvoicesDataRStateSelector?.paginationInfo
                            ?.canGoPrevious
                        ) {
                          setZInvoiceFiltersStateAtom((oldValues) => ({
                            ...oldValues,
                            currentPage: oldValues.currentPage - 1
                          }));
                        }
                      }}
                    >
                      Previous
                    </ZButton>
                    {zInvoicesDataRStateSelector?.paginationInfo?.range?.map(
                      (el, index) => {
                        if (typeof el === 'number') {
                          return (
                            <ZButton
                              fill={
                                zInvoicesDataRStateSelector?.paginationInfo
                                  ?.currentPage === el
                                  ? ZFill.solid
                                  : ZFill.outline
                              }
                              className={ZClassNames({
                                'me-1': true,
                                'py-[.37rem!important]':
                                  zInvoicesDataRStateSelector?.paginationInfo
                                    ?.currentPage !== el
                              })}
                              key={index}
                              onClick={() => {
                                setZInvoiceFiltersStateAtom((oldValues) => ({
                                  ...oldValues,
                                  currentPage: el
                                }));
                              }}
                            >
                              {el}
                            </ZButton>
                          );
                        } else if (typeof el === 'string') {
                          return (
                            <div key={index}>
                              <EllipsisSvg className='w-8 h-8 mx-2 text-primary' />
                            </div>
                          );
                        }
                        return null;
                      }
                    )}
                    {/* <ZButton className='me-1'>1</ZButton>
                    <ZButton
                      fill={ZFill.outline}
                      className='py-[.37rem!important]'
                      onClick={() => {
                        setZInvoiceFiltersStateAtom((oldValues) => ({
                          ...oldValues,
                          currentPage: 2
                        }));
                      }}
                    >
                      2
                    </ZButton> */}
                    <ZButton
                      className={ZClassNames({
                        uppercase: true,
                        'cursor-not-allowed':
                          !zInvoicesDataRStateSelector?.paginationInfo
                            ?.canGoNext
                      })}
                      fill={ZFill.clear}
                      disabled={
                        !zInvoicesDataRStateSelector?.paginationInfo?.canGoNext
                      }
                      onClick={() => {
                        if (
                          zInvoicesDataRStateSelector?.paginationInfo?.canGoNext
                        ) {
                          setZInvoiceFiltersStateAtom((oldValues) => ({
                            ...oldValues,
                            currentPage: oldValues.currentPage + 1
                          }));
                        }
                      }}
                    >
                      Next
                    </ZButton>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center h-full mt7 mt-[10.15rem]'>
              <h3 className='text-primary me-9 text-[1.8rem] font-black font-mont-heavy'>
                No{' '}
                {invoiceType === ZInvoiceTypeE.inv
                  ? 'Invoice'
                  : invoiceType === ZInvoiceTypeE.exp
                    ? 'Expense'
                    : null}
              </h3>
              <p className='text-[1rem] w-full max-w-[25rem] text-center my-1 font-medium text-primary me-9 font-mont-bold'>
                It seems you have not created any invoices yet. Click the button
                below to get started.
              </p>
              <ZButton
                className='flex items-center justify-center mt-6 uppercase maxMd:w-full md:w-max'
                onClick={() => {
                  void navigate({
                    to: AppRoutes.authRoutes.invoiceSub.create.completePath,
                    params: {
                      invoiceType
                    }
                  });
                }}
              >
                Create{' '}
                {invoiceType === ZInvoiceTypeE.inv
                  ? 'Invoice'
                  : invoiceType === ZInvoiceTypeE.exp
                    ? 'Expense'
                    : null}
              </ZButton>
            </div>
          )}
        </div>
      </div>

      <div className='flex items-start flex-col w-full maxMd:mt-[2rem] md:mt-[7.15rem]'>
        <div className='absolute bottom-0 left-0 h-[5rem] overflow-hidden'>
          <img
            src={productVector}
            alt='product vector'
            className='maxMd:hidden z-1 maxMd:w-[16rem] maxXl:w-[17rem] w-[19.5rem]'
          />
        </div>
        <div className='flex items-end w-full text-center'>
          <Copyright className='pb-[1.2rem] pt-[2.5rem] w-full' />
        </div>
      </div>
    </div>
  );
};

export default Invoices;
