// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUText } from '@/components/RadixUI';
import { ZCarousel } from '@/components/Elements';
import ZProductCard from '@/components/Elements/Cards/ProductCard';
import { useZMediaQueryScale } from '@/hook/helpers.hook';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ZProductCarouselBox: React.FC = () => {
  // #region Custom Hooks
  const { isXlScale } = useZMediaQueryScale();
  // #endregion

  return (
    <ZRUBox className='mb-2'>
      <ZCarousel
        infinite={false}
        slidesToSlide={isXlScale ? 4 : 1}
        itemClass='pb-10'
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1422
            },
            items: 4
          },
          mobile: {
            breakpoint: {
              max: 766,
              min: 668
            },
            items: 2
          },
          below500: {
            breakpoint: {
              max: 668,
              min: 0
            },
            items: 1
          },
          tablet: {
            breakpoint: {
              max: 1422,
              min: 766
            },
            items: 3
          }
        }}
      >
        <ZProductCard />
        <ZProductCard isFavorite />
        <ZProductCard />
        <ZProductCard />

        <ZProductCard />
        <ZProductCard isFavorite />
        <ZProductCard />
        <ZProductCard />
      </ZCarousel>
    </ZRUBox>
  );
};

export default ZProductCarouselBox;
