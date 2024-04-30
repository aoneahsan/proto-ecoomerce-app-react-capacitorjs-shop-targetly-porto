const authUrlCommonPath = '/app';

const routeParams = {
  clientId: '$clientId',
  invoiceId: '$invoiceId',
  invoiceType: '$invoiceType'
} as const;

const AppRoutesCommonPath = {
  onBoarding: '/onboarding',

  auth: {
    profileSetting: `${authUrlCommonPath}/profile-setting`,
    clientForm: `${authUrlCommonPath}/client`,
    invoiceForm: `${authUrlCommonPath}/invoice/${routeParams.invoiceType}`
  }
} as const;

const AppRoutesE = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  category: '/category',
  product: '/product',

  onBoardingSub: {
    profileDetailsStep: {
      path: '/profile-details',
      completePath: `${AppRoutesCommonPath.onBoarding}/profile-details`
    },
    currencyDetailsStep: {
      path: '/currency-details',
      completePath: `${AppRoutesCommonPath.onBoarding}/currency-details`
    },
    bankDetailsStep: {
      path: '/bank-details',
      completePath: `${AppRoutesCommonPath.onBoarding}/bank-details`
    }
  },

  authRoutes: {
    profileSettingSub: {
      credentials: {
        path: '/credentials',
        completePath: `${AppRoutesCommonPath.auth.profileSetting}/credentials`
      },
      profileDetails: {
        path: '/profile-details',
        completePath: `${AppRoutesCommonPath.auth.profileSetting}/profile-details`
      },
      currencyDetails: {
        path: '/currency-details',
        completePath: `${AppRoutesCommonPath.auth.profileSetting}/currency-details`
      },
      bankDetails: {
        path: '/bank-details',
        completePath: `${AppRoutesCommonPath.auth.profileSetting}/bank-details`
      }
    },

    client: `${authUrlCommonPath}/clients`,
    invoices: `${authUrlCommonPath}/invoices/${routeParams.invoiceType}`,

    clientSub: {
      create: {
        path: '/create',
        completePath: `${AppRoutesCommonPath.auth.clientForm}/create`
      },
      update: {
        path: `/update/${routeParams.clientId}`,
        completePath: `${AppRoutesCommonPath.auth.clientForm}/update/${routeParams.clientId}`
      }
    },

    invoiceSub: {
      create: {
        path: '/create',
        completePath: `${AppRoutesCommonPath.auth.invoiceForm}/create`
      },
      update: {
        path: `/update/${routeParams.invoiceId}`,
        completePath: `${AppRoutesCommonPath.auth.invoiceForm}/update/${routeParams.invoiceId}`
      }
    }
  },

  Testing: '/testing'
} as const;

// export const getFullPage

export const AppRoutes = {
  ...AppRoutesCommonPath,
  ...AppRoutesE
} as const;
