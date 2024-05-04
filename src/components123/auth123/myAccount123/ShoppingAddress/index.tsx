// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUInput
} from '@/components123/RadixUI';

// #endregion

// #region ---- Types Imports ----
import { ZRUColorE, ZRUHeadingAsE } from '@/types123/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ShoppingAddress: React.FC = () => {
  return (
    <>
      <ZRUHeading
        as={ZRUHeadingAsE.h3}
        className='text-[.8rem] ls-n-25 font-bold text-xl'
      >
        Shipping Address
      </ZRUHeading>

      <ZRUBox className='flex items-start flex-col sm:flex-row w-full gap-4 mt-4 *:w-1/2'>
        <ZRUInput
          size='3'
          label='First name'
          required
          className='maxSm:w-full'
        />
        <ZRUInput
          size='3'
          label='Last name'
          required
          className='maxSm:w-full'
        />
      </ZRUBox>

      <ZRUBox className='mt-4'>
        <ZRUInput size='3' label='Company' required />
      </ZRUBox>

      <ZRUBox className='mt-4'>
        <ZRUInput size='3' label='Country / Region' required />
      </ZRUBox>

      <ZRUBox className='mt-4'>
        <ZRUInput
          size='3'
          label='Street address'
          required
          placeholder='House number and street name'
        />
        <ZRUInput
          size='3'
          className='mt-3'
          placeholder='Apartment, suite, unit, etc. (optional)'
        />
      </ZRUBox>

      <ZRUBox className='mt-4'>
        <ZRUInput size='3' label='Town / City' required />
      </ZRUBox>

      <ZRUBox className='mt-4'>
        <ZRUInput size='3' label='State / Country' required />
      </ZRUBox>

      <ZRUBox className='mt-4'>
        <ZRUInput size='3' label='Postcode / ZIP' required />
      </ZRUBox>

      <ZRUBox className='mt-4'>
        <ZRUButton size='3' color={ZRUColorE.iris} className='maxSm:w-full'>
          Save Address
        </ZRUButton>
      </ZRUBox>
    </>
  );
};

export default ShoppingAddress;
