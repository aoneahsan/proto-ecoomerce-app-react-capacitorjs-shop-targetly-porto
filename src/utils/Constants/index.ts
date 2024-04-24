/**
 * Product Information
 */
const productInfo = {
  name: 'Porto',
  domain: 'zaions.com'
} as const;

/**
 * Company Details
 */
export const companyBusinessDetails = {
  websiteUrl: 'https://zaions.com'
} as const;

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
 * Default metadata for React-Helmet component.
 */
const helmetDefaults = {
  title: `${productInfo.name} - Zaions`,
  description: `${productInfo.name} - eCommerce App`,
  keywords: 'zaions1, zaions2',
  author: 'Ahsan Mahmood',
  viewport: 'width=device-width, initial-scale=1.0',
  refresh: '8100',
  ogTitle: 'Zaions.com',
  ogType: 'website',
  ogUrl: companyBusinessDetails.websiteUrl,
  ogImage: '', // product logo here
  ogDescription: 'Zaions The Group of Projects',
  ogLocale: 'en_US',
  ogSiteName: 'Zaions',
  twitterCard: 'zaions_logo',
  twitterSite: '@zaions',
  twitterCreator: '#aoneahsan',
  twitterTitle: 'Zaions',
  twitterDescription: ' The Group of Projects',
  twitterImage: '', // product logo here
  shortcutIcon: '', // product logo here
  contentSecurityPolicy:
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  XUACompatible: 'ie=edge',
  copyRight: 'Copyright 2021',
  roboto: 'index,follow'
  // ...
} as const;

/**
 * Object containing various constants for the application.
 */
const constants = {
  productInfo,
  companyBusinessDetails,
  password,
  localstorageKeys,
  api,
  otpTimeLimit,
  deleteConfirmWords,
  showAllOption,
  externalSites,
  mediaScales,
  helmetDefaults
};

export default constants;
