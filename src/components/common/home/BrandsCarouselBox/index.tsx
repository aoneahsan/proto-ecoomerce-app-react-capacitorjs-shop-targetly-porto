// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZCarousel } from '@/components/Elements';

// #endregion

// #region ---- Custom Imports ----
import { useZMediaQueryScale } from '@/hook/helpers.hook';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  davidSmith,
  ronJones,
  goldenGrid,
  CTM,
  golden,
  avantGarde
} from '@/assets';

// #endregion

const ZBrandsCarouselBox: React.FC = () => {
  // #region Custom Hooks
  const { isXlScale } = useZMediaQueryScale();
  // #endregion

  return (
    <div className='py-3 mt-4 border-gray-100 md:py-8 border-y'>
      <ZCarousel
        infinite={false}
        showDots={false}
        slidesToSlide={isXlScale ? 5 : 1}
        itemClass='maxXs:flex maxXs:item-center maxXs:justify-center'
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1422
            },
            items: 5
          },
          tablet: {
            breakpoint: {
              max: 1422,
              min: 766
            },
            items: 4
          },
          mobile: {
            breakpoint: {
              max: 766,
              min: 668
            },
            items: 4
          },
          below500: {
            breakpoint: {
              max: 668,
              min: 494
            },
            items: 3
          },
          below494: {
            breakpoint: {
              max: 494,
              min: 316
            },
            items: 2
          },
          below316: {
            breakpoint: {
              max: 316,
              min: 0
            },
            items: 1
          }
        }}
      >
        {[davidSmith, ronJones, goldenGrid, CTM, golden, avantGarde].map(
          (el, index) => {
            return (
              <img
                src={el}
                key={index}
                width='140'
                height='60'
                alt='brand'
                className='select-none'
              />
            );
          }
        )}
      </ZCarousel>
    </div>
  );
};

export default ZBrandsCarouselBox;
