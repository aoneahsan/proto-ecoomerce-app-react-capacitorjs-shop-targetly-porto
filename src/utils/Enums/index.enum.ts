export enum zValidationRuleE {
  string = 'string',
  // Login and sign-up fields start
  username = 'username',
  email = 'email',
  password = 'password',
  confirm_password = 'confirm_password',
  // Login and sign-up fields end
  // Short link Form Fields start
  url = 'url',
  phoneNumber = 'phoneNumber',
  otp = 'otp',
  accountId = 'accountId',
  subject = 'subject',
  message = 'message',
  linkTitle = 'linkTitle'
}

export enum CONTAINS {
  number = 'number',
  letter = 'letter',
  specialSymbol = 'specialSymbol',
  minCharacter = 'minCharacter'
}
