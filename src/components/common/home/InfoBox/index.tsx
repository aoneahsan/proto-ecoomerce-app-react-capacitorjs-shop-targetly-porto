// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUHeading, ZRUText } from '@/components/RadixUI';

// #endregion

// #region ---- Types Imports ----
import { ZRUHeadingAsE, ZRUTextAsE } from '@/types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZDollarCoinIcon, ZShippingFastIcon, Z24HoursLine } from '@/assets';

// #endregion

const ZInformationBox: React.FC = () => {
  return (
    <ZRUBox className='flex mb-2 lg:border maxLg:border-x maxLg:border-t border-gray-100 *:flex *:items-center *:justify-center *:flex-1 lg:*:m-[.8rem_0_.6rem] *:p-[.6rem] lg:*:border-e maxLg:*:border-b *:border-gray-100 maxLg:flex-col maxLg:*:py-4 maxLg:mt-4 maxSm:*:flex-col maxSm:*:text-center'>
      <ZRUBox>
        <ZShippingFastIcon className='w-10 h-10 me-3' />

        <ZRUBox>
          <ZRUHeading
            as={ZRUHeadingAsE.h4}
            className='text-sm font-bold uppercase'
          >
            FREE SHIPPING &amp; RETURN
          </ZRUHeading>
          <ZRUText
            as={ZRUTextAsE.p}
            className='font-light text-sm tracking-[0.01em] text-body'
          >
            Free shipping on all orders over $99
          </ZRUText>
        </ZRUBox>
      </ZRUBox>

      <ZRUBox>
        <ZDollarCoinIcon className='w-10 h-10 me-3' />

        <ZRUBox>
          <ZRUHeading
            as={ZRUHeadingAsE.h4}
            className='text-sm font-bold uppercase'
          >
            MONEY BACK GUARANTEE
          </ZRUHeading>
          <ZRUText
            as={ZRUTextAsE.p}
            className='text-sm font-light tracking-[0.01em] text-body'
          >
            100% money back guarantee
          </ZRUText>
        </ZRUBox>
      </ZRUBox>

      <ZRUBox>
        <Z24HoursLine className='w-10 h-10 me-3' />

        <ZRUBox>
          <ZRUHeading
            as={ZRUHeadingAsE.h4}
            className='text-sm font-bold uppercase'
          >
            ONLINE SUPPORT 24/7
          </ZRUHeading>
          <ZRUText
            as={ZRUTextAsE.p}
            className='text-sm font-light tracking-[0.01em] text-body'
          >
            Lorem ipsum dolor sit amet.
          </ZRUText>
        </ZRUBox>
        {/* End .info-box-content */}
      </ZRUBox>
    </ZRUBox>
  );
};

export default ZInformationBox;
