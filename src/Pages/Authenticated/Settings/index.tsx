// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useMatchRoute, Outlet } from '@tanstack/react-router';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----
import Copyright from '@/Components/Inpage/Copyright';
import { useZNavigate } from '@/ZHooks/Navigation.hook';
import { AppRoutes } from '@/Routes/AppRoutes';
import ZAuthNavigation from '@/Components/Auth/Navigation';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  InfiniteSvg,
  UserSvg,
  CartSvg,
  productVector,
  ZLockSvg
} from '@/assets';

// #endregion

// #region ---- Types Imports ----

// #endregion

const ProfileSettings: React.FC = () => {
  const isCredentialsRoute = useMatchRoute()({
    to: AppRoutes.authRoutes.profileSettingSub.credentials.completePath
  });
  const isProfileRoute = useMatchRoute()({
    to: AppRoutes.authRoutes.profileSettingSub.profileDetails.completePath
  });
  const isCurrencyRoute = useMatchRoute()({
    to: AppRoutes.authRoutes.profileSettingSub.currencyDetails.completePath
  });
  const isBankDetailsRoute = useMatchRoute()({
    to: AppRoutes.authRoutes.profileSettingSub.bankDetails.completePath
  });

  // #region Custom Hooks
  const navigation = useZNavigate();
  // #endregion

  // #region Function
  const credentialsPage = (): void => {
    void navigation({
      to: AppRoutes.authRoutes.profileSettingSub.credentials.completePath
    });
  };

  const profilePage = (): void => {
    void navigation({
      to: AppRoutes.authRoutes.profileSettingSub.profileDetails.completePath
    });
  };

  const currencyPage = (): void => {
    void navigation({
      to: AppRoutes.authRoutes.profileSettingSub.currencyDetails.completePath
    });
  };

  const bankDetailsPage = (): void => {
    void navigation({
      to: AppRoutes.authRoutes.profileSettingSub.bankDetails.completePath
    });
  };
  // #endregion

  return (
    <div className='relative flex flex-col items-center justify-between w-full min-h-screen pt-5 bg-secondary h max-h-max md:pe-8'>
      <div className='max-w-[85.4rem] w-full mx-auto h-full'>
        <ZAuthNavigation />

        <div className='flex items-start flex-col w-full maxMd:mt-[2rem] md:mt-[7.15rem] flex-1'>
          <div className='flex items-start maxMd:flex-col maxMd:gap-y-6 maxMd:items-center maxLg:justify-center w-full lg:px-[8.3rem] md:px-[2rem] lg:gap-x-[11.3rem] md:gap-x-[4.3rem] relative z-10'>
            <div className='md:w-[11.25rem] maxMd:w-full maxMd:justify-center maxMd:flex-wrap gap-5 items-center py-6 bg-aqua-shadow md:rounded-[3rem] flex md:flex-col relative z-10'>
              <div className='flex flex-col px-3 text-center items-center max-w-full w-[7.8125rem]'>
                <ZLockSvg
                  className='cursor-pointer w-7 h-7 text-secondary'
                  onClick={credentialsPage}
                />
                <span
                  className='w-full text-[0.75rem] mt-2 cursor-pointer text-secondary font-medium tracking-[.4px] font-roboto-medium leading-[1rem]'
                  onClick={credentialsPage}
                >
                  Credentials
                </span>
                <div
                  className={ZClassNames({
                    'h-[4px] mt-[.40rem] rounded-full bg-secondary transition-all':
                      true,
                    'w-full opacity-100': isCredentialsRoute !== false,
                    'w-0 opacity-0': isCredentialsRoute === false
                  })}
                ></div>
              </div>

              <div className='flex flex-col px-3 text-center items-center max-w-full w-[7.8125rem]'>
                <UserSvg
                  className='w-6 h-6 cursor-pointer text-secondary'
                  onClick={profilePage}
                />
                <span
                  onClick={profilePage}
                  className='w-full text-[0.75rem] mt-2 cursor-pointer text-secondary font-normal tracking-[.4px] font-roboto-regular leading-[1rem]'
                >
                  Your Profile
                </span>
                <div
                  className={ZClassNames({
                    'h-[4px] mt-[.40rem] rounded-full bg-secondary transition-all':
                      true,
                    'w-full opacity-100': isProfileRoute !== false,
                    'w-0 opacity-0': isProfileRoute === false
                  })}
                ></div>
              </div>

              <div className='flex flex-col px-3 text-center items-center max-w-full w-[7.8125rem]'>
                <InfiniteSvg
                  onClick={currencyPage}
                  className='w-6 h-6 cursor-pointer text-secondary'
                />
                <span
                  onClick={currencyPage}
                  className='w-full text-[0.75rem] mt-2 cursor-pointer text-secondary font-normal tracking-[.4px] font-roboto-regular leading-[1rem]'
                >
                  Currency & Logo
                </span>
                <div
                  className={ZClassNames({
                    'h-[4px] mt-[.40rem] rounded-full bg-secondary transition-all':
                      true,
                    'w-full opacity-100': isCurrencyRoute !== false,
                    'w-0 opacity-0': isCurrencyRoute === false
                  })}
                ></div>
              </div>

              <div className='flex flex-col px-3 text-center items-center max-w-full w-[7.8125rem]'>
                <CartSvg
                  onClick={bankDetailsPage}
                  className='w-6 h-6 cursor-pointer text-secondary'
                />
                <span
                  onClick={bankDetailsPage}
                  className='w-full text-[0.75rem] mt-2 cursor-pointer text-secondary font-normal tracking-[.4px] font-roboto-regular leading-[1rem]'
                >
                  Bank Details
                </span>
                <div
                  className={ZClassNames({
                    'h-[4px] mt-[.40rem] rounded-full bg-secondary transition-all':
                      true,
                    'w-full opacity-100': isBankDetailsRoute !== false,
                    'w-0 opacity-0': isBankDetailsRoute === false
                  })}
                ></div>
              </div>
            </div>

            <div className='relative z-10 maxMd:text-center maxSm:w-full'>
              <Outlet />
            </div>
          </div>

          <img
            src={productVector}
            alt='product vector'
            className='maxMd:hidden z-1 absolute bottom-0 left-0 maxMd:w-[16rem] maxXl:w-[17rem] w-[19.5rem]'
          />
          <div className='flex items-end w-full text-center'>
            <Copyright className='pb-[1.2rem] pt-[2.5rem] w-full' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
