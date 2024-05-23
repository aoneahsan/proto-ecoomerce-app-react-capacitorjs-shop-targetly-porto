/**
 * Enum's
 */

export enum RouteParams {
  clientId = ':clientId',
  invoiceId = ':invoiceId',
  invoiceType = ':invoiceType'
}

export enum ApiUrlEnum {
  register = '/register',
  profileDetails = '/profile-details',
  currencyDetails = '/currency-details',
  bankDetails = '/bank-details',
  login = '/login',
  logout = '/logout',
  forgotPasswordOtp = '/send-forget-password-otp',
  verifyOtp = '/verify-otp',
  resetPassword = '/reset-password',
  verifyAuthenticationStatus = '/verify-authentication-status',
  changeCredentials = '/change-credentials',

  // Client
  getClients = '/user/clients',
  createClient = '/user/client/create',
  viewClient = `/user/client/view/${RouteParams.clientId}`,
  updateClient = `/user/client/update/${RouteParams.clientId}`,
  deleteClient = `/user/client/destroy/${RouteParams.clientId}`,

  // Invoice
  getInvoices = `/user/invoice/${RouteParams.invoiceType}`,
  createInvoice = `/user/invoice/${RouteParams.invoiceType}/create`,
  viewInvoice = `/user/invoice/${RouteParams.invoiceType}/view/${RouteParams.invoiceId}`,
  updateInvoice = `/user/invoice/${RouteParams.invoiceType}/update/${RouteParams.invoiceId}`,
  deleteInvoice = `/user/invoice/${RouteParams.invoiceType}/destroy/${RouteParams.invoiceId}`,
  // downloadInvoice = `/user/invoice/${RouteParams.invoiceType}/download/${RouteParams.invoiceId}`,
  downloadInvoice = `/user/${RouteParams.invoiceType}/dom/${RouteParams.invoiceId}/z_kasdas`,
  loadDownloadInvoiceView = '/request-invoice-download',

  // Files
  getSingleFile = '/file-upload/getSingleFileUrl',
  uploadSingleFile = '/file-upload/uploadSingleFile',
  deleteSingleFile = '/file-upload/deleteSingleFile',
  checkIfSingleFileExists = '/file-upload/checkIfSingleFileExists',
  uploadFiles = '/file-upload/uploadFiles',

  // Ahsan Testing
  testPost = '/testPost'
}

export enum ZRQGetRequestExtractEnum {
  extractPage = 'extractPage',
  extractData = 'extractData',
  extractItems = 'extractItems',
  extractItem = 'extractItem'
}

export enum ZRQUpdaterAction {
  add = 'add',
  replace = 'replace',
  updateHole = 'updateHole',
  delete = 'delete'
}
