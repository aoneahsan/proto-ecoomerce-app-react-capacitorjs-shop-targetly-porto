import type { ApiUrlEnum } from '@/utils/enums123/apis.enum';

/**
 * Enums
 */
export enum zAxiosApiRequestContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data'
}

/**
 * Interfaces
 */
export interface zAxiosApiRequestInterface {
  _url: ApiUrlEnum;
  _method: 'get' | 'post' | 'put' | 'delete';
  _isAuthenticatedRequest?: boolean;
  _data?: string | FormData;
  _itemIds?: string[];
  _urlDynamicParts?: string[];
  _contentType?: zAxiosApiRequestContentType;
}
