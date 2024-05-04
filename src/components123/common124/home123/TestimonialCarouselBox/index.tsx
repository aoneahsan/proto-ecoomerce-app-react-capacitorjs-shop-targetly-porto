// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUText } from '@/components123/RadixUI';
import { ZCarousel } from '@/components123/Elements';

// #endregion

// #region ---- Types Imports ----
import { ZRUTextAsE } from '@/types123/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { productLogo } from '@/assets';

// #endregion

const ZTestimonialCarouselBox: React.FC = () => {
  return (
    <ZRUBox className='w-full mb-2 uppercase border border-gray-100'>
      <ZCarousel
        className='pb-5 mb-2'
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
        <ZRUBox className='w-full h-full p-3'>
          <ZRUBox className='flex items-center gap-3'>
            <ZRUBox className='overflow-hidden bg-black rounded-full size-12'>
              <img
                src={productLogo}
                alt='testimonial-client-img'
                className='object-contain w-full h-full'
              />
            </ZRUBox>
            <ZRUBox>
              <ZRUText as={ZRUTextAsE.p} className='text-sm font-bold'>
                Client Title
              </ZRUText>
              <ZRUText as={ZRUTextAsE.p} className='text-xs text-gray-700'>
                Client position
              </ZRUText>
            </ZRUBox>
          </ZRUBox>

          <ZRUBox className='flex items-start gap-2 mt-5'>
            <ZRUText as={ZRUTextAsE.span} className='text-4xl font-bold'>
              “
            </ZRUText>
            <ZRUText
              as={ZRUTextAsE.p}
              className='pt-[3px] text-xs tracking-wide line-clamp-3'
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              euismod, nunc nec vehicula.
            </ZRUText>
          </ZRUBox>
        </ZRUBox>
      </ZCarousel>
    </ZRUBox>
  );
};

export default ZTestimonialCarouselBox;
