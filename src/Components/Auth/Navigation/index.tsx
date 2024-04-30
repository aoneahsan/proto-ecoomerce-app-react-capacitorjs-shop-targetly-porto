// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useSetRecoilState } from 'recoil';
import { useMatchRoute } from '@tanstack/react-router';

// #endregion

// #region ---- Custom Imports ----
import { ZClassNames } from '@/Packages/ClassNames';
import ZButton from '@/Components/Elements/Button';
import { useZNavigate } from '@/ZHooks/Navigation.hook';
import {
  useZLoader,
  useZModal,
  useZSideBar
} from '@/ZHooks/ZGlobalComponents.hook';
import { AppRoutes } from '@/Routes/AppRoutes';
import { messages } from '@/utils/Messages';
import constants from '@/utils/Constants';
import { Storage, reportCustomError } from '@/utils/Helpers';
import { useZRQCreateRequest } from '@/ZHooks/zreactquery.hooks';
import { extractInnerData } from '@/utils/Helpers/APIS';

// #endregion

// #region ---- Types Imports ----
import { ZColorEnum, ZFill } from '@/utils/Enums/Elements.enum';
import { ApiUrlEnum } from '@/utils/Enums/apis.enum';
import { extractInnerDataOptionsEnum } from '@/Types/APIs/index.type';

// #endregion

// #region ---- Store Imports ----
import { ZUserRStateAtom } from '@/Store/Auth/User';
import { ZAuthTokenData } from '@/Store/Auth/index.recoil';

// #endregion

// #region ---- Images Imports ----
import { CloseSvg, ExitSvg, MenuSvg, productLogo } from '@/assets';
import { ZInvoiceTypeE } from '@/Types/Auth/Invoice';
import { type ZGenericObject } from '@/Types/Global/index.type';

// #endregion

// #region ---- Types Imports ----

// #endregion

const LogoutModal: React.FC<{
  hideModal: <A>(props?: ZGenericObject<A>) => void;
}> = ({ hideModal }) => {
  // #region Custom Hooks
  const { showLoader, hideLoader } = useZLoader();
  // #endregion

  // #region APIs
  const { mutateAsync: logoutAsyncMutate } = useZRQCreateRequest({
    _url: ApiUrlEnum.logout
  });
  // #endregion

  // #region Recoil
  const setZUserRStateAtom = useSetRecoilState(ZUserRStateAtom);

  const setZAuthTokenRStateAtom = useSetRecoilState(ZAuthTokenData);
  // #endregion

  // #region Functions
  const logoutHandler = async (): Promise<void> => {
    try {
      // showing loader.
      showLoader(messages.auth.logoutLoader);

      // api
      const _response = await logoutAsyncMutate('');

      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData<{
          isSuccess: boolean;
        }>(_response, extractInnerDataOptionsEnum.createRequestResponseData);

        if (_data?.isSuccess === true) {
          // Storing user data in user Recoil State.
          setZUserRStateAtom(() => null);

          // Storing token data in token Recoil State.
          setZAuthTokenRStateAtom(() => null);

          // Remove data from Storage.
          await Promise.all([
            Storage.remove(constants.localstorageKeys.userData),
            Storage.remove(constants.localstorageKeys.authToken)
          ]);

          // If success then show the success notification.
          // showSuccessNotification(messages.auth.loggedSuccess);

          // hiding loader.
          hideLoader();

          // hiding modal.
          // hideModal();

          // Redirect to login.
          window.location.href = AppRoutes.login;
          // void navigate({
          //   to: AppRoutes.login
          // });
        }
      }
    } catch (error) {
      // hiding loader.
      hideLoader();
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between w-full'>
        <h2 className='uppercase text-primary me-9 text-[1.5rem] lg:text-[2.25rem] font-black font-mont-heavy'>
          Logout
        </h2>
        <CloseSvg
          className='text-primary w-[1.2rem!important] h-[1.2rem!important] cursor-pointer'
          onClick={() => {
            hideModal();
          }}
        />
      </div>

      <div className='flex flex-col items-center justify-center w-full mt-5'>
        <p className='text-center text-tertiary mt-6 text-[1.2rem] font-black font-mont-heavy'>
          Are you sure you want to logout?
        </p>

        <div className='flex w-full gap-2 mt-10 maxSm:flex-col'>
          <ZButton
            className='sm:w-1/2'
            onClick={() => {
              void logoutHandler();
            }}
          >
            Logout
          </ZButton>
          <ZButton
            className='sm:w-1/2'
            fill={ZFill.outline}
            onClick={() => {
              hideModal();
            }}
          >
            Cancel
          </ZButton>
        </div>
      </div>
    </div>
  );
};

const ZAuthNavigation: React.FC = () => {
  // #region Custom Hooks
  const { openSidebar } = useZSideBar({
    component: ZNavSidebarContent
  });
  const navigate = useZNavigate();
  const matchRoute = useMatchRoute();

  //
  const isCredentialsRoute = matchRoute({
    to: AppRoutes.authRoutes.profileSettingSub.credentials.completePath
  });

  const isProfileDetailsRoute = matchRoute({
    to: AppRoutes.authRoutes.profileSettingSub.profileDetails.completePath
  });

  const isCurrencyDetailsRoute = matchRoute({
    to: AppRoutes.authRoutes.profileSettingSub.currencyDetails.completePath
  });

  const isBankDetailsRoute = matchRoute({
    to: AppRoutes.authRoutes.profileSettingSub.bankDetails.completePath
  });

  const isInvoiceRoute = matchRoute({
    to: AppRoutes.authRoutes.invoices,
    params: {
      invoiceType: ZInvoiceTypeE.inv
    }
  });
  const isClientRoute = matchRoute({
    to: AppRoutes.authRoutes.client
  });

  const isExpensesRoute = matchRoute({
    to: AppRoutes.authRoutes.invoices,
    params: {
      invoiceType: ZInvoiceTypeE.exp
    }
  });
  // #endregion

  // #region Modals
  const { showModal: showLogoutModal } = useZModal({
    component: LogoutModal,
    bgColor: ZColorEnum.tertiary,
    containerClassName:
      'w-[31.25rem!important] h-[max-content!important] max-h-[23rem!important] maxSm:h-[23rem!important] overflow-y-auto min-h-[20rem!important]'
  });
  // #endregion

  const isSettingsRoute = useMemo(() => {
    return (
      isProfileDetailsRoute === true ||
      isCredentialsRoute === true ||
      isBankDetailsRoute === true ||
      isCurrencyDetailsRoute === true
    );
  }, [
    isProfileDetailsRoute,
    isCredentialsRoute,
    isBankDetailsRoute,
    isCurrencyDetailsRoute
  ]);

  return (
    <div className='flex items-center w-full maxLg:justify-between maxSm:px-2 lg:pe-12 md:ps-14'>
      <div className='xl:w-1/2 lg:w-4/12'>
        <img
          className='md:w-[4.8rem] md:h-[4.8rem] w-[3.8rem] h-[3.8rem] maxSm:mx-auto relative'
          alt='Logo'
          src={productLogo}
        />
      </div>

      {/*  */}
      <div className='flex items-center justify-end xl:w-1/2 lg:w-8/12 xl:gap-[3.5rem] gap-[1.5rem]'>
        <div className='flex items-center maxMd:hidden justify-start gap-[.85rem]'>
          <span
            className={ZClassNames({
              'z-profile-item': true
            })}
            onClick={() => {
              if (isInvoiceRoute === false) {
                void navigate({
                  to: AppRoutes.authRoutes.invoices,
                  params: {
                    invoiceType: ZInvoiceTypeE.inv
                  }
                });
              }
            }}
          >
            Invoice
          </span>
          <span
            className={ZClassNames({
              'z-profile-item': true
            })}
            onClick={() => {
              if (isExpensesRoute === false) {
                void navigate({
                  to: AppRoutes.authRoutes.invoices,
                  params: {
                    invoiceType: ZInvoiceTypeE.exp
                  }
                });
              }
            }}
          >
            Expenses
          </span>
          <span
            className={ZClassNames({
              'z-profile-item': true
            })}
            onClick={() => {
              if (isClientRoute === false) {
                void navigate({ to: AppRoutes.authRoutes.client });
              }
            }}
          >
            Clients
          </span>
          <span
            className={ZClassNames({
              'z-profile-item': true
            })}
            onClick={() => {
              if (!isSettingsRoute) {
                void navigate({
                  to: AppRoutes.authRoutes.profileSettingSub.credentials
                    .completePath
                });
              }
            }}
          >
            Settings
          </span>
        </div>

        <span className='maxMd:hidden'>
          <ExitSvg
            className='w-[3rem] h-[3rem] cursor-pointer text-primary'
            onClick={() => {
              // void (async () => {
              //   const { value } = await showZConfirm({
              //     title: messages.auth.logoutConfirmDialog.title,
              //     message: messages.auth.logoutConfirmDialog.messages
              //   });

              //   if (value) {
              //     await logoutHandler();
              //   }
              // })();
              showLogoutModal();
            }}
          />
        </span>

        <div className='md:hidden'>
          <MenuSvg
            className='cursor-pointer w-7 h-7 text-primary'
            onClick={openSidebar}
          />
        </div>
      </div>
    </div>
  );
};

const ZNavSidebarContent: React.FC<{ closeSidebar: () => void }> = ({
  closeSidebar
}) => {
  // #region Modals
  const { showModal: showLogoutModal } = useZModal({
    component: LogoutModal,
    bgColor: ZColorEnum.tertiary,
    containerClassName:
      'w-[31.25rem!important] h-[max-content!important] max-h-[23rem!important] maxSm:h-[23rem!important] overflow-y-auto min-h-[20rem!important]'
  });
  // #endregion
  return (
    <div className='flex flex-col justify-between w-full h-full'>
      <div className=''>
        <div className='flex items-center justify-end'>
          <CloseSvg
            className='cursor-pointer w-7 h-7 text-primary'
            onClick={closeSidebar}
          />
        </div>

        <div className='w-full mt-10'>
          <ZButton
            className='w-full uppercase text-[.8rem]'
            fill={ZFill.outline}
          >
            Invoice
          </ZButton>

          <ZButton
            className='w-full mt-3 uppercase text-[.8rem]'
            fill={ZFill.outline}
          >
            Expenses
          </ZButton>

          <ZButton
            className='w-full mt-3 uppercase text-[.8rem]'
            fill={ZFill.outline}
          >
            Clients
          </ZButton>

          <ZButton
            className='w-full mt-3 uppercase text-[.8rem]'
            fill={ZFill.outline}
          >
            Settings
          </ZButton>
        </div>
      </div>

      <div className='w-full py-3'>
        <ZButton
          className='w-full uppercase flex items-center justify-center text-[.8rem]'
          fill={ZFill.outline}
          color={ZColorEnum.tertiary}
          onClick={() => {
            showLogoutModal();
          }}
        >
          <ExitSvg className='me-2 text-tertiary mb-[2px]' /> Logout
        </ZButton>
      </div>
    </div>
  );
};

export default ZAuthNavigation;
