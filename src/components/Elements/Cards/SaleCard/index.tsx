// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUButton, ZRUText } from '@/components/RadixUI';
import { ZRUTextAsE } from '@/types/radixUI/index.type';

// #endregion

// #region ---- Types Imports ----
interface ZSaleCardI {
  image?: string;
  title?: string;
  description?: string;
  showSaleCoupon?: boolean;
  saleCouponAmount?: string;
  saleCouponType?: string;
  btnOnClick?: React.MouseEventHandler<HTMLButtonElement>;
}
// #endregion

const ZSaleCard: React.FC<ZSaleCardI> = ({
  image,
  title = 'Product Title',
  description = 'Product Description',
  showSaleCoupon = true,
  saleCouponAmount = '0',
  saleCouponType = '%',
  btnOnClick
}) => {
  return (
    <div className='flex flex-col justify-center w-full h-full gap-1'>
      {image !== undefined && image?.trim()?.length > 0 ? (
        <div className='h-48'>
          <img src={image} className='w-full h-full' />
        </div>
      ) : null}

      <div className='flex flex-col gap-4 p-3'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col mt-2'>
            <ZRUText as={ZRUTextAsE.span} className='text-sm font-bold'>
              {title}
            </ZRUText>
            <ZRUText as={ZRUTextAsE.p} className='text-xs text-gray-700'>
              {description}
            </ZRUText>
          </div>
        </div>

        {/* Sale Coupon */}
        {showSaleCoupon ? (
          <ZRUText
            as={ZRUTextAsE.p}
            className='flex items-center gap-1 font-bold'
          >
            <div className='flex items-center'>
              <ZRUText as={ZRUTextAsE.span} className='text-[9px] -rotate-90'>
                up to
              </ZRUText>
              <ZRUText as={ZRUTextAsE.span} className='text-4xl -ms-1'>
                {saleCouponAmount}
              </ZRUText>
            </div>
            <div>
              <ZRUText as={ZRUTextAsE.span} className='block text-xs'>
                {saleCouponType}
              </ZRUText>
              <ZRUText as={ZRUTextAsE.span} className='block text-xs'>
                OFF
              </ZRUText>
            </div>
          </ZRUText>
        ) : null}

        <ZRUButton className='mt-2' onClick={btnOnClick}>
          View sale
        </ZRUButton>
      </div>
    </div>
  );
};

export default ZSaleCard;
