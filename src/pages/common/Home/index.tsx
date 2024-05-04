// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZPage } from '@/components/Elements';
import { ZRUBox, ZRUText } from '@/components/RadixUI';
import ZPublicNavigation from '@/components/common/Navigation';
import ZBrowseCategoriesBox from '@/components/common/home/BrowseCategoriesBox';
import ZSaleCarouselBox from '@/components/common/home/SaleCarouselBox';
import ZTestimonialCarouselBox from '@/components/common/home/TestimonialCarouselBox';
import ZInformationBox from '@/components/common/home/InfoBox';
import ZProductCarouselBox from '@/components/common/home/ProductCarouselBox';
import ZBrandsCarouselBox from '@/components/common/home/BrandsCarouselBox';
import ProductsWidgetsBox from '@/components/common/home/ProductsWidgetsBox';
import ZFeaturesBox from '@/components/common/home/FeaturesBox';
import ZPublicFooter from '@/components/common/Footer';
import { useZMediaQueryScale } from '@/hooks/helpers.hook';
import { useZSideBar } from '@/hooks/globalComponents.hook';

// #endregion

// #region ---- Types Imports ----
import { ZRUTextAsE } from '@/types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----
import { CloseSvg } from '@/assets';

// #endregion

const ZAsideMenu: React.FC<{
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

      <ZRUBox className='min380px:w-[22rem] w-[15rem] mt-4 overflow-hidden'>
        {/* Browse Categories */}
        <ZBrowseCategoriesBox />

        {/* Sale Carousel */}
        <ZSaleCarouselBox />

        {/* Testimonial Carousel */}
        <ZTestimonialCarouselBox />
      </ZRUBox>
    </ZRUBox>
  );
};

const Home: React.FC = () => {
  // #region Custom Hooks
  const { isLgScale } = useZMediaQueryScale();

  const { openSidebar: openAsideMenuSidebar } = useZSideBar({
    component: ZAsideMenu,
    width: '24.75rem'
  });
  // #endregion

  return (
    <ZPage>
      {/* Navigation */}
      <ZPublicNavigation
        menuBtnOnClickHandler={() => {
          openAsideMenuSidebar();
        }}
      />

      <main className='main home'>
        <ZRUBox className='mx-auto mb-2 xl:container maxXl:px-3'>
          {/* Information */}
          <ZInformationBox />

          {/* Content */}
          <ZRUBox className='flex gap-5 mt-4'>
            {/* Aside */}
            {isLgScale ? (
              <aside className='text-sm sidebar-home lg:w-3/12'>
                {/* Browse Categories */}
                <ZBrowseCategoriesBox />

                {/* Sale Carousel */}
                <ZSaleCarouselBox />

                {/* Testimonial Carousel */}
                <ZTestimonialCarouselBox />
              </aside>
            ) : null}

            {/* RHS */}
            <div className='lg:w-[calc(100%-25%-1.25rem)] w-full'>
              <ZRUText
                as={ZRUTextAsE.div}
                className='py-1 mb-4 text-base font-bold uppercase border-b border-gray-100 maxSm:text-center'
              >
                Featured Products
              </ZRUText>
              <ZProductCarouselBox />

              {/* Brands */}
              <ZBrandsCarouselBox />

              {/* Products Widgets */}
              <ProductsWidgetsBox />

              {/* Features */}
              <ZFeaturesBox />
            </div>
          </ZRUBox>
        </ZRUBox>
      </main>

      <ZPublicFooter />
    </ZPage>
  );
};
// <ZHorizontalProductCard />

export default Home;
