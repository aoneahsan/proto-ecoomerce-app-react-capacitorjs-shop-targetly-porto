// #region ---- Core Imports ----
import React, { useCallback } from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBox,
  ZRUDropdownMenu,
  ZRUSelect,
  ZRUText
} from '@/components/RadixUI';
import { useZMediaQueryScale } from '@/hook/helpers.hook';
import { useIsZAuthenticated } from '@/hook/auth.hook';
import constants from '@/utils/constants';

// #endregion

// #region ---- Types Imports ----
import { ZRUBasicVariantE } from '@/types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----
import { ZCurrenciesData } from '@/Data/Currencies.data';
import ZLanguagesData from '@/Data/Languages.data';

// #endregion

// #region ---- Images Imports ----
import { ZFacebookSvg, ZInstagramSvg, ZTwitterSvg } from '@/assets';
import { Navigate } from 'react-router-dom';
import { useZNavigate } from '@/hook/navigation.hook';
import { AppRoutes } from '@/Routes/AppRoutes';

// #endregion

const ZCurrenciesDropDown: React.FC = () => {
  return (
    <ZRUSelect
      options={ZCurrenciesData?.map((el) => ({
        label: el?.value,
        value: el?.value
      }))}
      defaultValue={ZCurrenciesData?.[0]?.value}
      trigger={{
        placeholder: 'Select Currency',
        variant: ZRUBasicVariantE.ghost,
        className: 'text-white font-medium text-xs'
      }}
    />
  );
};

const ZLanguagesDropDown: React.FC = () => {
  return (
    <ZRUSelect
      options={ZLanguagesData?.map((el) => ({
        label: el?.shortForm,
        value: el?.value
      }))}
      defaultValue={ZLanguagesData?.[0]?.value}
      trigger={{
        placeholder: 'Select Languages',
        variant: ZRUBasicVariantE.ghost,
        className: 'text-white font-medium text-xs'
      }}
    />
  );
};

const ZMenu: React.FC = () => {
  // #region Custom Hooks
  const { isAuthenticated } = useIsZAuthenticated();
  const navigate = useZNavigate();
  // #endregion

  // #region Functions
  const loginBtnHandler = useCallback(() => {
    void navigate({
      to: AppRoutes.login
    });
  }, []);

  const registerBtnHandler = useCallback(() => {
    void navigate({
      to: AppRoutes.register
    });
  }, []);

  const cartBtnHandler = useCallback(() => {
    void navigate({
      to: AppRoutes.purchaseSub.cart.completePath
    });
  }, []);

  const myAccountBtnHandler = useCallback(() => {
    void navigate({
      to: AppRoutes.myAccountSub.dashboard.completePath
    });
  }, []);

  const wishlistBtnHandler = useCallback(() => {
    void navigate({
      to: AppRoutes.wishlist
    });
  }, []);
  // #endregion
  return (
    <>
      <ul className='flex max900px:flex-col min900px:items-center lg:gap-8 gap-3 max900px:ps-3 max900px:pe-10 max900px:py-2 max900px:*:inline-block *:mb-0 *:text-xs *:font-medium *:uppercase *:cursor-pointer min900px:*:text-light-blue-100 *:text-dark'>
        {isAuthenticated ? (
          <li onClick={myAccountBtnHandler}>My Account</li>
        ) : null}
        <li>Contact us</li>
        {isAuthenticated ? (
          <li onClick={wishlistBtnHandler}>My wishlist</li>
        ) : null}
        <li>Site map</li>
        {isAuthenticated ? <li onClick={cartBtnHandler}>Cart</li> : null}
        {!isAuthenticated ? <li onClick={loginBtnHandler}>Login</li> : null}
        {!isAuthenticated ? (
          <li onClick={registerBtnHandler}>Register</li>
        ) : null}
      </ul>
    </>
  );
};

const ZPublicNavTopBar: React.FC = () => {
  // #region Custom Hooks
  const { is900pxScale, isBelow900pxScale } = useZMediaQueryScale();
  // #endregion

  return (
    <ZRUBox className='w-full py-3 bg-primary'>
      <ZRUBox className='flex items-center mx-auto xl:container maxXl:px-3'>
        {/* Countries & Languages dropdowns */}
        <ZRUBox className='flex items-center gap-3 font-medium md:gap-6'>
          <ZLanguagesDropDown />

          <ZCurrenciesDropDown />
        </ZRUBox>

        <ZRUBox className='flex items-center ms-auto'>
          <p className='hidden mb-0 text-xs font-medium uppercase me-3 lg:me-8 sm:block text-light-blue-100'>
            Welcome To {constants?.productInfo?.name}!
          </p>

          {/* Menu */}
          {isBelow900pxScale ? (
            <ZRUDropdownMenu
              trigger={{
                children: (
                  <ZRUText className='text-xs font-medium uppercase cursor-pointer text-light-blue-100 me-3'>
                    Links
                  </ZRUText>
                )
              }}
            >
              <ZMenu />
            </ZRUDropdownMenu>
          ) : null}

          {/* Menu */}
          {is900pxScale ? <ZMenu /> : null}

          {/* separator */}
          <ZRUBox className='h-5 mx-2 border-l min900px:ms-5 min900px:me-4 border-light-blue-100'></ZRUBox>

          {/* Social buttons */}
          <ZRUBox className='*:flex *:items-center *:rounded-full *:cursor-pointer *:justify-center *:social-icon flex items-center *:text-[0.8125rem] *:w-6 *:h-6 gap-1'>
            <ZRUBox className='hover:bg-facebook'>
              <ZFacebookSvg className='w-[60%] h-[60%] text-light-blue-100' />
            </ZRUBox>

            <ZRUBox className='hover:bg-twitter'>
              <ZTwitterSvg className='w-[60%] h-[60%] text-light-blue-100' />
            </ZRUBox>

            <ZRUBox className='hover:bg-instagram'>
              <ZInstagramSvg className='w-[60%] h-[60%] text-light-blue-100' />
            </ZRUBox>
          </ZRUBox>
        </ZRUBox>
      </ZRUBox>
    </ZRUBox>
  );
};

export default ZPublicNavTopBar;
