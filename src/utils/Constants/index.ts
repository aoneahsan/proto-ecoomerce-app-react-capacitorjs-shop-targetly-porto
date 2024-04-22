/**
 * External Url's and other
 */
const externalSites = {
  mailto: 'support@nyuk.in',
  PUR: '' // Participate in user research
} as const;

/**
 * Can Resend Otp After otpTimeLimit (min)
 */
const otpTimeLimit = 5;

/**
 * Constant for the 'Show All' option
 */
const showAllOption = { value: 'showAll', label: 'Show All' };

/**
 * Delete Confirm Text
 */
const deleteConfirmWords = {
  global: 'delete'
} as const;

/**
 * Constant object defining password-related configurations.
 */
const password = {
  minCharacter: 6
} as const;

/**
 * Constant object defining keys used for storing data in local Storage.
 */
const localstorageKeys = {
  authToken: 'ejtufng_ligrjdf_i',
  userData: 'mlkfd_powefds_o',
  resetPassword: 'rezv_pesfeds_o'
} as const;

/**
 * Constant object defining configurations related to API requests.
 */
const api = {
  tokenPrimaryKey: 'Bearer'
} as const;

/**
 * @Medias BrackPoint:
 */
const mediaScales = {
  brackpoint_2xl: '1550px',
  brackpoint_xl: '1439px',
  brackpoint_lg: '1100px',
  brackpoint_md: '668px',
  brackpoint_sm: '500px',
  brackpoint_xs: '350px'
};

/**
 * Object containing various constants for the application.
 */
export const constants = {
  password,
  localstorageKeys,
  api,
  otpTimeLimit,
  deleteConfirmWords,
  showAllOption,
  externalSites,
  mediaScales
};
