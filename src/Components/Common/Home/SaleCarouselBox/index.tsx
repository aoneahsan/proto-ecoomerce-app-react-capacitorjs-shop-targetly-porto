// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZCarousel } from '@/Components/Elements';
import { ZRUBox } from '@/Components/RadixUI';
import ZSaleCard from '@/Components/Elements/Cards/SaleCard';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ZSaleCarouselBox: React.FC = () => {
  return (
    <ZRUBox className='w-full mb-2 uppercase border border-gray-100'>
      <ZCarousel
        className='w-full pb-5 mb-2'
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 1
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 1
          }
        }}
      >
        <ZSaleCard />
        <ZSaleCard image='https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
      </ZCarousel>
    </ZRUBox>
  );
};

export default ZSaleCarouselBox;
