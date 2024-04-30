// #region ---- Core Imports ----
import { ZRUBox, ZRUButton, ZRUHeading, ZRUText } from '@/Components/RadixUI';
import {
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUTextAsE,
  ZRUVariantE
} from '@/Types/radixUI/index.type';
import React from 'react';
import ZQuantitySelector from '../../QuantitySelector';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
interface ZShoppingCardI {
  imgUrl?: string;
  title?: string;
  price?: string;
  removeOnClick?: React.MouseEventHandler<HTMLButtonElement>;
}
// #endregion

const ZShoppingCard: React.FC<ZShoppingCardI> = ({
  imgUrl = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', // just dome url, will be remove later
  title = 'Product Title',
  price = '$0.00',
  removeOnClick
}) => {
  return (
    <ZRUBox className='items-center justify-between p-3 mb-6 border border-gray-100 rounded-lg shadow-md bg-light sm:flex sm:justify-start'>
      <img
        src={imgUrl}
        alt='product-image'
        className='w-full rounded-lg sm:h-28 sm:w-24'
      />
      <ZRUBox className='sm:ml-4 sm:w-full'>
        <ZRUBox className='mt-5 mb-3 sm:mt-0'>
          <ZRUHeading
            as={ZRUHeadingAsE.h2}
            className='text-base font-bold text-gray-900 line-clamp-1'
          >
            {title}
          </ZRUHeading>

          <ZRUText as={ZRUTextAsE.p} className='mt-1 text-sm line-clamp-1'>
            {price}
          </ZRUText>
        </ZRUBox>

        <ZRUBox className='flex justify-between mt-4 sm:mt-0 sm:block'>
          <ZQuantitySelector />

          <ZRUButton
            size='1'
            className='mt-3'
            color={ZRUColorE.red}
            variant={ZRUVariantE.surface}
            onClick={removeOnClick}
          >
            Remove
          </ZRUButton>
        </ZRUBox>
      </ZRUBox>
    </ZRUBox>
  );
};

export default ZShoppingCard;
