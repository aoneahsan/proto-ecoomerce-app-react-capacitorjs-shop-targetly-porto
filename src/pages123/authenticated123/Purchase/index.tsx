// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Outlet, useMatchRoute } from '@tanstack/react-router';

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUText } from '@/components123/RadixUI';
import { ZPage } from '@/components123/Elements';
import ZPagesMenu from '@/components123/common124/PagesMenu';
import ZPublicNavigation from '@/components123/common124/Navigation';
import constants from '@/utils/constants';
import { useZMediaQueryScale } from '@/hook123/helpers123.hook';
import { AppRoutes } from '@/Routes/AppRoutes';
import { ZClassNames } from '@/Packages/ClassNames';
import ZPublicFooter from '@/components123/common124/Footer';

// #endregion

// #region ---- Types Imports ----
import { ZRUTextAsE } from '@/types123/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZDoubleChevronRightIcon } from '@/assets';

// #endregion

const PurchasePage: React.FC = () => {
  // #region Custom Hooks
  const { isSmScale } = useZMediaQueryScale();
  // #endregion

  // #region Constants
  const pageHelmet = useMemo(
    () => ({
      title: `${constants.productInfo.name} - Purchase Page - Zaions`
    }),
    []
  );
  // #endregion

  // #region Routes
  const isCartPage = useMatchRoute()({
    to: AppRoutes.purchaseSub.cart.completePath
  });

  const isCheckoutPage = useMatchRoute()({
    to: AppRoutes.purchaseSub.checkout.completePath
  });

  const isCompletedPage = useMatchRoute()({
    to: AppRoutes.purchaseSub.completed.completePath
  });
  // #endregion

  return (
    <ZPage helmet={pageHelmet}>
      {/* Navigation */}
      <ZPublicNavigation showMenuBtn={false} />

      {/* pagesMenu */}
      <ZPagesMenu />

      {/* Content */}
      <ZRUBox className='mb-5 sm:border-t sm:border-gray-100 sm:pt-7'>
        {/* Checkout Progress Bar */}
        {isSmScale ? (
          <ZRUBox className='flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white sm:p-4 sm:space-x-5 rtl:space-x-reverse'>
            <ZRUBox
              className={ZClassNames('flex items-center', {
                'text-success': Boolean(isCartPage)
              })}
            >
              <ZRUText
                as={ZRUTextAsE.span}
                className='flex items-center justify-center w-5 h-5 text-base border rounded-full md:p-4 md:text-lg me-2 shrink-0'
              >
                1
              </ZRUText>
              <ZRUText className='text-base md:text-lg'>Shopping Cart</ZRUText>
              <ZDoubleChevronRightIcon className='w-5 h-5 md:w-7 md:h-7 ms-2 sm:ms-4 rtl:rotate-180' />
            </ZRUBox>

            <ZRUBox
              className={ZClassNames('flex items-center', {
                'text-success': Boolean(isCheckoutPage)
              })}
            >
              <ZRUText
                as={ZRUTextAsE.span}
                className='flex items-center justify-center w-5 h-5 text-base border rounded-full md:p-4 md:text-lg me-2 shrink-0'
              >
                2
              </ZRUText>
              <ZRUText className='text-base md:text-lg'>Checkout</ZRUText>
              <ZDoubleChevronRightIcon className='w-5 h-5 md:w-7 md:h-7 ms-2 base:ms-4 rtl:rotate-180' />
            </ZRUBox>

            <ZRUBox
              className={ZClassNames('flex items-center', {
                'text-success': Boolean(isCompletedPage)
              })}
            >
              <ZRUText
                as={ZRUTextAsE.span}
                className='flex items-center justify-center w-5 h-5 text-base border rounded-full md:p-4 md:text-lg me-2 shrink-0'
              >
                3
              </ZRUText>
              <ZRUText className='text-base md:text-lg'>Order Complete</ZRUText>
            </ZRUBox>
          </ZRUBox>
        ) : null}

        <Outlet />
      </ZRUBox>

      <ZPublicFooter />
    </ZPage>
  );
};

export default PurchasePage;
