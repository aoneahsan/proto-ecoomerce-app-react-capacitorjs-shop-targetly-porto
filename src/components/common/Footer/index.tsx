// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import dayjs from 'dayjs';
// #endregion

// #region ---- Custom Imports ----
import { ZRUBadge, ZRUBox, ZRUHeading, ZRUText } from '@/components/RadixUI';

// #endregion

// #region ---- Types Imports ----
import {
  ZRUBadgeVariantE,
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUTextAsE
} from '@/types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ZFacebookSvg,
  ZInstagramSvg,
  ZPaypalLogoIcon,
  ZStripeLogoIcon,
  ZTwitterSvg,
  ZVerisignLogoSvg,
  ZVisaLogoIcon,
  productWhiteLogo
} from '@/assets';

// #endregion

/**
 * Represents a footer used in public page like home etc..
 */
const ZPublicFooter: React.FC = () => {
  return (
    <footer className='flex flex-col items-center mt-auto text-left text-medium-100 bg-dark text-surface'>
      <ZRUBox className='pt-6 mt-3 xl:px-6 xl:container maxXl:px-3'>
        <ZRUBox className='flex items-start justify-between place-items-center lg:*:w-1/4 md:*:w-1/3 maxMd:flex-wrap sm:*:w-1/2 xs:*:w-full'>
          {/* About us */}
          <ZRUBox className='mb-6 pe-5'>
            <ZRUHeading
              as={ZRUHeadingAsE.h5}
              className='mb-2.5 text-base text-white font-bold uppercase'
            >
              About us
            </ZRUHeading>

            <img
              alt='product logo'
              src={productWhiteLogo}
              className='w-[6.3125rem]'
            />

            <div className='mt-4'>
              <ZRUText as={ZRUTextAsE.p} className='text-sm line-clamp-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                nec vestibulum magna, et dapibus lacus. Duis nec vestibulum
                magna, et dapibus lacus.
              </ZRUText>

              <ZRUText
                as={ZRUTextAsE.span}
                className='inline-block mt-3 text-white underline cursor-pointer'
              >
                read more...
              </ZRUText>
            </div>
          </ZRUBox>

          {/* Contact Info */}
          <ZRUBox className='mb-6 ps-2'>
            <ZRUHeading
              as={ZRUHeadingAsE.h5}
              className='mb-2.5 text-base text-white font-bold uppercase'
            >
              Contact Info
            </ZRUHeading>

            <ul className='mb-0 list-none *:text-sm *:mb-2'>
              <li>
                <ZRUText as={ZRUTextAsE.p} className='text-white uppercase'>
                  Address:
                </ZRUText>
                <ZRUText as={ZRUTextAsE.p}>
                  123 Street Name, City, England
                </ZRUText>
              </li>
              <li>
                <ZRUText as={ZRUTextAsE.p} className='text-white uppercase'>
                  Phone:
                </ZRUText>
                <ZRUText as={ZRUTextAsE.p}>(123) 456-7890</ZRUText>
              </li>
              <li>
                <ZRUText as={ZRUTextAsE.p} className='text-white uppercase'>
                  Email:
                </ZRUText>
                <ZRUText as={ZRUTextAsE.p}>mail@example.com</ZRUText>
              </li>
              <li>
                <ZRUText as={ZRUTextAsE.p} className='text-white uppercase'>
                  Working Days/Hours:
                </ZRUText>
                <ZRUText as={ZRUTextAsE.p}>
                  Mon - Sun / 9:00 AM - 8:00 PM
                </ZRUText>
              </li>
            </ul>

            <ZRUBox className='flex items-center mt-4 *:w-10 *:h-10 *:rounded-full *:cursor-pointer *:flex *:items-center *:justify-center *:transition-all gap-2 *:border *:border-gray-100'>
              <ZRUBox className='hover:bg-facebook'>
                <ZFacebookSvg className='w-[50%] h-[50%] text-light-blue-100' />
              </ZRUBox>

              <ZRUBox className='hover:bg-twitter'>
                <ZTwitterSvg className='w-[50%] h-[50%] text-light-blue-100' />
              </ZRUBox>

              <ZRUBox className='hover:bg-instagram'>
                <ZInstagramSvg className='w-[50%] h-[50%] text-light-blue-100' />
              </ZRUBox>
            </ZRUBox>
          </ZRUBox>

          {/* Customer Service */}
          <ZRUBox className='mb-6 ps-2'>
            <ZRUHeading
              as={ZRUHeadingAsE.h5}
              className='mb-2.5 text-base text-white font-bold uppercase'
            >
              Customer Service
            </ZRUHeading>

            <ul className='mb-0 list-none *:text-xs *:mb-2 hover:*:text-primary *:w-max *:cursor-pointer flex flex-col'>
              <li>Help & FAQs</li>

              <li>Order Tracking</li>

              <li>Shipping & Delivery</li>

              <li>Orders History</li>

              <li>Advanced Search</li>

              <li>My Account</li>

              <li>Careers</li>

              <li>About Us</li>

              <li>Corporate Sales</li>

              <li>Privacy</li>
            </ul>
          </ZRUBox>

          {/* Popular Tags */}
          <ZRUBox className='mb-6'>
            <ZRUHeading
              as={ZRUHeadingAsE.h5}
              className='mb-2.5 text-base text-white font-bold uppercase'
            >
              Popular Tags
            </ZRUHeading>

            <ZRUBox className='flex items-center flex-wrap w-full gap-2 mt-3 *:px-2 *:py-1 *:cursor-pointer max-w-'>
              {[...Array(30)].map((el, index) => {
                return (
                  <ZRUBadge
                    variant={ZRUBadgeVariantE.outline}
                    color={ZRUColorE.amber}
                    key={index}
                  >
                    bag
                  </ZRUBadge>
                );
              })}
            </ZRUBox>
          </ZRUBox>
        </ZRUBox>

        {/* Copyright section  */}
        <ZRUBox className='flex items-center justify-between w-full p-2 mt-3 border-t sm:p-4 maxSm:flex-col maxSm:gap-y-2'>
          <ZRUBox>
            <ZRUText>© {dayjs()?.year()} Copyright</ZRUText>
          </ZRUBox>

          <ZRUBox className='flex items-center gap-3 *:cursor-pointer maxSm:justify-between maxSm:w-full maxSm:flex-wrap'>
            <ZVisaLogoIcon className='w-9 h-9' />
            <ZPaypalLogoIcon className='w-9 h-9' />
            <ZStripeLogoIcon className='w-9 h-9' />
            <ZVerisignLogoSvg className='w-10 h-10' />
          </ZRUBox>
        </ZRUBox>
      </ZRUBox>
    </footer>
  );
};

export default ZPublicFooter;
