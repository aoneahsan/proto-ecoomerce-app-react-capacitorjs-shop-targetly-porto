import { ZErrorCodeEnum } from '@/types123/auth123/index.type';
import { zAxiosApiRequestContentType } from '@/types123/global123/zapi-hooks.type';
import constants from '@/utils/constants';
import { AppRoutes } from '@/Routes/AppRoutes';
import {
  type ApiUrlEnum,
  ZRQGetRequestExtractEnum,
  ZRQUpdaterAction
} from '@/utils/enums123/apis.enum';
import {
  Storage,
  emptyVoidReturnFunction,
  reportCustomError,
  showZAlert
} from '@/utils/helpers123';
import { zAxiosApiRequest } from '@/utils/helpers123/APIS';

import {
  type QueryFilters,
  type QueryKey,
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { ZUserRStateAtom } from '@/store123/auth123/user123/index.recoil.ts';

/**
 * The custom hook for getting data from an API using useQuery hook from react-query package.
 * @param URL URL of the API for getting data.
 * @param key Key param means queryKey of the useQuery.
 * @returns return API data if request succeed or return an presentZIonErrorAlert and error if not succeed.
 */
export const useZRQGetRequest = <T>({
  _url,
  _key,
  _itemsIds,
  _urlDynamicParts,
  _shouldFetchWhenIdPassed = false,
  _authenticated,
  _showLoader = true,
  _shouldExtractData = true,
  _extractType = ZRQGetRequestExtractEnum.extractItems,
  _staleTime = 10 * 60000,
  _checkPermissions = true,
  _showAlertOnError = true,
  _queryOptions = {
    refetchOnWindowFocus: false,
    networkMode: 'offlineFirst',
    retry: 2
  },
  _placeholderData
}: {
  _url: ApiUrlEnum;
  _key: string[];
  _shouldExtractData?: boolean;
  _extractType?: ZRQGetRequestExtractEnum;
  _authenticated?: boolean;
  _showLoader?: boolean;
  _itemsIds?: string[];
  _urlDynamicParts?: string[];
  _shouldFetchWhenIdPassed?: boolean;
  _staleTime?: number | typeof Infinity;
  _checkPermissions?: boolean;
  _showAlertOnError?: boolean;

  _queryOptions?: {
    refetchOnWindowFocus?: boolean;
    networkMode?: 'always' | 'offlineFirst' | 'online';
    retry?: number;
  };
  _placeholderData?:
  | UseQueryOptions<T | null | undefined>['placeholderData']
  | null;
}): UseQueryResult<T | null | undefined, Error> => {
  const ZUserRState = useRecoilValue(ZUserRStateAtom);
  const _response = useQuery({
    queryKey: [ZUserRState?.id, ..._key],
    queryFn: async (): Promise<T | undefined | null> => {
      if (_shouldFetchWhenIdPassed !== null && _shouldFetchWhenIdPassed) {
        return null;
      } else {
        /**
         * @_url - takes the get url to fetch data from api.
         *  second argument take the method (post | get | update | delete). as this is the get api data so it  will be get
         * @second argument must be get because this hook is used to get data.
         * third argument is if this is the authenticated request or not.
         * @return return the data from api.
         * fourth argument _itemIds if in url you went to put some ids, with will replace by fifth argument _urlDynamicParts.
         * fifth argument _urlDynamicParts if in url you went to put some ids this ids will be replaced by _urlDynamicParts.
         */
        return await zAxiosApiRequest<T>({
          _url,
          _method: 'get',
          _isAuthenticatedRequest: _authenticated,
          _data: undefined,
          _itemIds: _itemsIds,
          _urlDynamicParts
        });
      }
    },
    select: (data) => {
      if (_shouldExtractData) {
        switch (_extractType) {
          case ZRQGetRequestExtractEnum.extractItems:
            return (data as unknown as { data: { items: T } })?.data?.items;

          case ZRQGetRequestExtractEnum.extractItem:
            return (data as unknown as { data: { item: T } })?.data?.item;

          case ZRQGetRequestExtractEnum.extractData:
            return (data as unknown as { data: T })?.data;

          default:
            return data;
        }
      }
    },
    refetchOnWindowFocus: _queryOptions.refetchOnWindowFocus,
    networkMode: _queryOptions.networkMode,
    retry: _queryOptions.retry,
    staleTime: _staleTime,
    placeholderData: _placeholderData
  });

  if (_response?.error !== null && _response?.error !== undefined) {
    void (async () => {
      const error = _response.error;

      if (error instanceof AxiosError) {
        const _error = (error as AxiosError)?.response;
        // const _errorMessage = (_error?.data as { errors: { item: string[] } })
        //   ?.errors?.item[0];
        // check if it's unauthenticated error
        if (
          _error?.status !== null &&
          _error?.status === ZErrorCodeEnum.unauthenticated
        ) {
          // clear localstorage
          const authToken = await Storage.get(
            constants.localstorageKeys.authToken
          );
          if (authToken !== null || authToken !== undefined) {
            await Promise.all([
              Storage.remove(constants.localstorageKeys.userData),
              Storage.remove(constants.localstorageKeys.authToken)
            ]);
          }

          // if we don't want to refresh the page then we need to use navigate(), we tried that right now but, it's giving a infinite loop error, so that's why right now going with window.location.href method
          window.location.href = AppRoutes.login;

          // showInfoNotification(MESSAGES.Login.loginExpiredMessage);
        } else if (_error?.status === ZErrorCodeEnum.notFound) {
          // const _data = {
          //   message: _errorMessage ?? "Not found",
          //   status: _error?.status,
          // };
          //   void Storage.set(localstorageKeys.ERROR_DATA, _data);
          // redirect to 404
          // window.location.replace(ZaionsRoutes.Error.Z404);
        } else {
          // showing error alert...
        }
      } else {
        // showing error alert...
      }

      // throw the request_failed error
      _showAlertOnError && reportCustomError(error);
    })();
  }

  if (_response?.data !== null && _response?.data !== undefined) {
    // onSucceed dismissing loader...
    // zConsoleLog({
    // message:
    // 'From ZaionsHook -> useZRQCreateRequest -> useQuery -> onSuccess',
    // data: _data,
    // });
  }

  return _response;
};

/**
 * The custom hook for create data from an API using useQuery hook from react-query package.
 * @param _url URL of the API for create data.
 * @param _queriesKeysToInvalidate _queriesKeysToInvalidate param means queryKey of the useQuery to invalidate query.
 * query.
 * @returns return an presentZIonErrorAlert and error if not succeed. if success then a new recode will created.
 */
export const useZRQCreateRequest = <T>({
  _url,
  _queriesKeysToInvalidate,
  _authenticated,
  _itemsIds,
  _urlDynamicParts,
  _contentType = zAxiosApiRequestContentType.Json,
  _showAlertOnError = true,
  _showLoader = true,
  _loaderMessage = ''
}: {
  _url: ApiUrlEnum;
  _queriesKeysToInvalidate?: QueryFilters | QueryKey;
  _authenticated?: boolean;
  _itemsIds?: string[];
  _urlDynamicParts?: string[];
  _contentType?: zAxiosApiRequestContentType;
  _showAlertOnError?: boolean;
  _showLoader?: boolean;
  _loaderMessage?: string;
}): UseMutationResult<T | undefined, Error, string | FormData, void> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      _requestData: string | FormData
    ): Promise<T | undefined> => {
      /**
       * @_url - takes the post url to post data to api.
       *  second argument take the method (post | get | update | delete). as this is the post api so it  will be post
       * !second argument must be post because this hook is used to create data.
       * third argument is if this is the authenticated request or not.
       * @return return the data from api.
       */
      return await zAxiosApiRequest<T>({
        _url,
        _method: 'post',
        _isAuthenticatedRequest: _authenticated,
        _data: _requestData,
        _itemIds: _itemsIds,
        _urlDynamicParts,
        _contentType
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries(_queriesKeysToInvalidate as QueryFilters);
    },
    onSuccess: async (_data) => {
      // onSucceed dismissing loader...
      // await (_showLoader && dismissZIonLoader());
      if (_queriesKeysToInvalidate !== undefined) {
        await queryClient.invalidateQueries({
          queryKey: _queriesKeysToInvalidate as QueryKey
        });
      }
    },
    onError: async (_error) => {
      // throw the request_failed error
      _showAlertOnError && reportCustomError(_error);

      // check if it's unauthenticated error
      const errorCode = (_error as AxiosError)?.response?.status;
      if (
        errorCode !== undefined &&
        errorCode === ZErrorCodeEnum.unauthenticated
      ) {
        // clear localstorage
        const authToken = await Storage.get(
          constants.localstorageKeys.authToken
        );
        if (authToken !== null || authToken !== undefined) {
          await Promise.all([
            Storage.remove(constants.localstorageKeys.userData),
            Storage.remove(constants.localstorageKeys.authToken)
          ]);
        }

        // if we don't want to refresh the page then we need to use navigate(), we tried that right now but, it's giving a infinite loop error, so that's why right now going with window.location.href method
        window.location.href = AppRoutes.login;
      }
    },

    networkMode: 'offlineFirst' // will remove later
  });
};

/**
 * The custom hook for updating recode from an API using useQuery hook from react-query package.
 * @param _url URL of the API for update recode.
 * @param _queriesKeysToInvalidate _queriesKeysToInvalidate param means queryKey of the useQuery to invalidate query.
 * query.
 * @returns return an presentZIonErrorAlert and error if not succeed. if success then a recode will updated.
 */
export const useZRQUpdateRequest = <T>({
  _url,
  _queriesKeysToInvalidate,
  _authenticated,
  _contentType = zAxiosApiRequestContentType.Json,
  _showAlertOnError = true
}: {
  _url: ApiUrlEnum;
  _queriesKeysToInvalidate?: QueryFilters | QueryKey;
  _authenticated?: boolean;
  _contentType?: zAxiosApiRequestContentType;
  _showAlertOnError?: boolean;
  _showLoader?: boolean;
  _loaderMessage?: string;
}): UseMutationResult<
  T | undefined,
  Error,
  {
    itemIds?: string[];
    urlDynamicParts?: string[];
    requestData: string;
  },
  void
> => {
  // const { presentZIonErrorAlert } = useZIonErrorAlert();
  // const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
  // const queryClient = useQueryClient();
  // const resetUserAccountState = useResetRecoilState(
  //   ZaionsUserAccountRStateAtom
  // );

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      // Please note, the "itemIds" & "urlDynamicParts" array length should be equal, mean, if you pass 4 ids in "itemIds", then you need to pass 4 strings representing the dynamic parts in "urlDynamicParts" array, so we can replace all dynamic/id parts with the respective IDs properly.
      // the way how we replace the IDs is simple, the first index in "itemIds" will replace the first id defined in "urlDynamicParts" in the url.
      // e.g:
      /*
       * Url: https://localhost/api/:id1/something/:id2 ...
       * itemIds: [1,2]
       * urlDynamicParts: [':id1', ':id2']
       * finalUrl: https://localhost/api/1/something/2 ...
       */
      itemIds, // this will be array of ids which we need to replace in url with the "urlDynamicParts"
      urlDynamicParts, // this will be array of strings defining the "dynamic/id" parts in url, which will get replaced with the itemIds passed above.
      requestData
    }: {
      itemIds?: string[];
      urlDynamicParts?: string[];
      requestData: string;
    }): Promise<T | undefined> => {
      // Present ion loading before api start
      // _showLoader && (await presentZIonLoader(_loaderMessage));
      /**
       * @_url - takes the post url to post data to api.
       *  second argument take the method (post | get | update | delete). as this is the put api for updating so it  will be put
       * !second argument must be put because this hook is used to update data.
       * third argument is if this is the authenticated request or not.
       * @return return the data from api.
       */
      // const generateEditURl =
      return await zAxiosApiRequest({
        _url,
        _method: 'put',
        _isAuthenticatedRequest: _authenticated,
        _data: requestData,
        _itemIds: itemIds,
        _urlDynamicParts: urlDynamicParts,
        _contentType
      });
    },
    onMutate: () => {
      void queryClient.cancelQueries(_queriesKeysToInvalidate as QueryFilters);
    },
    onSuccess: (_data) => {
      // onSucceed dismissing loader...
      // void (_showLoader && dismissZIonLoader());
      if (_queriesKeysToInvalidate !== undefined) {
        void queryClient.invalidateQueries({
          queryKey: _queriesKeysToInvalidate as QueryKey
        });
      }
    },
    onError: async (_error) => {
      // OnError dismissing loader...
      // void (_showLoader && dismissZIonLoader());

      // showing error alert...
      // void (_showAlertOnError && presentZIonErrorAlert());
      // TODO create a helper function to throw a ZCustomError so if we add sentry or some other error logging then it will be easy to track that as well

      // throw the request_failed error
      _showAlertOnError && reportCustomError(_error);

      // check if it's unauthenticated error
      const errorCode = (_error as AxiosError)?.response?.status;
      if (
        errorCode !== undefined &&
        errorCode === ZErrorCodeEnum.unauthenticated
      ) {
        // clear localstorage
        const authToken = await Storage.get(
          constants.localstorageKeys.authToken
        );
        if (authToken !== null || authToken !== undefined) {
          await Promise.all([
            Storage.remove(constants.localstorageKeys.userData),
            Storage.remove(constants.localstorageKeys.authToken)
          ]);
        }

        // if we don't want to refresh the page then we need to use navigate(), we tried that right now but, it's giving a infinite loop error, so that's why right now going with window.location.href method
        window.location.href = AppRoutes.login;
      }
    },

    networkMode: 'offlineFirst' // will remove later
  });
};

/**
 * The custom hook for deleting recode from an API using useQuery hook from react-query package.
 * @param _url URL of the API for deleting recode.
 * @param _queriesKeysToInvalidate _queriesKeysToInvalidate param means queryKey of the useQuery to invalidate query.
 * query.
 * @returns return an presentZIonErrorAlert and error if not succeed. if success then a recode will deleted.
 */
export const useZRQDeleteRequest = <T>({
  _url,
  _queriesKeysToInvalidate,
  _authenticated,
  _showAlertOnError = true,
  _showLoader = true,
  _loaderMessage = ''
}: {
  _url: ApiUrlEnum;
  _queriesKeysToInvalidate?: QueryFilters;
  _authenticated?: boolean;
  _showAlertOnError?: boolean;
  _showLoader?: boolean;
  _loaderMessage?: string;
}): UseMutationResult<
  T | undefined,
  Error,
  {
    itemIds?: string[];
    urlDynamicParts?: string[];
  },
  void
> => {
  // const { presentZIonErrorAlert } = useZIonErrorAlert();
  // const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
  // const queryClient = useQueryClient();
  // const resetUserAccountState = useResetRecoilState(
  //   ZaionsUserAccountRStateAtom
  // );
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      itemIds,
      urlDynamicParts
    }: {
      itemIds?: string[];
      urlDynamicParts?: string[];
    }): Promise<T | undefined> => {
      // Present ion loading before api start
      // _showLoader && (await presentZIonLoader(_loaderMessage));

      /**
       * @_url - takes the post url to post data to api.
       *  second argument take the method (post | get | update | delete). as this is the delete api so it  will be delete
       * !second argument must be delete because this hook is used to delete data.
       * third argument is if this is the authenticated request or not.
       * @return return the data from api.
       */
      // const generateEditURl =
      return await zAxiosApiRequest({
        _url,
        _method: 'delete',
        _isAuthenticatedRequest: _authenticated,
        _data: undefined,
        _itemIds: itemIds,
        _urlDynamicParts: urlDynamicParts
      });
    },
    onMutate: () => {
      void queryClient.cancelQueries(_queriesKeysToInvalidate);
    },
    onSuccess: (_data) => {
      // onSucceed dismissing loader...
      // void (_showLoader && dismissZIonLoader());
      if (_queriesKeysToInvalidate !== undefined) {
        void queryClient.invalidateQueries({
          queryKey: _queriesKeysToInvalidate as QueryKey
        });
      }
    },
    onError: async (_error) => {
      // OnError dismissing loader...
      // void (_showLoader && dismissZIonLoader());

      // showing error alert...
      // void (_showAlertOnError && presentZIonErrorAlert());
      // TODO create a helper function to throw a ZCustomError so if we add sentry or some other error logging then it will be easy to track that as well

      // throw the request_failed error
      reportCustomError(_error);

      // check if it's unauthenticated error
      const errorCode = (_error as AxiosError)?.response?.status;
      if (
        errorCode !== undefined &&
        errorCode === ZErrorCodeEnum.unauthenticated
      ) {
        // clear localstorage
        const authToken = await Storage.get(
          constants.localstorageKeys.authToken
        );
        if (authToken !== null || authToken !== undefined) {
          await Promise.all([
            Storage.remove(constants.localstorageKeys.userData),
            Storage.remove(constants.localstorageKeys.authToken)
          ]);
        }

        // if we don't want to refresh the page then we need to use navigate(), we tried that right now but, it's giving a infinite loop error, so that's why right now going with window.location.href method
        window.location.href = AppRoutes.login;
      }
    }
  });
};

/**
 * Custom hook for updating records of react-query package.
 *
 * @returns An object with the `updateRQCDataHandler` function for updating records.
 */
export const useZUpdateRQCacheData = (): {
  updateRQCDataHandler: <T>({
    key,
    data,
    id,
    updaterAction,
    extractType
  }: {
    key: string | string[];
    id?: string;
    data?: T;
    extractType?: ZRQGetRequestExtractEnum | undefined;
    updaterAction?: ZRQUpdaterAction;
  }) => unknown;
} => {
  const ZUserRState = useRecoilValue(ZUserRStateAtom);
  try {
    const queryClient = useQueryClient();

    const updateRQCDataHandler = <T>({
      key,
      data,
      id,
      extractType = ZRQGetRequestExtractEnum.extractItems,
      updaterAction = ZRQUpdaterAction.replace
    }: {
      key: string | string[];
      id?: string;
      data?: T;
      updateHoleData?: boolean;
      extractType?: ZRQGetRequestExtractEnum;
      updaterAction?: ZRQUpdaterAction;
    }): unknown => {
      if (updaterAction === ZRQUpdaterAction.updateHole) {
        queryClient.setQueryData(
          [ZUserRState?.id, ...key],
          (oldData: unknown) => {
            const updatedData = structuredClone(oldData);
            switch (extractType) {
              case ZRQGetRequestExtractEnum.extractItem:
                (updatedData as { data: { item: T } }).data.item = data as T;
                break;

              case ZRQGetRequestExtractEnum.extractItems:
                (updatedData as { data: { items: T } }).data.items = data as T;
                break;
            }

            return updatedData;
          }
        );
      } else if (updaterAction === ZRQUpdaterAction.replace) {
        const _res = queryClient.setQueryData(
          [ZUserRState?.id, ...key],
          (oldData: unknown) => {
            if (oldData !== undefined) {
              if (Array.isArray(oldData)) {
                const updatedData = [...oldData];
                const index = updatedData.findIndex((el) => el.id === id);
                if (index !== -1) {
                  updatedData[index] = data;
                }
                return updatedData;
              } else if (typeof oldData === 'object') {
                const updatedData = structuredClone(oldData);
                const actualDataItems = (
                  updatedData as { data: { items: unknown[] } }
                )?.data?.items;
                if (
                  actualDataItems !== undefined &&
                  Array.isArray(actualDataItems) &&
                  actualDataItems.length > 0
                ) {
                  const updatedDataItems = [...actualDataItems];
                  const index = updatedDataItems.findIndex(
                    (el: unknown) => (el as { id: string })?.id === id
                  );
                  if (index !== -1) {
                    updatedDataItems[index] = data;
                  }
                  (updatedData as { data: { items: unknown[] } }).data.items =
                    updatedDataItems;
                }
                return updatedData;
              }
            }
            return oldData;
          }
        );

        return _res;
      } else if (updaterAction === ZRQUpdaterAction.add) {
        const _res = queryClient.setQueryData(
          [ZUserRState?.id, ...key],
          (oldData: unknown) => {
            if (Array.isArray(oldData)) {
              const updatedData = [...(oldData ?? []), data];
              return updatedData;
            } else if (typeof oldData === 'object') {
              const updatedData = structuredClone(oldData);
              const actualDataItems = (
                updatedData as { data: { items: unknown[] } }
              )?.data?.items;

              const updatedDataItems = [...(actualDataItems ?? []), data];
              (updatedData as { data: { items: unknown[] } }).data.items =
                updatedDataItems;

              return updatedData;
            }
            return oldData;
          }
        );

        return _res;
      } else if (updaterAction === ZRQUpdaterAction.delete) {
        const _res = queryClient.setQueryData(
          [ZUserRState?.id, ...key],
          (oldData: unknown) => {
            if (oldData !== undefined) {
              if (Array.isArray(oldData)) {
                const updatedData = oldData.filter((el) => el.id !== id);
                return updatedData;
              } else if (typeof oldData === 'object') {
                const updatedData = structuredClone(oldData);
                const actualDataItems = (
                  updatedData as { data: { items: unknown[] } }
                )?.data?.items;
                if (
                  actualDataItems !== undefined &&
                  Array.isArray(actualDataItems) &&
                  actualDataItems.length > 0
                ) {
                  const updatedDataItems = actualDataItems.filter(
                    (el) => (el as { id?: string })?.id !== id
                  );
                  (updatedData as { data: { items: unknown[] } }).data.items =
                    updatedDataItems;
                }
                return updatedData;
              }
            }
            return oldData;
          }
        );

        return _res;
      } else {
        void showZAlert({
          title: 'Invalid updaterAction type pass to useZUpdateRQCacheData'
        });
      }
    };

    return { updateRQCDataHandler };
  } catch (error) {
    reportCustomError(error);
    return { updateRQCDataHandler: emptyVoidReturnFunction };
  }
};

/**
 * Custom hook to invalidate React Query cache for specific queries.
 * @returns An object containing a function to invalidate React Query cache.
 */
export const useZInvalidateReactQueries = ():
  | {
    zInvalidateReactQueries: (
      _queriesKeysToInvalidate?: string[]
    ) => Promise<void>;
  }
  | {
    zInvalidateReactQueries: () => void;
  } => {
  const queryClient = useQueryClient();
  const ZUserRState = useRecoilValue(ZUserRStateAtom);
  try {
    /**
     * Function to invalidate React Query cache for specific queries.
     * @param _queriesKeysToInvalidate Optional array of query keys to invalidate.
     * @returns A Promise that resolves once the cache invalidation is completed.
     */
    const zInvalidateReactQueries = async (
      _queriesKeysToInvalidate?: string[]
    ): Promise<void> => {
      await queryClient.invalidateQueries({
        queryKey: [ZUserRState?.id, ...(_queriesKeysToInvalidate ?? [])]
      });
    };

    return { zInvalidateReactQueries };
  } catch (error) {
    reportCustomError(error);
    return { zInvalidateReactQueries: emptyVoidReturnFunction };
  }
};
