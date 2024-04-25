// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import constants from '@/utils/Constants';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ChevronDown,
  productLogo,
  SearchSvg,
  UserSvg,
  ZCartBagSvg,
  ZChevronLeftSvg,
  ZFacebookSvg,
  ZHeartSvg,
  ZInstagramSvg,
  ZPhoneSvg,
  ZTwitterSvg
} from '@/assets';
import { ZCurrenciesData } from '@/Data/Currencies.data';
import ZLanguagesData from '@/Data/Languages.data';
import {
  ZRUInput,
  ZRUInputSlot,
  ZRUSelect,
  ZRUText
} from '@/Components/RadixUI';
import {
  ZRURadiusE,
  ZRUSelectContentPositionE,
  ZRUSideE,
  ZRUTextAsE,
  ZRUTriggerVariantE
} from '@/Types/radixUI/index.type';
import classNames from 'classnames';

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
        variant: ZRUTriggerVariantE.ghost,
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
        variant: ZRUTriggerVariantE.ghost,
        className: 'text-white font-medium text-xs'
      }}
    />
  );
};

/**
 * Represents a navigation used in public page like home etc..
 */
const ZPublicNavigation: React.FC = () => {
  return (
    <header>
      {/* Top bar */}
      <div className='w-full py-3 bg-primary text-uppercase'>
        <div className='container flex items-center mx-auto'>
          {/* Countries & Languages dropdowns */}
          <div className='flex items-center gap-6 font-medium'>
            <ZLanguagesDropDown />

            <ZCurrenciesDropDown />
          </div>

          <div className='flex items-center ms-auto'>
            <p className='hidden mb-0 text-xs font-medium uppercase me-8 sm:block text-light-blue-100'>
              Welcome To {constants?.productInfo?.name}!
            </p>

            {/* Menu */}
            <ul className='flex items-center gap-8 *:inline-block *:mb-0 *:text-xs *:font-medium *:uppercase *:cursor-pointer *:text-light-blue-100'>
              <li>My Account</li>
              <li>Contact us</li>
              <li>My wishlist</li>
              <li>Site map</li>
              <li>Cart</li>
              <li>Login</li>
            </ul>

            {/* separator */}
            <div className='h-5 border-l ms-5 me-4 border-light-blue-100'></div>

            {/* Social buttons */}
            <div className='*:flex *:items-center *:rounded-full *:cursor-pointer *:justify-center *:social-icon flex items-center *:text-[0.8125rem] *:w-6 *:h-6 gap-1'>
              <div className='hover:bg-facebook'>
                <ZFacebookSvg className='w-[60%] h-[60%] text-light-blue-100' />
              </div>

              <div className='hover:bg-twitter'>
                <ZTwitterSvg className='w-[60%] h-[60%] text-light-blue-100' />
              </div>

              <div className='hover:bg-instagram'>
                <ZInstagramSvg className='w-[60%] h-[60%] text-light-blue-100' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle bar */}
      <div className='w-full py-3 pt-5 text-dark'>
        <div className='container flex items-center mx-auto'>
          <div className='flex items-center w-1/6 ps-0'>
            <img
              src={productLogo}
              width='111'
              height='44'
              alt='Porto Logo'
              className='cursor-pointer logo'
            />
          </div>

          <div className='flex items-center flex-1 pl-2 mx-auto pe-3 text-dark'>
            <ZRUInput
              className='flex-1'
              placeholder='Search...'
              size='3'
              radius={ZRURadiusE.full}
            >
              <ZRUInputSlot
                side={ZRUSideE.right}
                className='border-gray-100 border-s'
              >
                <ZRUSelect
                  options={[
                    { label: 'All Categories', value: 'All Categories' }
                  ]}
                  content={{
                    position: ZRUSelectContentPositionE.popper
                  }}
                  trigger={{
                    placeholder: 'All Categories',
                    variant: ZRUTriggerVariantE.ghost,
                    className: 'font-medium text-sm text-medium'
                  }}
                />
              </ZRUInputSlot>
              <ZRUInputSlot
                side={ZRUSideE.right}
                className='border-gray-100 border-s'
              >
                <SearchSvg className='w-8 h-8 px-1 text-medium' />
              </ZRUInputSlot>
            </ZRUInput>

            <div className='items-center hidden gap-2 uppercase ms-7 me-5 lg:flex xl:pe-5 xl:me-3'>
              <ZPhoneSvg className='w-10 h-10' />
              <ZRUText className='pt-1 text-xs font-medium leading-none'>
                Call us now
                <ZRUText className='block text-lg tracking-wide text-dark ls-10'>
                  +123 5678 890
                </ZRUText>
              </ZRUText>
            </div>

            <div className='mx-4'>
              <UserSvg className='w-8 h-8' />
            </div>

            <div className='mx-4'>
              <ZHeartSvg className='w-8 h-8' />
            </div>

            <div className='ms-4 me-2'>
              <ZCartBagSvg className='w-8 h-8' />
            </div>
            <div className=''>
              <ZChevronLeftSvg className='w-5 h-5 text-dark' />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ZPublicNavigation;
