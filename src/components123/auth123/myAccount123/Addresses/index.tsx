// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import {
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUText
} from '@/components123/RadixUI';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { ZRUHeadingAsE } from '@/types123/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const Addresses: React.FC = () => {
  return (
    <ZRUBox className='md:ms-[1.5rem]'>
      <ZRUHeading
        as={ZRUHeadingAsE.h3}
        className='text-[.8rem] ls-n-25 py-[.5rem] font-bold text-xl maxMd:text-center'
      >
        Addresses
      </ZRUHeading>

      <ZRUText className='block text-sm text-medium maxMd:text-center'>
        The following addresses will be used on the checkout page by default.
      </ZRUText>

      <ZRUBox className='flex flex-col items-start md:mt-10 md:flex-row gap-7'>
        <ZRUBox className='md:me-9 maxMd:w-full maxMd:text-center'>
          <ZRUHeading
            as={ZRUHeadingAsE.h3}
            className='text-[1.1rem] font-bold ls-n-25'
          >
            Billing address
          </ZRUHeading>
          <ZRUText className='block text-sm text-medium'>
            You have not set up this type of address yet.
          </ZRUText>

          <ZRUButton size='3' className='mt-3 maxSm:w-full'>
            Add Address
          </ZRUButton>
        </ZRUBox>

        <ZRUBox className='md:ms-9 maxMd:w-full maxMd:text-center'>
          <ZRUHeading
            as={ZRUHeadingAsE.h3}
            className='text-[1.1rem] font-bold ls-n-25'
          >
            Shipping address
          </ZRUHeading>
          <ZRUText className='block text-sm text-medium'>
            You have not set up this type of address yet.
          </ZRUText>
          <ZRUButton size='3' className='mt-3 maxSm:w-full'>
            Add Address
          </ZRUButton>
        </ZRUBox>
      </ZRUBox>
    </ZRUBox>
  );
};

export default Addresses;
