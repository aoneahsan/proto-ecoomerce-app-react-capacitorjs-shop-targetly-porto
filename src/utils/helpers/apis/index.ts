/* eslint-disable no-console */
import { AppRoutes } from '@/Routes/AppRoutes';
import {
  zAxiosApiRequestContentType,
  type zAxiosApiRequestInterface
} from '@/types/global/zapi-hooks.type';
import axiosInstance from '@/axiosInstance';
import constants from '@/utils/constants';
import ENVS from '@/utils/envKeys';
import { Storage, getAuthToken, reportCustomError } from '@/utils/helpers';
import { type AxiosRequestConfig } from 'axios';
import { messages } from '@/utils/messages';
import { type ApiUrlEnum } from '@/utils/enums/apis.enum';
import { type ZGenericObject } from '@/types/global/index.type';
import {
  type ZLinkGetApiType,
  type ZLinkMutateApiType,
  extractInnerDataObjectEnum,
  extractInnerDataOptionsEnum
} from '@/types/apis/index.type';

/**
 * Executes an Axios API request with specified parameters.
 *
 * @template T - The expected response type.
 * @param _url - The API endpoint URL. (ApiUrlEnum enum)
 * @param _method - The HTTP method for the request.
 * @param _isAuthenticatedRequest - A flag indicating whether the request requires authentication.
 * @param _data - The data to be sent in the request body.
 * @param _itemIds - An array of item IDs for dynamic URL construction.
 * @param _urlDynamicParts - An array of dynamic parts in the URL for replacement.
 * @param _contentType - The content type of the request (default is JSON).
 * @returns A Promise resolving to the response data of type T, or undefined.
 * @throws Error if the request fails or encounters an error.
 */
export const zAxiosApiRequest = async <T>({
  _url,
  _method,
  _isAuthenticatedRequest = true,
  _data,
  _itemIds,
  _urlDynamicParts,
  _contentType = zAxiosApiRequestContentType.Json
}: zAxiosApiRequestInterface): Promise<T | undefined> => {
  // Getting authToken from Storage.
  const _authToken = await getAuthToken();

  // authToken is fount or not authenticatedRequest request then
  if (_authToken !== undefined || !_isAuthenticatedRequest) {
    // Creating an axios config object.
    const reqInput: AxiosRequestConfig = {
      method: _method,
      data: _data,
      url: getApiUrl(_url, _itemIds, _urlDynamicParts),
      headers: {
        Accept: zAxiosApiRequestContentType.Json,
        'Content-Type': _contentType,
        Authorization: `${constants.api.tokenPrimaryKey} ${_authToken ?? ''}`
      }
    };

    // Making axios request.
    const _res = await axiosInstance.request(reqInput);

    // retuning data of type T
    return _res?.data as unknown as T;

    // else if this is an authenticatedRequest and authToken is not fount then
  } else if (_isAuthenticatedRequest && _authToken === undefined) {
    // Remove data from Storage.
    await Promise.all([
      Storage.remove(constants.localstorageKeys.userData),
      Storage.remove(constants.localstorageKeys.authToken)
    ]);

    // Redirect to login.
    // eslint-disable-next-line
    // redirect({
    //   to: AppRoutes.login
    // });

    window.location.href = AppRoutes.login;
  } else {
    throw new Error(messages.general.failed);
  }
};

/**
 * Constructs the complete API URL based on the provided parameters.
 *
 * @param url - The API endpoint URL or enum.
 * @param itemIds - An array of item IDs for dynamic URL construction.
 * @param urlDynamicParts - An array of dynamic parts in the URL for replacement.
 * @param includeAPIDefault - A flag indicating whether to include the default API URL.
 * @param isExternalThirdPartyAPI - A flag indicating whether the API is an external third-party API.
 * @returns The complete API URL as a string, or undefined if an error occurs.
 */
export const getApiUrl = (
  url: ApiUrlEnum,
  itemIds?: string[],
  urlDynamicParts?: string[],
  includeAPIDefault = true,
  isExternalThirdPartyAPI = false
): string | undefined => {
  try {
    let _url: string | ApiUrlEnum;
    if (isExternalThirdPartyAPI) {
      _url = url;
    } else {
      _url = `${ENVS.apiUrl}${url}`;
    }

    if (
      itemIds !== undefined &&
      urlDynamicParts !== undefined &&
      itemIds.length === urlDynamicParts.length
    ) {
      for (let i = 0; i < urlDynamicParts.length; i++) {
        const dynamicPart = urlDynamicParts[i];
        if (String(_url).includes(dynamicPart)) {
          const itemId = itemIds[i];
          _url = String(_url).replace(dynamicPart, itemId);
        }
      }
    } else if (itemIds?.length !== urlDynamicParts?.length) {
      throw new Error('length does not match. invalid length');
    }
    return String(_url);
  } catch (error) {
    reportError(error);
  }
};

/**
 * (extractInnerData)
 * Function for extract the data, the item or items from object or from api request...
 * this function will take two parameters
 * @param _object this will be the object from we went to extract the data out
 * @param _type enum (extractInnerDataOptionsEnum) menus how the data will extract
 * @returns
 */
export const extractInnerData = <T>(
  _object: ZGenericObject<string> | unknown,
  _type: extractInnerDataOptionsEnum,
  _objectType: extractInnerDataObjectEnum = extractInnerDataObjectEnum.data
): T | undefined => {
  try {
    // checking _object and _type is passed.
    if (_object !== undefined && _type !== undefined) {
      if (_objectType !== undefined && _objectType !== null) {
        switch (_objectType) {
          case extractInnerDataObjectEnum.data:
            // extract accounting to the type
            switch (_type) {
              case extractInnerDataOptionsEnum.createRequestResponseItem:
                return (_object as unknown as ZLinkMutateApiType<T>).data.item;

              case extractInnerDataOptionsEnum.createRequestResponseItems:
                return (_object as unknown as ZLinkGetApiType<T>).data.items;

              case extractInnerDataOptionsEnum.createRequestResponseData:
                return (_object as { data: T }).data;

              default:
                console.error({
                  message: `Unsupported extractInnerData type option: ${String(
                    _type
                  )}`
                });
            }
            break;
          case extractInnerDataObjectEnum.error:
            // extract accounting to the type
            switch (_type) {
              case extractInnerDataOptionsEnum.createRequestResponseItem:
                return (_object as unknown as { errors: { item: T } }).errors
                  .item;

              case extractInnerDataOptionsEnum.createRequestResponseItems:
                return (_object as unknown as { errors: { items: T } }).errors
                  .items;

              case extractInnerDataOptionsEnum.createRequestResponseData:
                return (_object as { errors: T }).errors;

              default:
                console.error({
                  message: `Unsupported extractInnerData type option: ${String(
                    _type
                  )}`
                });
            }
        }
      }

      // if any of the required parameter is not passed show invalid parameter dialog
    } else {
      // alert({
      //   title: "extractInnerData, invalid parameters!",
      //   message: "extractInnerData: parameters _object & _type are required",
      // });

      console.error({
        message: 'Invalid parameters passed to extractInnerData'
      });
    }
  } catch (error) {
    reportCustomError(error);
  }
};
