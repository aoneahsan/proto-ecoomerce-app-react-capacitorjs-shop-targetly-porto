// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUHeading, ZRUText } from '@/Components/RadixUI';

// #endregion

// #region ---- Types Imports ----
import { ZRUHeadingAsE, ZRUTextAsE } from '@/Types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ZBrowseCategoriesBox: React.FC = () => {
  return (
    <ZRUBox className='w-full mb-2 uppercase border border-gray-100'>
      <ZRUHeading
        as={ZRUHeadingAsE.h2}
        className='cursor-pointer text-[.8rem] bg-gray ls-n-25 p-[.5rem_1.5rem_.5rem] font-bold border-b border-gray-200'
      >
        Browse Categories
      </ZRUHeading>

      <ul className='*:px-[1.4rem] *:font-medium *:text-sm *:text-medium *:cursor-pointer hover:*:bg-primary hover:*:text-gray-100'>
        <li className='group/item'>
          <ZRUText
            as={ZRUTextAsE.p}
            className='text-inherit py-[.6rem] border-b border-b-gray-100 group-hover/item:border-b-transparent transition-all'
          >
            Home
          </ZRUText>
        </li>

        <li className='group/item'>
          <ZRUText
            as={ZRUTextAsE.p}
            className='text-inherit py-[.6rem] transition-all'
          >
            Home
          </ZRUText>
        </li>
      </ul>
    </ZRUBox>
  );
};

export default ZBrowseCategoriesBox;
