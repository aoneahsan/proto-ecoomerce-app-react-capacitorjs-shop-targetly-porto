// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUText } from '@/components123/RadixUI';

// #endregion

// #region ---- Types Imports ----
import { ZRUTextAsE } from '@/types123/radixUI/index.type';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ZQuantitySelector: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <ZRUBox
      className={ZClassNames('flex items-center border-gray-100', className)}
    >
      <ZRUText
        as={ZRUTextAsE.span}
        className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-primary hover:text-gray-100'
      >
        -
      </ZRUText>
      <input
        className='w-8 h-8 text-xs text-center bg-white border outline-none'
        type='number'
        value='2'
        min='1'
        readOnly
      />
      <ZRUText
        as={ZRUTextAsE.span}
        className='px-3 py-1 duration-100 bg-gray-100 rounded-r cursor-pointer hover:bg-primary hover:text-gray-100'
      >
        +
      </ZRUText>
    </ZRUBox>
  );
};

export default ZQuantitySelector;
