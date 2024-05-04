// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUButton, ZRUHeading, ZRUInput } from '@/components/RadixUI';

// #endregion

// #region ---- Types Imports ----
import { ZRUColorE, ZRUHeadingAsE } from '@/types/radixUI/index.type';
import { UserSvg } from '@/assets';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const AccountDetails: React.FC = () => {
  return (
    <>
      <ZRUBox className='flex items-center w-full gap-3'>
        <UserSvg className='w-8 h-8 text-medium/50' />
        <ZRUHeading
          as={ZRUHeadingAsE.h3}
          className='text-[.8rem] ls-n-25 font-bold text-xl'
        >
          Account Details
        </ZRUHeading>
      </ZRUBox>

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
        <ZRUInput
          size='3'
          label='Display name'
          required
          infoText='This will be how your name will be displayed in the account section and in reviews'
        />
      </ZRUBox>

      <ZRUBox className='mt-4'>
        <ZRUInput size='3' label='Email address' required />
      </ZRUBox>

      <ZRUBox className='mt-4'>
        <ZRUButton size='3' color={ZRUColorE.iris} className='maxSm:w-full'>
          Save Changes
        </ZRUButton>
      </ZRUBox>

      <ZRUBox className='px-1 py-2 mt-6 border-2 border-gray-100 sm:px-6 sm:py-5'>
        <ZRUHeading
          as={ZRUHeadingAsE.h3}
          className='text-[.8rem] font-bold text-base uppercase'
        >
          Password Change
        </ZRUHeading>

        <ZRUBox className='mt-4'>
          <ZRUInput
            size='3'
            label='Current Password (leave blank to leave unchanged)'
            required
          />
        </ZRUBox>

        <ZRUBox className='mt-4'>
          <ZRUInput
            size='3'
            label='New Password (leave blank to leave unchanged)'
            required
          />
        </ZRUBox>

        <ZRUBox className='mt-4'>
          <ZRUInput size='3' label='Confirm New Password' required />
        </ZRUBox>

        <ZRUBox className='mt-4'>
          <ZRUButton size='3' color={ZRUColorE.iris} className='maxSm:w-full'>
            Save Changes
          </ZRUButton>
        </ZRUBox>
      </ZRUBox>
    </>
  );
};

export default AccountDetails;
