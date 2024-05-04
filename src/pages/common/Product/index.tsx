// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBadge,
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUText
} from '@/components/RadixUI';
import { ZCarousel, ZPage } from '@/components/Elements';
import ZPagesMenu from '@/components/common124/PagesMenu';
import ZPublicNavigation from '@/components/common124/Navigation';
import ZQuantitySelector from '@/components/Elements/QuantitySelector';
import ZProductCarouselBox from '@/components/common124/home/ProductCarouselBox';
import ZHorizontalProductCard from '@/components/Elements/Cards/HorizontalProductCard';
import ZPublicFooter from '@/components/common124/Footer';
import constants from '@/utils/constants';

// #endregion

// #region ---- Types Imports ----
import {
  ZRUBadgeVariantE,
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUTextAsE,
  ZRUVariantE
} from '@/types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ZFacebookSvg,
  ZInstagramSvg,
  ZLinkedinIcon,
  ZGooglePlusIcon,
  ZStarFillIcon,
  ZStarOutlineIcon,
  ZTwitterSvg,
  ZMailIcon,
  ZHeartIcon
} from '@/assets';

// #endregion

const ProductPage: React.FC = () => {
  // #region constants
  const pageHelmet = useMemo(
    () => ({
      title: `${constants.productInfo.name} - Product Page - Zaions`
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
      <ZRUBox className='mx-auto mb-4 xl:container maxXl:px-3'>
        <ZRUBox className='flex flex-col gap-5 mt-4 lg:flex-row'>
          {/* Images */}
          <ZRUBox className='relative h-72 sm:h-96 lg:h-auto text-sm sidebar-home lg:w-[29rem] xl:w-4/12'>
            <ZRUBadge
              className='absolute top-0 left-0 z-20 m-2 text-xs font-medium uppercase'
              color={ZRUColorE.cyan}
              variant={ZRUBadgeVariantE.solid}
            >
              hot
            </ZRUBadge>

            <ZRUBadge
              className='absolute left-0 z-20 m-2 text-sm font-medium top-8'
              color={ZRUColorE.crimson}
              variant={ZRUBadgeVariantE.solid}
            >
              0%
            </ZRUBadge>

            <ZCarousel
              className='relative z-10 h-full'
              itemClass='h-full'
              sliderClass='h-full'
              arrows={true}
              showDots={false}
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
              <img
                src={
                  'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
                }
                alt='Product Image'
                className='w-full h-full'
              />
            </ZCarousel>
          </ZRUBox>

          {/* Content */}
          <ZRUBox>
            <ZRUHeading
              as={ZRUHeadingAsE.h3}
              className='line-clamp-1 maxSm:text-xl'
            >
              Product Title
            </ZRUHeading>

            {/* Review */}
            <ZRUBox className='flex items-center gap-2 mt-1'>
              <ZRUBox className='flex items-center gap-px'>
                <ZStarFillIcon />
                <ZStarOutlineIcon />
              </ZRUBox>
              <ZRUText className='text-sm text-medium'>
                4.5 (25 Reviews)
              </ZRUText>
            </ZRUBox>

            {/* Price */}
            <ZRUBox className='mt-5'>
              {/* Old Price */}
              <ZRUText className='text-xl font-medium line-through sm:text-2xl text-medium-100 me-4'>
                $1,999.00
              </ZRUText>

              {/* New Price */}
              <ZRUText className='text-xl font-medium sm:text-2xl text-lightDark'>
                $1,699.00
              </ZRUText>
            </ZRUBox>

            {/* Description */}
            <ZRUBox className='mt-5'>
              <ZRUText as={ZRUTextAsE.p} className='maxSm:text-sm'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repudiandae voluptatum doloremque earum, nesciunt ea, labore
                accusantium vel repellat eligendi soluta velit ratione ducimus
                laborum, incidunt voluptas. Ab porro exercitationem maxime?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                nemo cum non cupiditate aliquam aspernatur itaque perferendis
                consequuntur, temporibus magni neque minus illum unde culpa
                adipisci laudantium officiis atque reprehenderit.
              </ZRUText>
            </ZRUBox>

            {/* Info list */}
            <ul className='mt-5 text-sm *:mb-1'>
              {[...Array(3)].map((el) => {
                return (
                  <li key={el}>
                    <ZRUText className='text-medium'>Category:</ZRUText>
                    <ZRUText className='font-medium ms-1 text-dark'>
                      Category Name
                    </ZRUText>
                  </li>
                );
              })}
            </ul>

            {/* Add to cart */}
            <ZRUBox className='flex flex-col gap-3 pt-2 mt-3 border-t border-gray-100 sm:items-center sm:flex-row'>
              <ZQuantitySelector className='maxSm:*:flex-1 maxSm:*:text-center' />

              <ZRUButton className='uppercase' size='3'>
                Add to Cart
              </ZRUButton>
            </ZRUBox>

            {/* Share */}
            <ZRUBox className='flex items-center pt-3 mt-4 *:w-10 *:h-10 *:rounded-full *:cursor-pointer *:flex *:items-center *:justify-center *:transition-all gap-2 *:border *:border-gray-100  maxSm:flex-wrap border-t border-gray-100'>
              <ZRUBox className='transition-all hover:bg-facebook text-dark hover:text-gray-100'>
                <ZFacebookSvg className='w-[50%] h-[50%] ' />
              </ZRUBox>

              <ZRUBox className='transition-all hover:bg-twitter text-dark hover:text-gray-100'>
                <ZTwitterSvg className='w-[50%] h-[50%]' />
              </ZRUBox>

              <ZRUBox className='transition-all hover:bg-linkedin text-dark hover:text-gray-100'>
                <ZLinkedinIcon className='w-[50%] h-[50%]' />
              </ZRUBox>

              <ZRUBox className='transition-all hover:bg-googlePlus text-dark hover:text-gray-100'>
                <ZGooglePlusIcon className='w-[50%] h-[50%]' />
              </ZRUBox>

              <ZRUBox className='transition-all hover:bg-instagram text-dark hover:text-gray-100'>
                <ZInstagramSvg className='w-[50%] h-[50%]' />
              </ZRUBox>

              <ZRUBox className='transition-all hover:bg-googlePlus text-dark hover:text-gray-100'>
                <ZMailIcon className='w-[50%] h-[50%]' />
              </ZRUBox>

              <ZRUBox className='!w-max !border-none'>
                <ZRUButton
                  className='font-medium uppercase ms-2 text-dark hover:text-primary'
                  variant={ZRUVariantE.ghost}
                >
                  <ZHeartIcon className='me-2' />
                  Add to wishlist
                </ZRUButton>
              </ZRUBox>
            </ZRUBox>
          </ZRUBox>
        </ZRUBox>

        {/* Product detail description */}
        <ZRUBox className='mt-10'>
          <ZRUHeading
            as={ZRUHeadingAsE.h4}
            className='mb-3 text-xl text-lightDark'
          >
            Description
          </ZRUHeading>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. A animi
          aliquid beatae qui quo ipsum. Maxime, repellendus harum, maiores
          corrupti magnam rem molestias quidem incidunt qui sequi, dolorem quis
          fugiat. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
          quas cumque, doloribus unde dicta animi! Ea quia, voluptates porro
          possimus harum ex exercitationem, placeat dicta iusto maiores
          repudiandae, perspiciatis voluptate. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Tempora eius incidunt soluta in sit
          dolorem molestiae atque nesciunt praesentium asperiores quaerat odio
          fugit harum dolorum, officiis impedit vero sint fuga?
        </ZRUBox>

        {/* Related Products */}
        <ZRUBox className='mt-10'>
          <ZRUHeading
            as={ZRUHeadingAsE.h5}
            className='block pb-2 mb-5 text-xl border-b border-gray-100 text-lightDark'
          >
            Related Products
          </ZRUHeading>

          <ZProductCarouselBox />
        </ZRUBox>

        {/* Related Products */}
        <ZRUBox className='flex items-start maxMd:*:text-center justify-between pt-5 mt-5 border-t border-gray-100 *:flex-1 maxLg:flex-wrap'>
          {/* Featured Products */}
          <ZRUBox>
            <ZRUHeading
              as={ZRUHeadingAsE.h5}
              className='block pb-2 text-base uppercase text-lightDark'
            >
              Featured Products
            </ZRUHeading>

            <ZRUBox className='maxMd:*:mx-auto'>
              <ZHorizontalProductCard />
            </ZRUBox>
          </ZRUBox>

          {/* Best Selling Products */}
          <ZRUBox>
            <ZRUHeading
              as={ZRUHeadingAsE.h5}
              className='block pb-2 text-base uppercase md:pb-3 text-lightDark maxMd:mt-4'
            >
              Best Selling Products
            </ZRUHeading>

            <ZRUBox className='maxMd:*:mx-auto'>
              <ZHorizontalProductCard />
            </ZRUBox>
          </ZRUBox>

          {/* Latest Products */}
          <ZRUBox>
            <ZRUHeading
              as={ZRUHeadingAsE.h5}
              className='block pb-2 text-base uppercase md:pb-3 text-lightDark maxMd:mt-4'
            >
              Latest Products
            </ZRUHeading>

            <ZRUBox className='maxMd:*:mx-auto'>
              <ZHorizontalProductCard />
            </ZRUBox>
          </ZRUBox>

          {/* Top Rated Products */}
          <ZRUBox>
            <ZRUHeading
              as={ZRUHeadingAsE.h5}
              className='block pb-2 text-base uppercase md:pb-3 text-lightDark maxMd:mt-4'
            >
              Top Rated Products
            </ZRUHeading>

            <ZRUBox className='maxMd:*:mx-auto'>
              <ZHorizontalProductCard />
            </ZRUBox>
          </ZRUBox>
        </ZRUBox>
      </ZRUBox>

      <ZPublicFooter />
    </ZPage>
  );
};

export default ProductPage;
