import type { ZGenericObject } from '../Global/index.type';

export enum extractInnerDataOptionsEnum {
  createRequestResponseItem = 'createRequestResponseItem',
  createRequestResponseItems = 'createRequestResponseItems',
  createRequestResponseData = 'createRequestResponseData'
}

export enum extractInnerDataObjectEnum {
  data = 'data',
  error = 'error'
}

export interface ZLinkMutateApiType<T> {
  data: { item: T };
  errors: ZGenericObject<string>;
  message: string;
  status: number;
  success: boolean;
}

export interface ZLinkGetApiType<T> {
  data: { items: T };
  errors: ZGenericObject<string>;
  message: string;
  status: number;
  success: boolean;
}
