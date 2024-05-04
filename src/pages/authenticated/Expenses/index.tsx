// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import advancedFormat from 'dayjs/plugin/advancedFormat';
import dayjs from 'dayjs';

// #endregion

// #region ---- Custom Imports ----
import ZAuthNavigation from '@/components/auth/Navigation';
import ZButton from '@/components/Elements/Button';
import Copyright from '@/components/inpage/Copyright';
import { useZNavigate } from '@/hooks/navigation.hook';
import { AppRoutes } from '@/Routes/AppRoutes';
import {
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZUpdateRQCacheData
} from '@/hooks/zreactquery.hooks';
import { queryKeys } from '@/utils/constants/query';
import TableSkeleton from '@/components/skeleton/Table';
import { ZInvoiceTypeE, type ZInvoiceI } from '@/types/auth/invoice';
import { useZLoader } from '@/hooks/globalComponents.hook';
import { messages } from '@/utils/messages';
import { extractInnerData } from '@/utils/helpers/APIS';
import { showSuccessNotification } from '@/utils/helpers/Notification';
import { reportCustomError, showZConfirm } from '@/utils/helpers';

// #endregion

// #region ---- Types Imports ----
import { ZFill } from '@/utils/enums/elements.enum';
import {
  ApiUrlEnum,
  RouteParams,
  ZRQUpdaterAction
} from '@/utils/enums/apis.enum';
import { extractInnerDataOptionsEnum } from '@/types/apis/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZChevronDown, SearchSvg, productVector, TrashBinSvg } from '@/assets';

// #endregion

dayjs.extend(advancedFormat);

const Expenses: React.FC = () => {
  // #region Custom hooks
  const navigate = useZNavigate();
  const { showLoader, hideLoader } = useZLoader();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region Apis
  const { data: allRQInvoiceLists, isFetching: isAllRQInvoiceFetching } =
    useZRQGetRequest<ZInvoiceI[]>({
      _key: [queryKeys.expense.list],
      _url: ApiUrlEnum.getInvoices,
      _itemsIds: [ZInvoiceTypeE.exp],
      _urlDynamicParts: [RouteParams.invoiceType]
    });

  const { mutateAsync: deleteInvoiceAsyncMutate } = useZRQDeleteRequest({
    _url: ApiUrlEnum.deleteInvoice
  });
  // #endregion

  // #region Function
  const deleteInvoiceHandler = async (id?: string): Promise<void> => {
    try {
      showLoader(messages.invoice.deletingLoader);
      const _response = await deleteInvoiceAsyncMutate({
        itemIds: [id ?? ''],
        urlDynamicParts: [RouteParams.invoiceId]
      });

      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData<{ success: boolean }>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data?.success === true) {
          await updateRQCDataHandler({
            id,
            key: [queryKeys.invoice.list],
            updaterAction: ZRQUpdaterAction.delete
          });

          hideLoader();
          showSuccessNotification(messages.invoice.deleted);
        }
      }
    } catch (error) {
      hideLoader();
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <div className='relative flex flex-col items-center justify-between w-full min-h-screen pt-5 overflow-x-hidden bg-secondary h max-h-max lg:pe-8 maxLg:px-2'>
      <div className='max-w-[85.4rem] w-full mx-auto'>
        <ZAuthNavigation />

        <div className='w-[64.4375rem] max-w-full mx-auto maxMd:mt-[1.6rem] md:mt-[2.4rem]'>
          <div className='flex items-center w-full maxMd:flex-col maxLg:items-end lg:flex-row maxLg:gap-y-3 lg:gap-y-0'>
            <div className='flex items-center md:w-full maxLg:flex-wrap maxMd:w-full maxMd:flex-col maxMd:gap-y-3 md:gap-y-0 md:flex-row'>
              <h2 className='uppercase maxLg:w-full text-primary maxMd:text-center md:me-9 text-[1.5rem]  md:text-[2.25rem] font-black font-mont-heavy'>
                Expenses
              </h2>
              <ZButton
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
              </ZButton>
              <ZButton
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
              </ZButton>

              <ZButton
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
              </ZButton>
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
                        invoiceType: ZInvoiceTypeE.exp
                      }
                    });
                  }}
                >
                  Create Expense
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

                {allRQInvoiceLists?.map((el) => {
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
                                const { value } = await showZConfirm({
                                  title: messages.invoice.confirmDialog.title,
                                  message:
                                    messages.invoice.confirmDialog.messages
                                });

                                if (value) {
                                  void deleteInvoiceHandler(el?.id);
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
                                  invoiceType: ZInvoiceTypeE.exp
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
                      Showing 1 to 10 of 20 results
                    </span>
                  </div>
                  <div className='flex items-center justify-end w-1/2'>
                    <ZButton className='uppercase' fill={ZFill.clear}>
                      Previous
                    </ZButton>
                    <ZButton className='me-1'>1</ZButton>
                    <ZButton
                      fill={ZFill.outline}
                      className='py-[.37rem!important]'
                    >
                      2
                    </ZButton>
                    <ZButton className='uppercase' fill={ZFill.clear}>
                      Next
                    </ZButton>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center h-full mt7 mt-[10.15rem]'>
              <h3 className='text-primary me-9 text-[1.8rem] font-black font-mont-heavy'>
                No Expenses
              </h3>
              <p className='text-[1rem] w-full max-w-[25rem] text-center my-1 font-medium text-primary me-9 font-mont-bold'>
                It seems you have not created any expenses yet. Click the button
                below to get started.
              </p>
              <ZButton
                className='flex items-center justify-center mt-6 uppercase maxMd:w-full md:w-max'
                onClick={() => {
                  void navigate({
                    to: AppRoutes.authRoutes.invoiceSub.create.completePath,
                    params: {
                      invoiceType: ZInvoiceTypeE.exp
                    }
                  });
                }}
              >
                Create Expense
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

export default Expenses;
