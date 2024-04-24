/* eslint-disable no-console */
import { type ZFilterOptions } from './../../Types/Auth/index.type';
import { messages } from '@/utils/Messages';
import { ZValidator } from '@/Packages/Validator';
import constants from '@/utils/Constants';
import { CONTAINS, zValidationRuleE } from '../Enums/index.enum';
import { AES, enc } from 'crypto-js';
import { ENVS } from '@/utils/EnvKeys';
import { Preferences } from '@capacitor/preferences';
import { Dialog } from '@capacitor/dialog';
import { type ZInvoiceTypeE } from '@/Types/Auth/Invoice';
import dayjs from 'dayjs';
import { type ZPaginationInfoI } from '@/Types/Auth/index.type';
import { zAxiosApiRequestContentType } from '@/Types/Global/zapi-hooks.type';

/**
 * A utility function that logs a message and returns void.
 */
export const emptyVoidReturnFunction = (): void => {
  // eslint-disable-next-line no-console
  console.info({ message: 'emptyVoidReturnFunction' });
};

/**
 * A utility function that logs a message and returns a void Promise.
 */
export const emptyVoidReturnFunctionPromise = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  console.info({ message: 'emptyVoidReturnFunction' });
};

/**
 * Serializes an object to a JSON-formatted string.
 *
 * @param _data - The data to be stringified.
 * @returns The JSON-formatted string.
 * To parsed JSON, use zJsonParse helper function
 */
export const zStringify = (_data: unknown): string => {
  return JSON.stringify(_data);
};

/**
 * Parses a JSON-formatted string into an object of the specified type.
 *
 * @param _data - The JSON-formatted string to be parsed.
 * @returns The parsed object, or undefined if parsing fails.
 * To stringify JSON, use the zStringify helper function.
 */
export const zJsonParse = <T>(_data: string): T | undefined => {
  try {
    return JSON.parse(_data) as T;
  } catch (error) {
    return undefined;
  }
};

/**
 * Reports a custom error by logging it along with an optional message.
 *
 * @param errData - The error data to be reported.
 * @param message - An optional message to provide additional context.
 * @param showInConsole - A flag indicating whether to log the error in the console.
 */
export const reportCustomError = (
  errData: unknown,
  message?: string,
  showInConsole = true
): void => {
  try {
    const _data = {
      err: errData,
      message: `[reportCustomError] - ${message ?? ''}`
    };

    if (showInConsole) {
      // we will do some other logic as well, like sentry or datadog
      console.error(_data);
    }
  } catch (error) {
    console.error({ err: error });
  }
};

/**
 * Encrypts data using AES encryption with a specified secret.
 *
 * @param val - The data to be encrypted.
 * @returns The encrypted string.
 * For decrypting use decryptData helper function
 */
export const encryptData = (val: unknown): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return AES.encrypt(JSON.stringify(val), ENVS.cryptoSecret).toString();
};

/**
 * Decrypts an encrypted string using AES decryption with a specified secret.
 *
 * @param val - The encrypted string to be decrypted.
 * @returns The decrypted data, or undefined if decryption fails.
 * For encrypting use encryptData helper function
 */
export const decryptData = <T>(val: string): T | undefined => {
  try {
    return zJsonParse<T | undefined>(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      AES.decrypt(val, ENVS.cryptoSecret).toString(enc.Utf8)
    );
  } catch (err) {
    return undefined;
  }
};

/**
 * Utility object for handling secure storage operations.
 */
export const Storage = {
  get: async <T>(_key: string): Promise<T | undefined> => {
    const _val = (await Preferences.get({ key: _key })).value;
    if (_val !== null) {
      return await decryptData(_val);
    } else {
      return undefined;
    }
  },
  set: async (key: string, value: unknown): Promise<void> => {
    const valStr = encryptData(value);
    await Preferences.set({ key, value: valStr });
  },
  remove: async (key: string): Promise<void> => {
    await Preferences.remove({ key });
  },
  clear: async (key: string): Promise<void> => {
    await Preferences.clear();
  }
};

/**
 * Checks if the given value is a non-empty string.
 *
 * @param value - The string value to be checked.
 * @returns A boolean indicating whether the string is non-empty or not.
 */
export const isZNonEmptyString = (
  value: string | undefined | null
): boolean => {
  return value !== undefined && value !== null && value?.trim()?.length > 0;
};

/**
 * Checks if all the values in the given array are non-empty strings.
 *
 * @param values - An array of string values to be checked.
 * @returns A boolean indicating whether all strings in the array are non-empty or not.
 */
export const isZNonEmptyStrings = (
  values: Array<string | undefined | null>
): boolean => {
  const _result = values.every((_value) => isZNonEmptyString(_value));

  return _result;
};

/**
 * Converts a string to title case by adding spaces between lowercase and uppercase letters and converting to lowercase.
 *
 * @param s - The input string.
 * @returns The title case string.
 */
export const convertToTitleCase = (s: string): string => {
  // return s.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
  //   c ? (c as string).toUpperCase() : ' ' + (d as string).toUpperCase()
  // );
  return s
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
    .toLowerCase(); // Convert the string to lowercase
};

/**
 * Checks if a string contains certain types of characters based on the specified rule.
 *
 * @param val - The string to be checked.
 * @param contains - The rule specifying the type of characters to check for (e.g., number, letter, special symbol).
 * @returns A boolean indicating whether the string contains the specified characters.
 */
export const checkIfContains = (
  val: string,
  contains: CONTAINS = CONTAINS.number
): boolean => {
  switch (contains) {
    case CONTAINS.number:
      return /\d/.test(val);
    case CONTAINS.letter:
      return /[a-zA-Z]+/.test(val);
    case CONTAINS.specialSymbol:
      return /[\W_]+/.test(val);
    case CONTAINS.minCharacter:
      return val.length >= constants.password.minCharacter;

    default:
      return /\d/.test(val);
  }
};

/**
 * Validates a specific field based on the specified validation rule and updates the errors object accordingly.
 *
 * @param fieldKey - The key of the field to be validated.
 * @param values - The object containing field values.
 * @param errorsObj - The object containing errors for each field.
 * @param validationRule - The validation rule to be applied.
 */
export const validateField = (
  fieldKey: string,
  values: Record<string, unknown>,
  errorsObj: Record<string, unknown>,
  validationRule: zValidationRuleE = zValidationRuleE.string
): void => {
  const _fieldKeyTitleCase = convertToTitleCase(fieldKey);
  const _val = String(values[fieldKey])?.trim();
  /**
   * Checking in the field key is empty then give `fieldKey is required` error message (generally for every field)
   */
  if (
    !Object.prototype.hasOwnProperty.call(values, fieldKey) ||
    _val.length === 0
  ) {
    errorsObj[fieldKey] = `${_fieldKeyTitleCase} is required`;
  } else if (
    validationRule === zValidationRuleE.email &&
    !ZValidator.isEmail(_val)
  ) {
    errorsObj[fieldKey] = `${_fieldKeyTitleCase} needs to be a valid email.`;
  } else if (validationRule === zValidationRuleE.password) {
    if (!checkIfContains(_val, CONTAINS.minCharacter)) {
      errorsObj[fieldKey] =
        `${_fieldKeyTitleCase} needs to be at least 8 digits long.`;
    } else if (!checkIfContains(_val, CONTAINS.number)) {
      errorsObj[fieldKey] = `${_fieldKeyTitleCase} must include a digit.`;
    } else if (!checkIfContains(_val, CONTAINS.letter)) {
      errorsObj[fieldKey] = `${_fieldKeyTitleCase} must include a letter.`;
    } else if (!checkIfContains(_val, CONTAINS.specialSymbol)) {
      errorsObj[fieldKey] =
        `${_fieldKeyTitleCase} must include a special character.`;
    }
  } else if (
    validationRule === zValidationRuleE.url &&
    !ZValidator.isURL(_val)
  ) {
    errorsObj[fieldKey] = messages.formValidations.urlIncorrectFormate;
  } else if (
    validationRule === zValidationRuleE.phoneNumber &&
    !ZValidator.isMobilePhone(_val)
  ) {
    errorsObj[fieldKey] = messages.formValidations.phoneNumberRequired;
  } else if (validationRule === zValidationRuleE.otp) {
    if (
      !checkIfContains(_val, CONTAINS.minCharacter) ||
      _val?.length > constants.password.minCharacter
    ) {
      errorsObj[fieldKey] = `${_fieldKeyTitleCase} needs to be 6 digits`;
    }
  }
};

/**
 * Validates multiple fields based on the specified validation rules and updates the errors object accordingly.
 *
 * @param fieldKeys - An array of field keys to be validated.
 * @param values - The object containing field values.
 * @param errorsObj - The object containing errors for each field.
 * @param validationRules - An array of validation rules corresponding to the field keys.
 * for single filed validation use validateField function
 */
export const validateFields = (
  fieldKeys: string[],
  values: Record<string, unknown>,
  errorsObj: Record<string, unknown>,
  validationRules: zValidationRuleE[]
): void => {
  if (fieldKeys.length !== validationRules.length) {
    alert({
      title: 'Invalid Request!',
      message: 'Fields and Validation Rules array length not matching.'
    });
    return;
  }
  for (let i = 0; i < fieldKeys.length; i++) {
    const _field = fieldKeys[i];
    const _rule = validationRules[i];
    validateField(_field, values, errorsObj, _rule);
  }
};

/**
 * Retrieves the authentication token from local Storage.
 *
 * @returns A promise resolving to the authentication token or undefined if not found.
 */
export const getAuthToken = async (): Promise<string | undefined> => {
  // getting the auth token from local storage and storing it in authToken constant so we can check that the user is authenticated or not.
  return await Storage.get(constants.localstorageKeys.authToken);
};

/**
 * Displays a simple alert dialog with an optional title and message.
 *
 * @param title - The title of the alert dialog.
 * @param message - The message content of the alert dialog.
 * @returns A Promise that resolves when the alert is dismissed.
 */
export const showZAlert = async ({
  title = '',
  message = ''
}: {
  title?: string;
  message?: string;
}): Promise<void> => {
  await Dialog.alert({
    title,
    message
  });
};

/**
 * Displays a confirmation dialog with an optional title and message.
 *
 * @param title - The title of the confirmation dialog.
 * @param message - The message content of the confirmation dialog.
 * @returns A Promise that resolves to an object containing the boolean value indicating the user's choice.
 * `{ value: true }` if confirmed, `{ value: false }` if canceled.
 */
export const showZConfirm = async ({
  title = '',
  message = ''
}: {
  title?: string;
  message?: string;
}): Promise<{
  value: boolean;
}> => {
  const { value } = await Dialog.confirm({
    title,
    message
  });
  return { value };
};

/**
 * Displays a prompt dialog with an optional title and message.
 *
 * @param title - The title of the prompt dialog.
 * @param message - The message content of the prompt dialog.
 * @returns A Promise that resolves to an object containing the entered value and a boolean indicating whether the prompt was canceled.
 * `{ value: enteredValue, cancelled: false }` if a value is entered, `{ value: '', cancelled: true }` if canceled.
 */
export const showZPrompt = async ({
  title = '',
  message = ''
}: {
  title?: string;
  message?: string;
}): Promise<{
  value: string;
  cancelled: boolean;
}> => {
  const { value, cancelled } = await Dialog.prompt({
    title,
    message
  });
  return { value, cancelled };
};

/**
 * Generates an invoice number based on the provided parameters.
 * @param invoiceType The type of invoice ("invoice" or "expense").
 * @param companyName Optional. The name of the company to include in the invoice number.
 * @param invoiceNumber Optional. The existing invoice number to include.
 * @returns The generated invoice.
 */
export const generateInvoiceNo = (
  invoiceType: ZInvoiceTypeE,
  companyName?: string,
  invoiceNumber?: string
): string => {
  // this.invoiceForm.invoice_type == "invoice" ? "INV" : "EXP";
  let companyNameLetters = null;
  if ((companyName?.length ?? 0) > 3) {
    companyNameLetters = companyName?.substring(0, 3).toUpperCase();
  }
  if ((companyName?.length ?? 0) <= 3) {
    companyNameLetters = companyName?.toUpperCase();
  }
  const currentYear = dayjs().year();

  return (
    invoiceType.toString().toUpperCase() +
    companyNameLetters +
    invoiceNumber +
    currentYear
  );
};

/**
 * Calculates the total number of pages based on the total number of items and items per page.
 * @param total The total number of items.
 * @param perPage The number of items per page.
 * @returns The total number of pages.
 */
export const ZTotalPages = (total: number, perPage: number): number => {
  if (total > 0 && perPage > 0) {
    return Math.ceil(total / perPage);
  }
  return 0;
};

/**
 * Generates a pagination range based on the current page and the total number of pages.
 * @param current The current page.
 * @param total The total number of pages.
 * @returns An object containing the pagination range and range with dots.
 */
export const ZPaginate = (
  current: number,
  total: number
): {
  range: number[];
  rangeWithDots: Array<string | number>;
} => {
  const delta = 2;
  const left = current - delta;
  const right = current + delta;
  const range: number[] = [];
  const rangeWithDots: Array<string | number> = [];
  let previousPage = 0;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i > left && i < right)) {
      range.push(i);
    }
  }

  for (const currentPage of range) {
    if (previousPage) {
      if (currentPage - previousPage === 2) {
        rangeWithDots.push(previousPage + 1);
      } else if (currentPage - previousPage !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(currentPage);
    previousPage = currentPage;
  }

  return { range, rangeWithDots };
};

export const ZFilterData = <T>({
  data,
  filters,
  searchKey
}: {
  data: T;
  filters: ZFilterOptions;
  searchKey?: string | string[];
}): Array<(T & unknown[])[number]> => {
  let _data = null;
  if (Array.isArray(data) && data?.length > 0) {
    _data = [...data];

    if (filters?.search?.trim()?.length && searchKey !== undefined) {
      _data = _data?.filter((_item) => {
        if (typeof searchKey === 'string') {
          if (searchKey in _item) {
            return String(_item[searchKey])
              ?.trim()
              ?.toLocaleLowerCase()
              ?.includes(filters?.search ?? '');
          }
        } else if (Array.isArray(searchKey)) {
          return searchKey?.some((_key) => {
            if (_key in _item) {
              return String(_item[_key])
                ?.trim()
                ?.toLowerCase()
                ?.includes(filters?.search?.trim() ?? '');
            }
            return false; // Key not found in item
          });
        }

        return false;
      });
    }
  }
  return _data ?? [];
};

/**
 * Filters data based on provided options and search criteria.
 * @param data The data to be filtered.
 * @param filters The filter options to apply.
 * @param searchKey The key(s) to search within the data.
 * @returns An object containing the filtered data and pagination information.
 */
export const ZFilterAndPaginateData = <T>({
  data,
  filters,
  searchKey
}: {
  data: T;
  filters: ZFilterOptions;
  searchKey?: string | string[];
}): {
  _data: Array<(T & unknown[])[number]> | null;
  _paginationInfo: ZPaginationInfoI;
} => {
  const _paginationInfo: ZPaginationInfoI = {
    currentPage: filters?.currentPage,
    canGoNext: true,
    canGoPrevious: true
  };
  let _data = null;

  if (Array.isArray(data) && data?.length > 0) {
    _data = [...data];

    if (filters?.search?.trim()?.length && searchKey !== undefined) {
      _data = _data?.filter((_item) => {
        if (typeof searchKey === 'string') {
          if (searchKey in _item) {
            return String(_item[searchKey])
              ?.trim()
              ?.toLocaleLowerCase()
              ?.includes(filters?.search ?? '');
          }
        } else if (Array.isArray(searchKey)) {
          return searchKey?.some((_key) => {
            if (_key in _item) {
              return String(_item[_key])
                ?.trim()
                ?.toLowerCase()
                ?.includes(filters?.search?.trim() ?? '');
            }
            return false; // Key not found in item
          });
        }

        return false;
      });
    }

    _data = ZFilterData({
      data: _data,
      filters,
      searchKey
    });

    const _pages = ZTotalPages(_data?.length, filters?.itemPerPage);

    const { rangeWithDots } = ZPaginate(_paginationInfo?.currentPage, _pages);

    _paginationInfo.range = rangeWithDots;

    if (filters?.itemPerPage > 0) {
      if (_paginationInfo?.currentPage === _pages || !_data?.length) {
        _paginationInfo.canGoNext = false;
      }
      if (_paginationInfo?.currentPage < 2) {
        _paginationInfo.canGoPrevious = false;
      }

      if (filters?.itemPerPage >= _data?.length) {
        _paginationInfo.currentPage = 1;
      } else if (_paginationInfo.currentPage > _pages) {
        _paginationInfo.currentPage = _pages;
      }
      // pagination info
      _paginationInfo.from =
        (_paginationInfo?.currentPage - 1) * filters?.itemPerPage + 1;

      _paginationInfo.to = Math.min(
        _paginationInfo?.currentPage * filters?.itemPerPage,
        _data?.length
      );

      if (filters?.itemPerPage >= _data?.length) {
        _paginationInfo.from = 1;
      }
      // item to skip
      const _itemsToSkip =
        filters?.itemPerPage * (_paginationInfo?.currentPage - 1);
      _data = _data?.slice(_itemsToSkip).slice(0, filters?.itemPerPage);
    }
  }

  return { _data, _paginationInfo };
};

/**
 * this function will give the remaining time for count down component present in link-in-bio blocks.
 * @param countDownTimeFinishDate type string
 * @returns remaining time in milliseconds.
 */
export const getRemainingTimeForCountDown = (
  countDownTimeFinishDate: string | undefined
): number => {
  try {
    if (isZNonEmptyString(countDownTimeFinishDate)) {
      const endDate = dayjs(countDownTimeFinishDate);
      if (endDate.isValid()) {
        const remainingTimeInMilliSeconds = endDate.diff(
          dayjs(new Date()),
          'milliseconds'
        );

        return Date.now() + remainingTimeInMilliSeconds;
      } else {
        return 0;
      }
    } else {
      return 0; // time finished for countdown (as no date passed)
    }
  } catch (error) {
    reportCustomError(error);
    return 0;
  }
};

export const imageUrlToBase64 = async (url?: string): Promise<string> => {
  try {
    if (url !== undefined && isZNonEmptyString(url)) {
      // Getting authToken from Storage.
      const _authToken = await getAuthToken();
      const headers = new Headers({
        'Content-Type': zAxiosApiRequestContentType.Json,
        Authorization: `${constants.api.tokenPrimaryKey} ${_authToken ?? ''}`
        // Add other headers as needed
      });
      const request = new Request(url, {
        method: 'GET',
        headers
      });

      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`Failed to fetch image. Status: ${response.status}`);
      }
      const blob = await response.blob();
      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(blob);
      });

      return data as string;
    }
    return '';
  } catch (error) {
    console.error('Error fetching or converting image:', error);
    return '';
  }
};

/**
 * Replaces dynamic parts in a URL with corresponding values.
 * @param {string} url - The base URL string with dynamic parts.
 * @param {string[]} itemsId - An array of strings representing the dynamic parts to replace.
 * @param {string[]} urlDynamicParts - An array of strings representing the values to replace the dynamic parts.
 * @returns {string} The URL with dynamic parts replaced.
 */
export const replaceUrlDynamicParts = ({
  url,
  itemsId,
  urlDynamicParts
}: {
  url: string;
  itemsId: Array<number | string>;
  urlDynamicParts: Array<number | string>;
}): string => {
  if (itemsId?.length !== urlDynamicParts?.length) {
    throw new Error('itemsId and urlDynamicParts must have the same length.');
  }
  let resultUrl = url;

  for (let i = 0; i < urlDynamicParts?.length; i++) {
    const dynamicPart = String(urlDynamicParts[i]);
    if (String(resultUrl).includes(dynamicPart)) {
      const itemId = String(itemsId[i]);
      resultUrl = String(resultUrl).replace(dynamicPart, itemId);
    }
  }

  return resultUrl;
};
