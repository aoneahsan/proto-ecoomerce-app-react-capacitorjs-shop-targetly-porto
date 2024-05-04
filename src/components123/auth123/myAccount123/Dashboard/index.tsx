// #region ---- Core Imports ----
import React, { useCallback } from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUText } from '@/components123/RadixUI';
import { useZNavigate } from '@/hook123/navigation123.hook';
import { AppRoutes } from '@/Routes/AppRoutes';
import { reportCustomError } from '@/utils/helpers123';

// #endregion

// #region ---- Types Imports ----
import { ZRUTextAsE } from '@/types123/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  UserSvg,
  ZAddressIcon,
  ZDownloadIcon,
  ZHeartDuotoneIcon,
  ZLogoutCircleIcon,
  ZShoppingCartIcon
} from '@/assets';

// #endregion

const Dashboard: React.FC = () => {
  // #region Custom hooks
  const navigate = useZNavigate();
  // #endregion

  // #region Functions
  const ordersOnClickHandler = useCallback(() => {
    try {
      void navigate({ to: AppRoutes.myAccountSub.orders.completePath });
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
  // #endregion

  return (
    <>
      <ZRUText
        as={ZRUTextAsE.p}
        className='text-sm text-center sm:text-left text-medium'
      >
        Hello<ZRUText className='mx-1 font-bold text-dark'>Editor</ZRUText>
        (not
        <ZRUText className='font-bold ms-1 text-dark'>Editor</ZRUText>?
        <ZRUText className='cursor-pointer text-primary hover:underline ms-1'>
          Log out
        </ZRUText>
        )
      </ZRUText>

      <ZRUText
        as={ZRUTextAsE.p}
        className='mt-3 text-sm text-center sm:text-left md:mt-5 text-medium'
      >
        From your account dashboard you can view your
        <ZRUText
          className='cursor-pointer ms-1 text-primary hover:underline'
          onClick={ordersOnClickHandler}
        >
          recent orders
        </ZRUText>
        , manage your
        <ZRUText
          className='cursor-pointer ms-1 text-primary hover:underline'
          onClick={addressesOnClickHandler}
        >
          shipping and billing addresses
        </ZRUText>
        , and
        <ZRUText
          className='cursor-pointer ms-1 text-primary hover:underline'
          onClick={accountDetailsOnClickHandler}
        >
          edit your password and account details
        </ZRUText>
        .
      </ZRUText>

      <ZRUBox className='flex sm:flex-row flex-col flex-wrap items-center lg:justify-between mt-3 md:mt-9 *:w-full sm:*:w-[31%] lg:*:w-[30%] *:text-center *:border-2 *:border-gray-100 *:flex *:flex-col *:item-center *:justify-center *:py-4 gap-4 *:gap-3 *:cursor-pointer *:text-tertiary'>
        <ZRUBox className='group'>
          <ZShoppingCartIcon className='w-10 h-10 mx-auto transition-all duration-700 md:w-12 md:h-12 lg:w-14 lg:h-14 text-body group-hover:scale-125 group-hover:text-primary' />
          <ZRUText className='inline text-base font-bold uppercase md:text-lg'>
            Orders
          </ZRUText>
        </ZRUBox>

        <ZRUBox className='group'>
          <ZDownloadIcon className='w-10 h-10 mx-auto transition-all duration-700 md:w-12 md:h-12 lg:w-14 lg:h-14 text-body group-hover:scale-125 group-hover:text-primary' />
          <ZRUText className='inline text-base font-bold uppercase md:text-lg'>
            Download
          </ZRUText>
        </ZRUBox>

        <ZRUBox className='group'>
          <ZAddressIcon className='w-10 h-10 mx-auto transition-all duration-700 md:w-12 md:h-12 lg:w-14 lg:h-14 text-body group-hover:scale-125 group-hover:text-primary' />
          <ZRUText className='inline text-base font-bold uppercase md:text-lg'>
            Addresses
          </ZRUText>
        </ZRUBox>

        <ZRUBox className='group'>
          <UserSvg className='w-10 h-10 mx-auto transition-all duration-700 md:w-12 md:h-12 lg:w-14 lg:h-14 text-body group-hover:scale-125 group-hover:text-primary' />
          <ZRUText className='inline text-base font-bold uppercase md:text-lg'>
            Account Details
          </ZRUText>
        </ZRUBox>

        <ZRUBox className='group'>
          <ZHeartDuotoneIcon className='w-10 h-10 mx-auto transition-all duration-700 md:w-12 md:h-12 lg:w-14 lg:h-14 text-body group-hover:scale-125 group-hover:text-primary' />
          <ZRUText className='inline text-base font-bold uppercase md:text-lg'>
            Wishlist
          </ZRUText>
        </ZRUBox>

        <ZRUBox className='group'>
          <ZLogoutCircleIcon className='w-10 h-10 mx-auto transition-all duration-700 md:w-12 md:h-12 lg:w-14 lg:h-14 text-body group-hover:scale-125 group-hover:text-primary' />
          <ZRUText className='inline text-base font-bold uppercase md:text-lg'>
            Logout
          </ZRUText>
        </ZRUBox>
      </ZRUBox>
    </>
  );
};

export default Dashboard;
