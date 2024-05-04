// #region ---- Core Imports ----
import React, { useCallback, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Outlet, useMatchRoute } from '@tanstack/react-router';

// #endregion

// #region ---- Custom Imports ----
import { ZPage } from '@/components123/Elements';
import ZPublicNavigation from '@/components123/common124/Navigation';
import ZPagesMenu from '@/components123/common124/PagesMenu';
import { ZRUBox, ZRUHeading } from '@/components123/RadixUI';
import constants from '@/utils/constants';
import { AppRoutes } from '@/Routes/AppRoutes';
import { reportCustomError } from '@/utils/helpers123';
import { useZNavigate } from '@/hook123/navigation123.hook';
import { ZClassNames } from '@/Packages/ClassNames';
import ZPublicFooter from '@/components123/common124/Footer';

// #endregion

// #region ---- Types Imports ----
import { ZRUHeadingAsE } from '@/types123/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const MyAccountPage: React.FC = () => {
  // #region Custom hooks
  const navigate = useZNavigate();
  // #endregion

  // #region Constants
  const pageHelmet = useMemo(
    () => ({
      title: `${constants.productInfo.name} - My Account Page - Zaions`
    }),
    []
  );
  // #endregion

  // #region Routes
  const isDashboardPage = useMatchRoute()({
    to: AppRoutes.myAccountSub.dashboard.completePath
  });

  const isOrdersPage = useMatchRoute()({
    to: AppRoutes.myAccountSub.orders.completePath
  });

  const isDownloadsPage = useMatchRoute()({
    to: AppRoutes.myAccountSub.downloads.completePath
  });

  const isAddressesPage = useMatchRoute()({
    to: AppRoutes.myAccountSub.addresses.completePath
  });

  const isAccountDetailsPage = useMatchRoute()({
    to: AppRoutes.myAccountSub.accountDetails.completePath
  });

  const isShoppingAddressPage = useMatchRoute()({
    to: AppRoutes.myAccountSub.shoppingAddress.completePath
  });
  // #endregion

  // #region Functions
  const dashboardOnClickHandler = useCallback(() => {
    try {
      void navigate({ to: AppRoutes.myAccountSub.dashboard.completePath });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const ordersOnClickHandler = useCallback(() => {
    try {
      void navigate({ to: AppRoutes.myAccountSub.orders.completePath });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const downloadsOnClickHandler = useCallback(() => {
    try {
      void navigate({ to: AppRoutes.myAccountSub.downloads.completePath });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const addressesOnClickHandler = useCallback(() => {
    try {
      void navigate({ to: AppRoutes.myAccountSub.addresses.completePath });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const accountDetailsOnClickHandler = useCallback(() => {
    try {
      void navigate({ to: AppRoutes.myAccountSub.accountDetails.completePath });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const shoppingAddressOnClickHandler = useCallback(() => {
    try {
      void navigate({
        to: AppRoutes.myAccountSub.shoppingAddress.completePath
      });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const wishlistBtnHandler = useCallback(() => {
    try {
      void navigate({
        to: AppRoutes.wishlist
      });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);
  // #endregion

  return (
    <ZPage helmet={pageHelmet}>
      {/* Navigation */}
      <ZPublicNavigation showMenuBtn={false} />

      {/* pagesMenu */}
      <ZPagesMenu />

      <ZRUBox className='flex flex-col gap-5 mx-auto mt-4 mb-6 lg:flex-row xl:container maxXl:px-3'>
        <aside className='w-full mb-2 text-sm uppercase lg:w-3/12'>
          <ZRUBox className='w-full border border-gray-100 h-max'>
            <ZRUHeading
              as={ZRUHeadingAsE.h2}
              className='text-[.8rem] bg-gray ls-n-25 p-[.5rem_1.5rem_.5rem] font-bold border-b border-gray-200'
            >
              My Account
            </ZRUHeading>

            <ul className='*:px-[1.5rem] *:py-[.6rem] *:border-b *:border-gray-200 last-of-type:*:border-transparent *:cursor-pointer hover:*:bg-light/80 *:transition-all hover:*:text-primary'>
              <li
                onClick={dashboardOnClickHandler}
                className={ZClassNames({
                  'text-primary bg-light/80': isDashboardPage
                })}
              >
                Dashboard
              </li>
              <li
                onClick={ordersOnClickHandler}
                className={ZClassNames({
                  'text-primary bg-light/80': isOrdersPage
                })}
              >
                Orders
              </li>
              <li
                onClick={downloadsOnClickHandler}
                className={ZClassNames({
                  'text-primary bg-light/80': isDownloadsPage
                })}
              >
                Downloads
              </li>
              <li
                onClick={addressesOnClickHandler}
                className={ZClassNames({
                  'text-primary bg-light/80': isAddressesPage
                })}
              >
                Addresses
              </li>
              <li
                onClick={accountDetailsOnClickHandler}
                className={ZClassNames({
                  'text-primary bg-light/80': isAccountDetailsPage
                })}
              >
                Account Details
              </li>
              <li
                onClick={shoppingAddressOnClickHandler}
                className={ZClassNames({
                  'text-primary bg-light/80': isShoppingAddressPage
                })}
              >
                Shopping Address
              </li>
              <li onClick={wishlistBtnHandler}>Wishlist</li>
              <li>Logout</li>
            </ul>
          </ZRUBox>
        </aside>

        <ZRUBox className='flex-1'>
          <Outlet />
        </ZRUBox>
      </ZRUBox>

      <ZPublicFooter />
    </ZPage>
  );
};

export default MyAccountPage;
