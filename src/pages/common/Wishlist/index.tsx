// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZPage } from '@/components/Elements';
import ZPublicNavigation from '@/components/common124/Navigation';
import ZPagesMenu from '@/components/common124/PagesMenu';
import constants from '@/utils/constants';
import ZPublicFooter from '@/components/common124/Footer';
import {
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUScrollArea,
  ZRUText
} from '@/components/RadixUI';

// #endregion

// #region ---- Types Imports ----
import {
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUScrollbarTypeE,
  ZRUScrollbarsE,
  ZRUTextAsE
} from '@/types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const Wishlist: React.FC = () => {
  // #region Constants
  const pageHelmet = useMemo(
    () => ({
      title: `${constants.productInfo.name} - Wishlist Page - Zaions`
    }),
    []
  );
  // #endregion

  return (
    <ZPage helmet={pageHelmet}>
      {/* Navigation */}
      <ZPublicNavigation showMenuBtn={false} />

      {/* pagesMenu */}
      <ZPagesMenu />

      <ZRUBox className='mx-auto mt-4 mb-6 xl:container maxXl:px-3'>
        <ZRUHeading
          as={ZRUHeadingAsE.h2}
          className='text-xl mb-3 ls-n-25 py-[.5rem] font-bold'
        >
          Wishlist
        </ZRUHeading>

        <ZRUScrollArea
          scrollbars={ZRUScrollbarsE.horizontal}
          type={ZRUScrollbarTypeE.auto}
        >
          {/*  */}
          <ZRUBox className='min-w-[27.5rem] flex items-center pb-1 mt-1 border-b border-gray-100'>
            <ZRUBox className='min-w-[16rem] md:flex-1'>
              <ZRUText
                as={ZRUTextAsE.p}
                className='text-base font-medium leading-8 text-lightDark'
              >
                Product
              </ZRUText>
            </ZRUBox>

            <ZRUBox className='md:flex-1 w-[10rem]'>
              <ZRUText
                as={ZRUTextAsE.p}
                className='text-base font-medium leading-8 text-lightDark'
              >
                Price
              </ZRUText>
            </ZRUBox>

            <ZRUBox className='md:flex-1 w-[10rem]'>
              <ZRUText
                as={ZRUTextAsE.p}
                className='text-base font-medium leading-8 text-lightDark'
              >
                Stock Status
              </ZRUText>
            </ZRUBox>

            <ZRUBox className='w-[14.3rem]'>
              <ZRUText
                as={ZRUTextAsE.p}
                className='text-base font-medium leading-8 text-lightDark'
              >
                Actions
              </ZRUText>
            </ZRUBox>
          </ZRUBox>

          {/*  */}
          <ZRUBox className='min-w-[27.5rem] flex items-center pb-3 mt-3 border-b border-gray-100'>
            <ZRUBox className='flex items-center min-w-[16rem] gap-3 md:flex-1'>
              <img
                src='https://pagedone.io/asset/uploads/1701162850.png'
                alt='perfume bottle image'
                className='max-w-20'
              />

              <ZRUBox className='*:block *:font-medium *:text-left *:text-lightDark *:mb-1'>
                <ZRUText as={ZRUTextAsE.span} className='text-base'>
                  Product title
                </ZRUText>

                <ZRUText as={ZRUTextAsE.span} className='text-sm'>
                  category
                </ZRUText>

                <ZRUText as={ZRUTextAsE.span} className='text-sm !text-primary'>
                  price
                </ZRUText>
              </ZRUBox>
            </ZRUBox>

            <ZRUBox className='md:flex-1 w-[10rem]'>
              <ZRUText
                as={ZRUTextAsE.p}
                className='text-base font-medium leading-8 text-lightDark'
              >
                Price
              </ZRUText>
            </ZRUBox>

            <ZRUBox className='md:flex-1 w-[10rem]'>
              <ZRUText
                as={ZRUTextAsE.p}
                className='text-base font-medium leading-8 text-lightDark'
              >
                Price
              </ZRUText>
            </ZRUBox>

            <ZRUBox className='flex gap-2 uppercase w-max'>
              <ZRUButton color={ZRUColorE.gold}>Quick View</ZRUButton>
              <ZRUButton color={ZRUColorE.iris}>Add to cart</ZRUButton>
            </ZRUBox>
          </ZRUBox>
        </ZRUScrollArea>
      </ZRUBox>

      <ZPublicFooter />
    </ZPage>
  );
};

export default Wishlist;
