/**
 * Enums
 */
export enum ZAwsSignUpStep {
  signUp = 'SIGN_UP',
  confirmSignUp = 'CONFIRM_SIGN_UP',
  done = 'DONE',
  completeAutoSignIn = 'COMPLETE_AUTO_SIGN_IN'
}

export enum ZAwsResetPasswordStep {
  resetPassword = 'RESET_PASSWORD',
  confirmResetPasswordWithCode = 'CONFIRM_RESET_PASSWORD_WITH_CODE',
  done = 'DONE'
}

export enum ZAwsLoginStep {
  done = 'DONE'
}

export enum ZErrorException {
  InvalidPasswordException = 'InvalidPasswordException',
  UsernameExistsException = 'UsernameExistsException',
  AliasExistsException = 'AliasExistsException',
  CodeMismatchException = 'CodeMismatchException',
  ExpiredCodeException = 'ExpiredCodeException',
  LimitExceededException = 'LimitExceededException',
  NotAuthorizedException = 'NotAuthorizedException',
  AuthTokenConfigException = 'AuthTokenConfigException',
  UserUnAuthenticatedException = 'UserUnAuthenticatedException',
  EmptySignUpUsername = 'EmptySignUpUsername'
}
/**
 * Interfaces
 */
