// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUFlex, ZRUHeading, ZRUText } from '@/components123/RadixUI';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZCreditCardIcon, ZMdReturnIcon, ZSupportIcon } from '@/assets';
import { ZRUHeadingAsE, ZRUTextAsE } from '@/types123/radixUI/index.type';

// #endregion

const ZFeaturesBox: React.FC = () => {
  return (
    <ZRUFlex className='gap-5 py-5 *:flex-1 w-full maxMd:flex-col'>
      <ZRUBox className='flex flex-col items-center gap-1 text-center'>
        <div className='flex items-center justify-center w-16 h-16 overflow-hidden border rounded-full border-primary'>
          <ZSupportIcon className='w-10 h-10 text-primary' />
        </div>
        <ZRUHeading as={ZRUHeadingAsE.h3} className='text-base uppercase'>
          Customer Support
        </ZRUHeading>

        <ZRUText as={ZRUTextAsE.p} className='text-xs text-body'>
          Need Assistance?
        </ZRUText>

        <ZRUText as={ZRUTextAsE.p} className='text-sm text-body line-clamp-3'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec
          vestibulum magna, et dapib.
        </ZRUText>
      </ZRUBox>

      <ZRUBox className='flex flex-col items-center gap-1 text-center'>
        <div className='flex items-center justify-center w-16 h-16 overflow-hidden border rounded-full border-primary'>
          <ZCreditCardIcon className='w-10 h-10 text-primary' />
        </div>
        <ZRUHeading as={ZRUHeadingAsE.h3} className='text-base uppercase'>
          Secured Payment
        </ZRUHeading>

        <ZRUText as={ZRUTextAsE.p} className='text-xs text-body'>
          Safe & Fast
        </ZRUText>

        <ZRUText as={ZRUTextAsE.p} className='text-sm text-body line-clamp-3'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec
          vestibulum magna, et dapib.
        </ZRUText>
      </ZRUBox>

      <ZRUBox className='flex flex-col items-center gap-1 text-center'>
        <div className='flex items-center justify-center w-16 h-16 overflow-hidden border rounded-full border-primary'>
          <ZMdReturnIcon className='w-10 h-10 text-primary' />
        </div>
        <ZRUHeading as={ZRUHeadingAsE.h3} className='text-base uppercase'>
          Returns
        </ZRUHeading>

        <ZRUText as={ZRUTextAsE.p} className='text-xs text-body'>
          Easy & Free
        </ZRUText>

        <ZRUText as={ZRUTextAsE.p} className='text-sm text-body line-clamp-3'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec
          vestibulum magna, et dapib.
        </ZRUText>
      </ZRUBox>
    </ZRUFlex>
  );
};

export default ZFeaturesBox;
