// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUFlex, ZRUText } from '@/Components/RadixUI';
import ZHorizontalProductCard from '@/Components/Elements/Cards/HorizontalProductCard';

// #endregion

// #region ---- Types Imports ----
import { ZRUTextAsE } from '@/Types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ProductsWidgetsBox: React.FC = () => {
  return (
    <ZRUFlex className='w-full mt-4 pb-4 maxSm:justify-center maxSm:text-center maxSm:px-1 min900px:*:w-1/2 xl:*:w-auto xl:*:flex-1 gap-3 border-b border-gray-100 max900px:flex-wrap gap-y-4'>
      <ZRUBox>
        <ZRUText
          as={ZRUTextAsE.div}
          className='py-1 text-base font-bold uppercase min900px:mb-2 xl:mb-4'
        >
          Top Rated Products
        </ZRUText>
        <ZHorizontalProductCard />
      </ZRUBox>

      <ZRUBox>
        <ZRUText
          as={ZRUTextAsE.div}
          className='py-1 text-base font-bold uppercase min900px:mb-2 xl:mb-4'
        >
          Best Selling Products
        </ZRUText>
        <ZHorizontalProductCard />
      </ZRUBox>

      <ZRUBox>
        <ZRUText
          as={ZRUTextAsE.div}
          className='py-1 text-base font-bold uppercase min900px:mb-2 xl:mb-4'
        >
          Latest Products
        </ZRUText>
        <ZHorizontalProductCard />
        <ZHorizontalProductCard />
      </ZRUBox>
    </ZRUFlex>
  );
};

export default ProductsWidgetsBox;
