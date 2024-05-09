// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import {
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUText,
  ZRUBadge
} from '@/Components/RadixUI';

// #endregion

// #region ---- Custom Imports ----
import { ZHeartIcon, ZSolidHeartIcon } from '@/assets';

// #endregion

// #region ---- Types Imports ----
import {
  ZRUBadgeVariantE,
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUTextAsE
} from '@/Types/radixUI/index.type';

interface ZProductCardI {
  imgUrl?: string;
  showDiscountCoupon?: boolean;
  discountCouponText?: string;
  showSecondaryCoupon?: boolean;
  secondaryCouponText?: string;
  category?: string;
  categoryOnClick?: React.MouseEventHandler<HTMLElement>;
  title?: string;
  isFavorite?: boolean;
  price?: string;
  showBtn?: boolean;
  btnText?: string;
  btnOnClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// #endregion

const ZProductCard: React.FC<ZProductCardI> = ({
  imgUrl = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', // just dome url, will be remove later
  showDiscountCoupon = true,
  discountCouponText = '0%',
  showSecondaryCoupon = true,
  secondaryCouponText = 'HOT',
  category = 'category',
  categoryOnClick,
  title = 'Product Title',
  isFavorite = false,
  showBtn = true,
  price = '$0.00',
  btnText = 'Quick view',
  btnOnClick
}) => {
  return (
    <ZRUBox className='overflow-hidden rounded-md shadow-md md:w-60 hover:shadow-lg h-max maxMd:mx-1'>
      <ZRUBox className='relative w-full'>
        {imgUrl !== undefined && imgUrl?.trim()?.length > 0 ? (
          <img
            className='w-full h-40 md:h-w-48'
            src={imgUrl}
            alt='Product Image'
          />
        ) : null}

        {/* Discount coupon */}
        {showDiscountCoupon ? (
          <ZRUBadge
            className='absolute top-0 left-0 m-2 text-sm font-medium'
            color={ZRUColorE.crimson}
            variant={ZRUBadgeVariantE.solid}
          >
            {discountCouponText}
          </ZRUBadge>
        ) : null}

        {/* Secondary coupon */}
        {showSecondaryCoupon ? (
          <ZRUBadge
            className='absolute left-0 m-2 text-xs font-medium top-8'
            color={ZRUColorE.cyan}
            variant={ZRUBadgeVariantE.solid}
          >
            {secondaryCouponText}
          </ZRUBadge>
        ) : null}

        {/* Secondary coupon */}
        {showSecondaryCoupon ? (
          <ZRUBadge
            className='absolute top-0 right-0 m-2 text-xs font-medium cursor-pointer'
            color={ZRUColorE.pink}
            variant={ZRUBadgeVariantE.outline}
          >
            {isFavorite ? (
              <ZSolidHeartIcon className='w-6 h-6 p-[3px]' />
            ) : (
              <ZHeartIcon className='w-6 h-6 p-[3px]' />
            )}
          </ZRUBadge>
        ) : null}
      </ZRUBox>

      <ZRUBox className='p-4'>
        <ZRUText
          as={ZRUTextAsE.span}
          className='text-[10px] leading-none uppercase line-clamp-3 cursor-pointer hover:text-primary inline-block transition-all'
          onClick={categoryOnClick}
        >
          {category}
        </ZRUText>

        <ZRUHeading
          as={ZRUHeadingAsE.h3}
          className='mb-1 text-lg font-medium normal-case line-clamp-1'
        >
          {title}
        </ZRUHeading>

        <ZRUText
          as={ZRUTextAsE.p}
          className='mb-2 text-sm text-gray-600 normal-case line-clamp-3'
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae
          ante vel eros fermentum faucibus sit amet euismod lorem.
        </ZRUText>
        <ZRUBox>
          <ZRUText as={ZRUTextAsE.p} className='mb-1 text-lg font-bold'>
            {price}
          </ZRUText>
          {showBtn ? (
            <ZRUButton
              className='w-full px-4 py-2 font-bold text-white normal-case'
              onClick={btnOnClick}
            >
              {btnText}
            </ZRUButton>
          ) : null}
        </ZRUBox>
      </ZRUBox>
    </ZRUBox>
  );
};

export default ZProductCard;
