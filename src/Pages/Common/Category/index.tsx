// #region ---- Core Imports ----
import React, { useCallback, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUSelect,
  ZRUText
} from '@/Components/RadixUI';
import { ZPage } from '@/Components/Elements';
import ZPublicNavigation from '@/Components/Common/Navigation';
import ZProductCard from '@/Components/Elements/Cards/ProductCard';
import ZCategoriesFilters from '@/Components/Common/Category/Filter';
import ZPublicFooter from '@/Components/Common/Footer';
import ZPagesMenu from '@/Components/Common/PagesMenu';
import constants from '@/utils/constants12';
import { useZMediaQueryScale } from '@/ZHooks/Helpers.hook';
import { useZSideBar } from '@/ZHooks/ZGlobalComponents.hook';

// #endregion

// #region ---- Types Imports ----
import {
  ZRUHeadingAsE,
  ZRUSelectContentPositionE,
  ZRUTextAsE
} from '@/Types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { CloseSvg, ZFilterIcon } from '@/assets';

// #endregion

const ZFilterMenu: React.FC<{
  closeSidebar: () => void;
}> = ({ closeSidebar }) => {
  return (
    <ZRUBox>
      <ZRUBox className='flex items-center justify-end'>
        <CloseSvg
          className='cursor-pointer'
          onClick={() => {
            closeSidebar();
          }}
        />
      </ZRUBox>

      <ZRUBox>
        <ZCategoriesFilters />
      </ZRUBox>
    </ZRUBox>
  );
};

const CategoryPage: React.FC = () => {
  // #region Custom Hooks
  const { isLgScale } = useZMediaQueryScale();

  const { openSidebar: openFilterMenuSidebar } = useZSideBar({
    component: ZFilterMenu,
    width: '24.75rem'
  });
  // #endregion

  // #region Functions
  const ZFilterBtnHandler = useCallback(() => {
    openFilterMenuSidebar();
  }, []);
  // #endregion

  // #region constants
  const pageHelmet = useMemo(
    () => ({
      title: `${constants.productInfo.name} - Category Page - Zaions`
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
      <ZRUBox className='flex items-center justify-center gap-10 py-8 maxSm:flex-col bg-primary/50'>
        <ZRUBox className='maxSm:w-full maxSm:px-2'>
          <ZRUHeading
            as={ZRUHeadingAsE.h3}
            className='leading-tight uppercase lg:text-5xl md:text-4xl text-lightDark maxSm:text-center'
          >
            Electronic <br /> Deals
          </ZRUHeading>

          <ZRUButton className='mt-2 uppercase maxSm:w-full' size='3'>
            Get Yours!
          </ZRUButton>
        </ZRUBox>

        <ZRUBox>
          <ZRUBox className='p-2 font-medium uppercase sm:-rotate-6 bg-light maxSm:text-center'>
            Exclusive Coupon
          </ZRUBox>

          <ZRUBox className='flex items-center mt-4 sm:-rotate-6'>
            <ZRUText
              as={ZRUTextAsE.span}
              className='mt-1 text-xs uppercase -rotate-90 w-max'
            >
              Up to
            </ZRUText>
            <ZRUBox className='p-2 text-xl font-semibold uppercase bg-light'>
              $100
            </ZRUBox>
            <ZRUText
              as={ZRUTextAsE.span}
              className='mt-1 text-lg font-semibold uppercase w-max ms-2'
            >
              Off
            </ZRUText>
          </ZRUBox>
        </ZRUBox>
      </ZRUBox>

      <ZRUBox className='mx-auto mb-2 xl:container maxXl:px-3'>
        <ZRUBox className='flex gap-5 mt-4'>
          {isLgScale ? (
            <aside className='text-sm border border-gray-100 sidebar-home lg:w-3/12'>
              <ZCategoriesFilters />
            </aside>
          ) : null}

          {/* RHS */}
          <ZRUBox className='lg:w-[calc(100%-25%-1.25rem)] w-full'>
            <ZRUBox className='flex xs:items-center xs:justify-between maxXs:flex-col maxXs:gap-y-4 maxXs:items-center'>
              <ZRUBox className='flex items-center gap-3 xs:items-end maxXs:flex-col maxXs:w-full'>
                {!isLgScale ? (
                  <ZRUButton
                    className='maxXs:w-full'
                    onClick={ZFilterBtnHandler}
                  >
                    <ZFilterIcon /> Filter
                  </ZRUButton>
                ) : null}
                <ZRUSelect
                  label='Sort By:'
                  content={{
                    position: ZRUSelectContentPositionE.popper
                  }}
                  options={[
                    {
                      label: 'Default sorting',
                      value: 'Default sorting'
                    }
                  ]}
                />
              </ZRUBox>

              <ZRUBox>
                <ZRUSelect
                  label='Show:'
                  content={{
                    position: ZRUSelectContentPositionE.popper
                  }}
                  options={[
                    {
                      label: 'Default sorting',
                      value: 'Default sorting'
                    }
                  ]}
                />
              </ZRUBox>
            </ZRUBox>

            <ZRUBox className='py-5 border-b border-gray-100'>
              <ZProductCard />
            </ZRUBox>

            <ZRUBox className='flex items-center justify-between mt-3'>
              <ZRUSelect
                label='Sort By:'
                content={{
                  position: ZRUSelectContentPositionE.popper
                }}
                options={[
                  {
                    label: 'Default sorting',
                    value: 'Default sorting'
                  }
                ]}
              />

              <ZRUBox></ZRUBox>
            </ZRUBox>
          </ZRUBox>
        </ZRUBox>
      </ZRUBox>

      <ZPublicFooter />
    </ZPage>
  );
};

export default CategoryPage;
