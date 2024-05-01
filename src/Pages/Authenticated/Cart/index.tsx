// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZPage } from '@/Components/Elements';

// #endregion

// #region ---- Custom Imports ----
import constants from '@/utils/constants';
import ZPublicNavigation from '@/Components/Common/Navigation';
import ZPagesMenu from '@/Components/Common/PagesMenu';
import { ZRUBox, ZRUHeading, ZRUText } from '@/Components/RadixUI';
import { ZChevronRightIcon } from '@/assets';
import { ZRUColorE, ZRUTextAsE } from '@/Types/radixUI/index.type';
import ZQuantitySelector from '@/Components/Elements/QuantitySelector';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const CartPage: React.FC = () => {
  // #region constants
  const pageHelmet = useMemo(
    () => ({
      title: `${constants.productInfo.name} - Cart Page - Zaions`
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

      {/* Content */}
      <ZRUBox className='border-t border-gray-100 pt-7'>
        {/* Checkout Progress Bar */}
        <ZRUBox className='flex items-center justify-center w-full gap-5'>
          <ZRUHeading className='text-xl text-body'>Shopping Cart</ZRUHeading>
          <ZChevronRightIcon className='w-7 h-7 text-body' />
          <ZRUHeading className='text-xl text-body'>Checkout</ZRUHeading>
          <ZChevronRightIcon className='w-7 h-7 text-body' />
          <ZRUHeading className='text-xl text-body'>Order Complete</ZRUHeading>
        </ZRUBox>

        <ZRUBox className='container flex items-start gap-2 mx-auto mt-6'>
          <ZRUBox className='w-7/12'>
            {/*  */}
            <ZRUBox className='flex items-center pb-1 mt-1 border-b border-gray-100'>
              <ZRUBox className='w-7/12'>
                <ZRUText
                  as={ZRUTextAsE.p}
                  className='text-base font-medium leading-8 text-lightDark'
                >
                  Product Details
                </ZRUText>
              </ZRUBox>
              <ZRUBox className='flex items-center justify-between flex-1 me-3'>
                <ZRUText
                  as={ZRUTextAsE.p}
                  className='text-base font-medium leading-8 text-center text-lightDark'
                >
                  Quantity
                </ZRUText>
                <ZRUText
                  as={ZRUTextAsE.p}
                  className='text-base font-medium leading-8 text-center text-lightDark'
                >
                  Total
                </ZRUText>
              </ZRUBox>
            </ZRUBox>

            {/*  */}
            <ZRUBox className='flex items-center pb-3 mt-3 border-b border-gray-100'>
              <ZRUBox className='flex items-center w-7/12 gap-3 '>
                <img
                  src='https://pagedone.io/asset/uploads/1701162850.png'
                  alt='perfume bottle image'
                  className='md:max-w-20'
                />

                <ZRUBox className='*:block *:font-medium *:text-left *:text-lightDark *:mb-1'>
                  <ZRUText as={ZRUTextAsE.span} className='text-base'>
                    Product title
                  </ZRUText>

                  <ZRUText as={ZRUTextAsE.span} className='text-sm'>
                    category
                  </ZRUText>

                  <ZRUText
                    as={ZRUTextAsE.span}
                    className='text-sm !text-primary'
                  >
                    price
                  </ZRUText>
                </ZRUBox>
              </ZRUBox>

              <ZRUBox className='flex items-center justify-between flex-1 me-3'>
                <ZQuantitySelector />

                <ZRUText className='text-lg font-medium text-primary'>
                  $0.00
                </ZRUText>
              </ZRUBox>
            </ZRUBox>

            {/*  */}
            <ZRUBox className='flex items-center justify-between'>
              <ZRUBox></ZRUBox>
            </ZRUBox>
          </ZRUBox>

          <ZRUBox className='w-5/12'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            minus architecto enim voluptates! Ullam, delectus beatae laboriosam,
            odit repellat, vero culpa ipsam aperiam maxime reiciendis ab
            similique quis voluptatibus et!
          </ZRUBox>
        </ZRUBox>
      </ZRUBox>
    </ZPage>
  );
};

export default CartPage;
