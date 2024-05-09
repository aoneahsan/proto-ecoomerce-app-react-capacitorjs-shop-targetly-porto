// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import {
  ZRURadioItem,
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUInput,
  ZRURadioGroup,
  ZRUScrollArea,
  ZRUText
} from '@/Components/RadixUI';
import ZQuantitySelector from '@/Components/Elements/QuantitySelector';

// #endregion

// #region ---- Types Imports ----
import {
  ZRUColorE,
  ZRUScrollbarTypeE,
  ZRUScrollbarsE,
  ZRUTextAsE
} from '@/Types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

const Cart: React.FC = () => {
  return (
    <ZRUBox className='flex flex-col items-start gap-4 mx-auto sm:mt-10 xl:container maxXl:px-3 min900px:flex-row'>
      <ZRUBox className='w-full mb-6 min900px:w-7/12 min900px:mb-0'>
        <ZRUScrollArea
          scrollbars={ZRUScrollbarsE.horizontal}
          type={ZRUScrollbarTypeE.auto}
        >
          {/*  */}
          <ZRUBox className='min-w-[27.5rem] flex items-center pb-1 mt-1 border-b border-gray-100'>
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
          <ZRUBox className='min-w-[27.5rem] flex items-center pb-3 mt-3 border-b border-gray-100'>
            <ZRUBox className='flex items-center w-7/12 gap-3 '>
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

            <ZRUBox className='flex items-center justify-between flex-1 me-3'>
              <ZQuantitySelector />

              <ZRUText className='text-lg font-medium text-primary'>
                $0.00
              </ZRUText>
            </ZRUBox>
          </ZRUBox>
        </ZRUScrollArea>

        {/*  */}
        <ZRUBox className='flex mt-3 sm:items-center sm:justify-between maxSm:flex-col maxSm:gap-3'>
          <ZRUBox className='flex gap-2 sm:items-center maxSm:flex-col'>
            <ZRUInput placeholder='Coupon code' />
            <ZRUButton className='maxSm:w-full'>Apply coupon</ZRUButton>
          </ZRUBox>

          <ZRUBox>
            <ZRUButton className='maxSm:w-full maxSm:mt-1'>
              Update cart
            </ZRUButton>
          </ZRUBox>
        </ZRUBox>
      </ZRUBox>

      <ZRUBox className='w-full px-3 py-2 mb-6 border-2 border-gray-100 sm:px-5 sm:py-4 min900px:w-5/12 min900px:mb-0'>
        <ZRUHeading className='text-base font-semibold uppercase text-lightDark'>
          Cart Total
        </ZRUHeading>

        <ZRUBox className='flex items-center justify-between pb-2 mt-4 font-medium border-b border-gray-100 sm:px-3'>
          <ZRUText>Subtotal</ZRUText>
          <ZRUText className='text-xl text-primary'>$0.00</ZRUText>
        </ZRUBox>

        <ZRUBox className='mt-2 sm:px-3'>
          <ZRUText className='block font-medium'>Shipping</ZRUText>

          <ZRUBox className='mt-2'>
            <ZRURadioGroup>
              <ZRURadioItem value='local'>Local pickup</ZRURadioItem>
              <ZRURadioItem value='flat'>Flat rate</ZRURadioItem>
            </ZRURadioGroup>
          </ZRUBox>

          <ZRUText className='block mt-3 font-medium'>Shipping to NY.</ZRUText>
          <ZRUInput className='mt-3' />
          <ZRUInput className='mt-3' />
          <ZRUInput className='mt-3' />

          <ZRUButton className='mt-3 maxSm:w-full' size='3'>
            Update Total
          </ZRUButton>

          <ZRUBox className='flex items-center justify-between pt-2 mt-4 border-t border-gray-100'>
            <ZRUText className='block text-lg font-medium'>Total</ZRUText>
            <ZRUText className='block text-2xl font-semibold text-tertiary'>
              $0.00
            </ZRUText>
          </ZRUBox>

          <ZRUBox className='pt-6 pb-3 mt-4 border-t border-gray-100 sm:px-3'>
            <ZRUButton
              className='w-full uppercase'
              size='4'
              color={ZRUColorE.violet}
            >
              Place order
            </ZRUButton>
          </ZRUBox>
        </ZRUBox>
      </ZRUBox>
    </ZRUBox>
  );
};

export default Cart;
