import constants from '../constants';

const general = {
  failed: 'Request Failed.',
  blockReload: 'Are you sure you want to leave?'
} as const;

const formValidations = {
  // URL_INCORRECT_FORMATE
  urlIncorrectFormate:
    'Please enter a valid URL! like (https://yourlink.com) or (http://yourlink.com).',
  phoneNumberRequired: 'Phone number is require.',
  passwordNotMatch: 'Password does not match. please try again!',

  currency: 'currency is required.',
  resendCodeLimitExceeded:
    'Attempt limit exceeded, please try after some time.',
  resendCodeSuccess: 'Confirmation code resent successfully.'
} as const;

const auth = {
  unauthenticated: 'Unauthenticated, Please login to continue.',
  loginSuccess: 'Logged in successfully.',
  loggedSuccess: 'Logged out successfully.',
  registerSuccess: 'registered successfully.',
  resetPasswordSuccess: 'Password reset successfully. login to continue.',
  logoutConfirmDialog: {
    title: 'Confirm Logout',
    messages: 'Are you sure you want to logout?'
  },
  logoutLoader: 'Logging out please wait a second...',
  confirmNotMatch: 'Your confirmation input did not match.'
} as const;

const user = {
  profileDetails: 'Profile details added successfully.',
  profileDetailsUpdated: 'Profile details updated successfully.',
  currencyDetails: 'Currency details added successfully.',
  currencyDetailsUpdated: 'Currency details updated successfully.',
  bankDetails: 'Bank details added successfully.',
  bankDetailsUpdated: 'Bank details updated successfully.',
  changeCredentialsUpdated: 'Credentials updated successfully.',

  resetPassword: {
    otpSendSuccessfully: 'OTP (One-Time Password) has been sent to your email.',
    otpVerifiedSuccessfully: 'OTP (One-Time Password) has been verified.'
  }
} as const;

const client = {
  added: 'Client added successfully.',
  update: 'Client updated successfully.',
  confirmDialog: {
    title: 'Confirm Deletion',
    messages: `Are you sure you want to delete this client? The invoices & expenses attached to this client will also be deleted. please type '${constants.deleteConfirmWords.global}' for confirmation.`
  },
  deletingLoader: 'Deleting client please wait a second...',
  deleted: 'Client Deleted successfully.'
} as const;

const invoice = {
  added: 'Invoice added successfully.',
  update: 'Invoice updated successfully.',
  confirmDialog: {
    title: 'Confirm Deletion',
    messages: `Are you sure you want to delete this invoice?. please type '${constants.deleteConfirmWords.global}' for confirmation.`
  },
  deletingLoader: 'Deleting invoice please wait a second...',
  downloadLoader: 'downloading invoice please wait a second...',
  deleted: 'invoice deleted successfully.'
} as const;

const expense = {
  added: 'Expense added successfully.',
  update: 'Expense updated successfully.',
  confirmDialog: {
    title: 'Confirm Deletion',
    messages: `Are you sure you want to delete this expense?. please type '${constants.deleteConfirmWords.global}' for confirmation.`
  },
  deletingLoader: 'Deleting expense please wait a second...',
  deleted: 'Expense deleted successfully.'
} as const;

const login = {
  loggingIn: 'Logging in please wait a second...',
  loggedIn: 'Logged in successfully.'
} as const;

const register = {
  resendCodeSuccess: 'Confirmation code resent successfully.',
  resendingCodeSuccess: 'Resenting confirmation code please wait a second...',
  sendCodeSuccess: 'Confirmation code was sent to your email.',
  signingUp: 'Signing up please wait a second...',
  signUpDoneLogin: 'Sign up complete. Please log in to continue.',
  confirmingCode: 'Confirming verification code please wait a second...'
} as const;

const network = {
  noInternet: {
    title: 'Connection failure',
    message: `Cannot connect to ${constants.productInfo.name} because there is no Internet access available.`
  }
} as const;

export const messages = {
  general,
  formValidations,
  auth,
  user,
  client,
  invoice,
  expense,
  login,
  register,
  network
};
