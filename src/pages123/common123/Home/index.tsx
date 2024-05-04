// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZPage } from '@/components123/Elements';
import { ZRUBox, ZRUText } from '@/components123/RadixUI';
import ZPublicNavigation from '@/components123/common124/Navigation';
import ZBrowseCategoriesBox from '@/components123/common124/home123/BrowseCategoriesBox';
import ZSaleCarouselBox from '@/components123/common124/home123/SaleCarouselBox';
import ZTestimonialCarouselBox from '@/components123/common124/home123/TestimonialCarouselBox';
import ZInformationBox from '@/components123/common124/home123/InfoBox';
import ZProductCarouselBox from '@/components123/common124/home123/ProductCarouselBox';
import ZBrandsCarouselBox from '@/components123/common124/home123/BrandsCarouselBox';
import ProductsWidgetsBox from '@/components123/common124/home123/ProductsWidgetsBox';
import ZFeaturesBox from '@/components123/common124/home123/FeaturesBox';
import ZPublicFooter from '@/components123/common124/Footer';
import { useZMediaQueryScale } from '@/hook123/helpers123.hook';
import { useZSideBar } from '@/hook123/globalComponents123.hook';

// #endregion

// #region ---- Types Imports ----
import { ZRUTextAsE } from '@/types123/radixUI/index.type';

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
