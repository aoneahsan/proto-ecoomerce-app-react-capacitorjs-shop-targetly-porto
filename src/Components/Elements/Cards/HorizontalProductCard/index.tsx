// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZRUBox, ZRUButton, ZRUText } from '@/Components/RadixUI';
import { ZRUTextAsE } from '@/Types/radixUI/index.type';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
interface ZHorizontalProductCardI {
  title?: string;
  price?: string;
  imgUrl?: string;
}
// #endregion

const ZHorizontalProductCard: React.FC<ZHorizontalProductCardI> = ({
  title = 'Product title',
  price = '$0.00',
  imgUrl = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' // just dome url, will be remove later
}) => {
  return (
    <ZRUBox className='flex flex-col justify-center w-64 gap-2 p-2 rounded-lg h-max'>
      <ZRUBox className='flex gap-2'>
        {imgUrl !== undefined && imgUrl?.trim()?.length > 0 ? (
          <img
            src={imgUrl}
            alt='Product Image'
            className='w-20 h-20 border border-gray-100 rounded-lg shrink-0'
          />
        ) : null}
        <ZRUBox className='flex flex-col justify-center text-dark'>
          <ZRUText
            as={ZRUTextAsE.p}
            className='inline-block text-base font-medium transition-all cursor-pointer line-clamp-1 hover:text-primary'
          >
            {title}
          </ZRUText>
          <ZRUText as={ZRUTextAsE.p} className='text-base line-clamp-3'>
            {price}
          </ZRUText>
        </ZRUBox>
      </ZRUBox>
      {/* <ZRUButton className='p-2 font-bold text-indigo-500 rounded hover:bg-purple-300 bg-neutral-50'>
        See more
      </ZRUButton> */}
    </ZRUBox>
  );
};

export default ZHorizontalProductCard;
