// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBox,
  ZRUButton,
  ZRUCheckboxGroup,
  ZRUCheckboxItem,
  ZRUHeading,
  ZRUInput,
  ZRURadioGroup,
  ZRURadioItem,
  ZRUText,
  ZRUTextArea
} from '@/components/RadixUI';
import {
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUTextAsE
} from '@/types/radixUI/index.type';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const Checkout: React.FC = () => {
  return (
    <ZRUBox className='mx-auto mb-6 xl:container maxXl:px-3 sm:mt-10'>
      <ZRUBox>
        <ZRUText
          as={ZRUTextAsE.span}
          className='block text-sm font-medium leading-8 text-body'
        >
          Returning customer?
          <ZRUText
            as={ZRUTextAsE.span}
            className='inline-block text-sm font-medium leading-8 cursor-pointer ms-1 text-lightDark hover:underline'
          >
            Login
          </ZRUText>
        </ZRUText>

        <ZRUText
          as={ZRUTextAsE.span}
          className='block text-sm font-medium leading-8 text-body'
        >
          Have a coupon?
          <ZRUText
            as={ZRUTextAsE.span}
            className='inline-block text-sm font-medium leading-8 cursor-pointer ms-1 text-lightDark hover:underline'
          >
            entry your code
          </ZRUText>
        </ZRUText>
      </ZRUBox>

      <ZRUBox className='flex flex-col items-start gap-4 min900px:flex-row'>
        <ZRUBox className='w-full mb-6 min900px:w-7/12 min900px:mb-0'>
          <ZRUHeading
            as={ZRUHeadingAsE.h3}
            className='mt-6 text-2xl leading-8 text-lightDark'
          >
            Billing details
          </ZRUHeading>

          <ZRUBox className='flex md:items-center gap-4 mt-4 *:flex-1 flex-col md:flex-row'>
            <ZRUInput size='3' label='First name' required />
            <ZRUInput size='3' label='Last name' required />
          </ZRUBox>

          <ZRUInput size='3' label='Company name (optional)' className='mt-4' />

          <ZRUInput
            size='3'
            label='Country / Region'
            required
            className='mt-4'
          />

          <ZRUInput
            size='3'
            label='Street address'
            required
            className='mt-4'
            placeholder='House number and street name'
          />

          <ZRUInput
            size='3'
            className='mt-3'
            placeholder='Apartment, suite, unite, etc. (optional)'
          />

          <ZRUInput size='3' label='Town / City' required className='mt-4' />

          <ZRUInput size='3' label='State / County' required className='mt-4' />

          <ZRUInput size='3' label='Postcode / Zip' required className='mt-4' />

          <ZRUInput size='3' label='Phone' required className='mt-4' />

          <ZRUInput size='3' label='Phone' required className='mt-4' />

          <ZRUInput size='3' label='Email address' required className='mt-4' />

          <ZRUBox className='mt-4'>
            <ZRUCheckboxGroup size='3'>
              <ZRUCheckboxItem value='1'>Create an account?</ZRUCheckboxItem>
              <ZRUCheckboxItem value='2'>
                Ship to a different address?
              </ZRUCheckboxItem>
            </ZRUCheckboxGroup>
          </ZRUBox>

          <ZRUTextArea
            size='3'
            className='mt-4'
            label='Order notes (optional)'
            placeholder='Notes about your order, e.g. special notes for delivery.'
          />
        </ZRUBox>

        <ZRUBox className='w-full px-3 py-2 mt-3 mb-6 border-2 border-gray-100 sm:px-5 sm:py-4 min900px:w-5/12 min900px:mb-0'>
          <ZRUHeading className='text-base font-semibold uppercase text-lightDark'>
            Your Order
          </ZRUHeading>

          <ZRUBox className='pb-1 mt-2 border-b border-gray-100 sm:px-3'>
            <ZRUText className='block font-medium'>Product</ZRUText>
          </ZRUBox>

          <ZRUBox className='flex flex-col items-center justify-between pb-2 mt-4 text-sm font-medium xs:flex-row sm:px-3 maxXs:border-b maxXs:border-gray-100'>
            <ZRUText>Circled Ultimate 3D Speaker × 4</ZRUText>
            <ZRUText className='maxXs:mt-2 maxXs:text-primary'>$0.00</ZRUText>
          </ZRUBox>

          <ZRUBox className='flex flex-col items-center justify-between pb-2 mt-4 text-sm font-medium xs:flex-row sm:px-3 maxXs:border-b maxXs:border-gray-100'>
            <ZRUText>Fashion Computer Bag × 2</ZRUText>
            <ZRUText className='maxXs:mt-2 maxXs:text-primary'>$0.00</ZRUText>
          </ZRUBox>

          <ZRUBox className='flex items-center justify-between pb-2 mt-6 text-sm font-medium border-b border-gray-100 sm:px-3'>
            <ZRUText className='!text-base text-lightDark'>Subtotal</ZRUText>
            <ZRUText>$0.00</ZRUText>
          </ZRUBox>

          <ZRUBox className='mt-2 sm:px-3'>
            <ZRUText className='block mb-2 font-medium'>Shipping</ZRUText>
            <ZRURadioGroup>
              <ZRURadioItem value='local'>Local pickup</ZRURadioItem>
              <ZRURadioItem value='flat'>Flat rate</ZRURadioItem>
            </ZRURadioGroup>
          </ZRUBox>

          <ZRUBox className='flex items-center justify-between pt-3 mt-4 border-t border-gray-100 sm:px-3'>
            <ZRUText className='block text-lg font-medium'>Total</ZRUText>
            <ZRUText className='block font-semibold sm:text-2xl text-tertiary'>
              $0.00
            </ZRUText>
          </ZRUBox>

          <ZRUBox className='pt-2 mt-3 border-t border-gray-100 sm:px-3'>
            <ZRUText className='block mb-2 font-medium'>
              Payment methods
            </ZRUText>
            <ZRUText
              as={ZRUTextAsE.p}
              className='text-base font-medium text-tertiary'
            >
              Sorry, it seems that there are no available payment methods for
              your state. Please contact us if you require assistance or wish to
              make alternate arrangements.
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

export default Checkout;
