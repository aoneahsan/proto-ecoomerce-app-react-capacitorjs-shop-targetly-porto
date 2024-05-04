// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZRUButton, ZRUHeading, ZRUText } from '@/components123/RadixUI';

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

const Downloads: React.FC = () => {
  return (
    <>
      <ZRUHeading
        as={ZRUHeadingAsE.h3}
        className='text-[.8rem] ls-n-25 p-[.5rem_1.5rem_.5rem] font-bold text-xl'
      >
        Downloads
      </ZRUHeading>

      <ZRUText className='block mt-3 text-medium ms-[1.5rem]'>
        No downloads available yet.
      </ZRUText>

      <ZRUButton size='3' className='mt-3 maxSm:w-full ms-[1.5rem]'>
        Go Shop
      </ZRUButton>
    </>
  );
};

export default Downloads;
