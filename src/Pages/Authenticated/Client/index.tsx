// #region ---- Core Imports ----
import React, { useEffect } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----
import ZAuthNavigation from '@/Components/Auth/Navigation';
import ZButton from '@/Components/Elements/Button';
import Copyright from '@/Components/Inpage/Copyright';
import {
  useZInvalidateReactQueries,
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZUpdateRQCacheData
} from '@/ZHooks/zreactquery.hooks';
import { useZLoader } from '@/ZHooks/ZGlobalComponents.hook';
import {
  isZNonEmptyString,
  reportCustomError,
  showZPrompt
} from '@/utils/Helpers';
import { messages } from '@/utils/Messages';
import { extractInnerData } from '@/utils/Helpers/APIS';
import {
  showSuccessNotification,
  showWarningNotification
} from '@/utils/Helpers/Notification';
import { useZNavigate } from '@/ZHooks/Navigation.hook';
import { AppRoutes } from '@/Routes/AppRoutes';
import { queryKeys } from '@/utils/Constants/Query';
import TableSkeleton from '@/Components/Skeleton/Table';
import { ZBtnSelect } from '@/Components/Elements/Select';
import { ZSearchBtnInput } from '@/Components/Elements/Input';

// #endregion

// #region ---- Types Imports ----
import { ZFill } from '@/utils/Enums/Elements.enum';
import {
  ApiUrlEnum,
  RouteParams,
  ZRQUpdaterAction
} from '@/utils/Enums/apis.enum';
import { type ZClientI } from '@/Types/Auth/Clients/index.type';
import { extractInnerDataOptionsEnum } from '@/Types/APIs/index.type';

// #endregion

// #region ---- Store Imports ----
import {
  ZClientFiltersRStateAtom,
  ZClientsRStateAtom,
  ZClientRStateSelector
} from '@/Store/Client/index.recoil';
import { ItemPerPage } from '@/Data/ItemPerPage.data';

// #endregion

// #region ---- Images Imports ----
import { productVector, TrashBinSvg, EllipsisSvg } from '@/assets';
import constants from '@/utils/Constants';

// #endregion

const Clients: React.FC = () => {
  // #region Custom hooks
  const navigate = useZNavigate();
  const { showLoader, hideLoader } = useZLoader();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // #region Recoil
  const [ZClientFiltersStateAtom, setZClientFiltersStateAtom] = useRecoilState(
    ZClientFiltersRStateAtom
  );

  const setZClientRStateAtom = useSetRecoilState(ZClientsRStateAtom);

  const zClientsDataRStateSelector = useRecoilValue(ZClientRStateSelector);
  // #endregion

  // #region Apis
  const { data: allRQClients, isFetching: isAllRQClientsFetching } =
    useZRQGetRequest<ZClientI[]>({
      _key: [queryKeys.clients.list],
      _url: ApiUrlEnum.getClients
    });

  const { mutateAsync: deleteClientAsyncMutate } = useZRQDeleteRequest({
    _url: ApiUrlEnum.deleteClient
  });
  // #endregion

  // #region Functions
  const deleteClientHandler = async (id?: string): Promise<void> => {
    try {
      showLoader(messages.client.deletingLoader);
      const _response = await deleteClientAsyncMutate({
        itemIds: [id ?? ''],
        urlDynamicParts: [RouteParams.clientId]
      });
      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData<{ success: boolean }>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );
        if (_data?.success === true) {
          await updateRQCDataHandler({
            id,
            key: [queryKeys.clients.list],
            updaterAction: ZRQUpdaterAction.delete
          });

          await zInvalidateReactQueries([queryKeys.invoice.list]);

          await zInvalidateReactQueries([queryKeys.expense.list]);

          hideLoader();
          showSuccessNotification(messages.client.deleted);
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
      allRQClients !== null &&
      allRQClients !== undefined &&
      allRQClients?.length > 0
    ) {
      setZClientRStateAtom(() => [...allRQClients]);
    }
    // eslint-disable-next-line
  }, [allRQClients]);
  // #endregion

  return (
    <div className='relative flex flex-col items-center justify-between w-full min-h-screen pt-5 overflow-x-hidden bg-secondary max-h-max lg:pe-8 maxLg:px-2'>
      <div className='max-w-[85.4rem] h-full w-full mx-auto'>
        <ZAuthNavigation />

        <div className='w-[64.4375rem] max-w-full mx-auto maxMd:mt-[1.6rem] md:mt-[2.4rem]'>
          <div className='flex items-center w-full maxMd:flex-col md:flex-row maxMd:gap-y-3 md:gap-y-0'>
            <div className='flex items-center md:w-1/2 maxMd:w-full maxMd:flex-col maxMd:gap-y-3 md:gap-y-0 md:flex-row'>
              <h2 className='uppercase text-primary me-9 text-[1.5rem] md:text-[2.25rem] font-black font-mont-heavy'>
                Clients
              </h2>
              {/* <ZButton
                className='flex items-center justify-center uppercase maxMd:w-full md:w-max p-[.3rem_1.3rem!important]'
                fill={ZFill.outline}
                disabled={allRQClients?.length === 0}
              >
                10
                <ChevronDown className='ms-2 w-[1.75rem] h-[1.75rem]' />
              </ZButton> */}
              <ZBtnSelect
                options={ItemPerPage}
                isDisabled={
                  allRQClients === undefined ||
                  allRQClients === null ||
                  allRQClients?.length === 0
                }
                value={ItemPerPage?.find(
                  (el) => el.value === ZClientFiltersStateAtom?.itemPerPage
                )}
                onChange={(el) => {
                  setZClientFiltersStateAtom((oldValues) => ({
                    ...oldValues,
                    itemPerPage: Number(el?.value)
                  }));
                }}
              />

              {/* <ZButton
                className='flex items-center justify-center uppercase maxMd:w-full md:w-max p-[.3rem_1.3rem!important] md:ms-[1.1rem]'
                fill={ZFill.outline}
                disabled={allRQClients?.length === 0}
              >
                Search
                <SearchSvg className='ms-2 w-[1.75rem] h-[1.75rem] stroke-primary text-medium' />
              </ZButton> */}
              <ZSearchBtnInput
                className='md:ms-[.5rem] lg:ms-[1.1rem]'
                value={ZClientFiltersStateAtom?.search}
                disabled={
                  allRQClients === undefined ||
                  allRQClients === null ||
                  allRQClients?.length === 0
                }
                placeholder='Search'
                onChange={({ target }) => {
                  setZClientFiltersStateAtom((oldValues) => ({
                    ...oldValues,
                    search: target?.value
                  }));
                }}
              />
            </div>

            <div className='flex md:w-1/2 maxMd:w-full md:justify-end'>
              {allRQClients !== undefined &&
              allRQClients !== null &&
              allRQClients?.length > 0 ? (
                <ZButton
                  className='flex items-center justify-center uppercase maxMd:w-full md:w-max'
                  onClick={() => {
                    void navigate({
                      to: AppRoutes.authRoutes.clientSub.create.completePath
                    });
                  }}
                >
                  Add Client
                </ZButton>
              ) : null}
            </div>
          </div>

          {!isAllRQClientsFetching ? (
            allRQClients !== undefined &&
            allRQClients !== null &&
            allRQClients?.length > 0 ? (
              <div className='pt-1 overflow-auto mt-7'>
                {/* Table */}
                <div className='w-[64.4375rem]'>
                  <div className='flex items-center w-full py-3 border-b border-[rgba(58,54,83,0.54)]'>
                    <span className='w-[12.8125rem] text-tertiary text-start ps-4 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'>
                      Company name
                    </span>
                    <span className='w-[12.8125rem] text-tertiary text-start ps-4 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'>
                      Contact name
                    </span>
                    <span className='w-[12.8125rem] text-tertiary text-start ps-4 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'>
                      Email
                    </span>
                    <span className='w-[7.9375rem] text-tertiary text-end text-[1rem] pe-4 font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'>
                      Invoices
                    </span>
                    <span className='w-[12.8125rem] text-tertiary text-start ps-12 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'>
                      Currency
                    </span>
                  </div>

                  {zClientsDataRStateSelector?.data?.map((el) => {
                    return (
                      <div
                        className='flex items-center w-full py-[.4rem] border-b border-[rgba(58,54,83,0.54)]'
                        key={el?.id}
                      >
                        <span className='w-[12.8125rem] text-tertiary text-start ps-4 text-[1rem] font-normal font-roboto-regular tracking-[0.15px] leading-[1.5rem]'>
                          {el?.company}
                        </span>
                        <span className='w-[12.8125rem] text-tertiary text-start ps-4 text-[1rem] font-normal font-roboto-regular tracking-[0.15px] leading-[1.5rem]'>
                          {el?.name}
                        </span>
                        <span className='w-[12.8125rem] text-tertiary text-start ps-4 text-[1rem] font-normal font-roboto-regular tracking-[0.15px] leading-[1.5rem]'>
                          {el?.email}
                        </span>
                        <span className='w-[7.9375rem] text-tertiary text-end text-[1rem] pe-4 font-normal font-roboto-regular tracking-[0.15px] leading-[1.5rem]'>
                          {el?.invoices_count}
                        </span>
                        <span className='w-max flex items-center text-tertiary text-start ps-[5rem] ms-1 text-[1rem] font-normal font-roboto-regular tracking-[0.15px] leading-[1.5rem]'>
                          {el?.default_currency?.value}
                          <span className='w-max text-tertiary text-start ps-9 ms-1 text-[1rem] font-normal font-roboto-regular tracking-[0.15px] leading-[1.5rem]'>
                            <ZButton
                              fill={ZFill.clear}
                              className='p-[0!important] w-max h-max flex items-center justify-center'
                              onClick={() => {
                                void (async () => {
                                  const { value } = await showZPrompt({
                                    title: messages.client.confirmDialog.title,
                                    message:
                                      messages.client.confirmDialog.messages
                                  });

                                  if (isZNonEmptyString(value)) {
                                    if (
                                      value?.toLowerCase() ===
                                      constants.deleteConfirmWords.global?.toLowerCase()
                                    ) {
                                      void deleteClientHandler(el?.id);
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
                              onClick={() => {
                                void navigate({
                                  to: AppRoutes.authRoutes.clientSub.update
                                    .completePath,
                                  params: {
                                    clientId: el?.id ?? ''
                                  }
                                });
                              }}
                              className='uppercase p-[0!important] w-[5.5rem] flex items-center justify-center h-[2.6875rem]'
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
                        {zClientsDataRStateSelector?.paginationInfo?.from} to{' '}
                        {zClientsDataRStateSelector?.paginationInfo?.to} of{' '}
                        {allRQClients?.length} results
                      </span>
                    </div>
                    <div className='flex items-center justify-end w-1/2'>
                      <ZButton
                        className={ZClassNames({
                          uppercase: true,
                          'cursor-not-allowed':
                            !zClientsDataRStateSelector?.paginationInfo
                              ?.canGoPrevious
                        })}
                        fill={ZFill.clear}
                        disabled={
                          !zClientsDataRStateSelector?.paginationInfo
                            ?.canGoPrevious
                        }
                        onClick={() => {
                          if (
                            zClientsDataRStateSelector?.paginationInfo
                              ?.canGoPrevious
                          ) {
                            setZClientFiltersStateAtom((oldValues) => ({
                              ...oldValues,
                              currentPage: oldValues.currentPage - 1
                            }));
                          }
                        }}
                      >
                        Previous
                      </ZButton>
                      {zClientsDataRStateSelector?.paginationInfo?.range?.map(
                        (el, index) => {
                          if (typeof el === 'number') {
                            return (
                              <ZButton
                                fill={
                                  zClientsDataRStateSelector?.paginationInfo
                                    ?.currentPage === el
                                    ? ZFill.solid
                                    : ZFill.outline
                                }
                                className={ZClassNames({
                                  'me-1': true,
                                  'py-[.37rem!important]':
                                    zClientsDataRStateSelector?.paginationInfo
                                      ?.currentPage !== el
                                })}
                                key={index}
                                onClick={() => {
                                  setZClientFiltersStateAtom((oldValues) => ({
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
                      <ZButton
                        className={ZClassNames({
                          uppercase: true,
                          'cursor-not-allowed':
                            !zClientsDataRStateSelector?.paginationInfo
                              ?.canGoNext
                        })}
                        fill={ZFill.clear}
                        disabled={
                          !zClientsDataRStateSelector?.paginationInfo?.canGoNext
                        }
                        onClick={() => {
                          if (
                            zClientsDataRStateSelector?.paginationInfo
                              ?.canGoNext
                          ) {
                            setZClientFiltersStateAtom((oldValues) => ({
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
                  No Clients
                </h3>
                <p className='text-[1rem] w-full max-w-[25rem] text-center my-1 font-medium text-primary me-9 font-mont-bold'>
                  It seems you have not added any clients yet. Click the button
                  below to get started
                </p>
                <ZButton
                  className='flex items-center justify-center mt-6 uppercase maxMd:w-full md:w-max'
                  onClick={() => {
                    void navigate({
                      to: AppRoutes.authRoutes.clientSub.create.completePath
                    });
                  }}
                >
                  Add Client
                </ZButton>
              </div>
            )
          ) : (
            <TableSkeleton />
          )}
        </div>
      </div>

      <div className='flex flex-col items-start w-full  maxMd:mt-[2rem] md:mt-[7.15rem]'>
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

export default Clients;
