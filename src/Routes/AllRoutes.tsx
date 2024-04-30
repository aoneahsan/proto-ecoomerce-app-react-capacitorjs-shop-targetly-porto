// #region Packages imports
import {
  lazyRouteComponent,
  redirect,
  createRoute
} from '@tanstack/react-router';
// #endregion

// #region Custom imports
import { Storage } from '@/utils/Helpers';
import constants from '@/utils/Constants';
import tanstackRootRoute from './RootRoute';
import { AppRoutes } from '@/Routes/AppRoutes';
import { type ZAuthI } from '@/Types/Auth/index.type';
import { ZInvoiceTypeE } from '@/Types/Auth/Invoice';
// #endregion

// on window refresh
const privateRouteHandler = async (): Promise<void> => {
  await Promise.all([
    Storage.get(constants.localstorageKeys.authToken),
    Storage.get(constants.localstorageKeys.userData)
  ]).then(async ([authToken, userData]) => {
    if (authToken === undefined || authToken === null || userData === null) {
      // check api result
      // await zAxiosApiRequest({
      //   _url: ApiUrlEnum.verifyAuthenticationStatus,
      //   _method: "post",
      //   //     search: {
      //   //       redirect: location.href,
      //   //     },
      // });

      // eslint-disable-next-line
      throw redirect({
        to: AppRoutes.login
      });
    }
  });
};

const publicRouteHandler = async (): Promise<void> => {
  await Promise.all([
    Storage.get(constants.localstorageKeys.authToken),
    Storage.get(constants.localstorageKeys.userData)
  ]).then(async ([authToken, userData]) => {
    if (authToken !== undefined && userData !== undefined) {
      // eslint-disable-next-line
      throw redirect({
        to: AppRoutes.authRoutes.invoices,
        params: {
          invoiceType: ZInvoiceTypeE.inv
        }
      });
    }
  });
};

// #region  ----- Public routes -----
// --- Home
export const homeRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.home,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Public/Home')
  )
  // beforeLoad: async ({ location }) => {},
});

// --- Login
export const loginRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.login,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Public/Login')
  ),
  beforeLoad: publicRouteHandler
});

// --- Register
export const registerRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.register,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Public/Register')
  ),
  beforeLoad: publicRouteHandler
});

export const forgotRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.forgotPassword,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Public/ForgotPassword')
  ),
  beforeLoad: publicRouteHandler
});

// --- On Boarding
const onboardingRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.onBoarding,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Public/Register/Onboarding')
  ),
  beforeLoad: privateRouteHandler
});

/// --- -- On Boarding subs
// --- On Boarding profile
const onboardingProfileRoute = createRoute({
  getParentRoute: () => onboardingRoute,
  path: AppRoutes.onBoardingSub.profileDetailsStep.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Public/Register/Onboarding/Profile')
  ),
  beforeLoad: async () => {
    await privateRouteHandler();

    await Promise.all([Storage.get(constants.localstorageKeys.userData)]).then(
      async ([userData]) => {
        if (userData !== undefined && userData !== null) {
          if ((userData as ZAuthI)?.onboarding_details?.profile === true) {
            // eslint-disable-next-line
            throw redirect({
              to: AppRoutes.authRoutes.profileSettingSub.profileDetails
                .completePath
            });
          }
        }
      }
    );
  }
});

// --- On Boarding currency
const onboardingCurrencyRoute = createRoute({
  getParentRoute: () => onboardingRoute,
  path: AppRoutes.onBoardingSub.currencyDetailsStep.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Public/Register/Onboarding/Currency')
  ),
  beforeLoad: async () => {
    await privateRouteHandler();

    await Promise.all([Storage.get(constants.localstorageKeys.userData)]).then(
      async ([userData]) => {
        if (userData !== undefined && userData !== null) {
          if ((userData as ZAuthI)?.onboarding_details?.currency === true) {
            // eslint-disable-next-line
            throw redirect({
              to: AppRoutes.authRoutes.profileSettingSub.currencyDetails
                .completePath
            });
          }
        }
      }
    );
  }
});

// --- On Boarding bank
const onboardingBankRoute = createRoute({
  getParentRoute: () => onboardingRoute,
  path: AppRoutes.onBoardingSub.bankDetailsStep.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Public/Register/Onboarding/BankDetails')
  ),
  beforeLoad: async () => {
    await privateRouteHandler();

    await Promise.all([Storage.get(constants.localstorageKeys.userData)]).then(
      async ([userData]) => {
        if (userData !== undefined && userData !== null) {
          if ((userData as ZAuthI)?.onboarding_details?.bank_details === true) {
            // eslint-disable-next-line
            throw redirect({
              to: AppRoutes.authRoutes.profileSettingSub.bankDetails
                .completePath
            });
          }
        }
      }
    );
  }
});

/// --- -- On Boarding tree
export const onboardingRoutesTree = onboardingRoute.addChildren([
  onboardingProfileRoute,
  onboardingCurrencyRoute,
  onboardingBankRoute
]);

// #endregion

// #region  ----- Auth routes -----
// --- Profile Settings
const profileSettingsRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.auth.profileSetting,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Authenticated/Settings')
  ),
  beforeLoad: privateRouteHandler
  // pendingComponent: () => {
  //   return <h1>profileSettingsRoute loading :)</h1>;
  // }
});

// --- On Profile details
const authProfileDetails = createRoute({
  getParentRoute: () => profileSettingsRoute,
  path: AppRoutes.authRoutes.profileSettingSub.profileDetails.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Authenticated/Settings/Profile')
  ),
  beforeLoad: privateRouteHandler
});

const authCredentialsDetails = createRoute({
  getParentRoute: () => profileSettingsRoute,
  path: AppRoutes.authRoutes.profileSettingSub.credentials.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Authenticated/Settings/Credentials')
  ),
  beforeLoad: privateRouteHandler
});

const authCurrencyDetails = createRoute({
  getParentRoute: () => profileSettingsRoute,
  path: AppRoutes.authRoutes.profileSettingSub.currencyDetails.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Authenticated/Settings/Currency')
  ),
  beforeLoad: privateRouteHandler
});

const authBankDetailsDetails = createRoute({
  getParentRoute: () => profileSettingsRoute,
  path: AppRoutes.authRoutes.profileSettingSub.bankDetails.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Authenticated/Settings/BankDetails')
  ),
  beforeLoad: privateRouteHandler
});

/// --- -- On Profile settings tree
export const profileSettingsRoutesTree = profileSettingsRoute.addChildren([
  authProfileDetails,
  authCredentialsDetails,
  authCurrencyDetails,
  authBankDetailsDetails
]);

// --- Clients
export const clientRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.authRoutes.client,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Authenticated/Client')
  ),
  beforeLoad: privateRouteHandler
});

// --- Client form
export const clientFormRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.auth.clientForm,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Authenticated/Client/From')
  ),
  beforeLoad: privateRouteHandler
});

// --- Client create
const clientCreateRoute = createRoute({
  getParentRoute: () => clientFormRoute,
  path: AppRoutes.authRoutes.clientSub.create.path,
  beforeLoad: privateRouteHandler
});

// --- Client edit
const clientEditRoute = createRoute({
  getParentRoute: () => clientFormRoute,
  path: AppRoutes.authRoutes.clientSub.update.path,
  beforeLoad: privateRouteHandler
});

/// --- -- Client form tree
export const clientFormRouteTree = clientFormRoute.addChildren([
  clientCreateRoute,
  clientEditRoute
]);

// --- Invoice
export const invoiceRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.authRoutes.invoices,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Authenticated/Invoice')
  ),
  beforeLoad: privateRouteHandler
});

// --- Client form
export const invoiceFormRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.auth.invoiceForm,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Authenticated/Invoice/Form')
  ),
  beforeLoad: privateRouteHandler
});

// --- Invoice create
const invoiceCreateRoute = createRoute({
  getParentRoute: () => invoiceFormRoute,
  path: AppRoutes.authRoutes.invoiceSub.create.path,
  beforeLoad: privateRouteHandler
});

// --- Invoice edit
const invoiceEditRoute = createRoute({
  getParentRoute: () => invoiceFormRoute,
  path: AppRoutes.authRoutes.invoiceSub.update.path,
  beforeLoad: privateRouteHandler
});

/// --- -- Invoice form tree
export const invoiceFormRouteTree = invoiceFormRoute.addChildren([
  invoiceCreateRoute,
  invoiceEditRoute
]);

// #endregion

// #region  ----- Common routes -----
// --- Category
export const categoryRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.category,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Common/Category')
  )
  // beforeLoad: async ({ location }) => {},
});

// --- Product
export const productRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.product,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Common/Product')
  )
  // beforeLoad: async ({ location }) => {},
});

// #endregion

// #region  ----- Testing routes -----
export const testingRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.Testing,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/TestingPage')
  )
  // beforeLoad: privateRouteHandler
});

// #endregion
