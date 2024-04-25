// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZPage } from '@/Components/Elements';
import ZPublicNavigation from '@/Components/Public/Navigation';
import { ZRUBox, ZRUHeading, ZRUText } from '@/Components/RadixUI';
import { ZRUHeadingAsE, ZRUTextAsE } from '@/Types/radixUI/index.type';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const Home: React.FC = () => {
  return (
    <ZPage>
      <ZPublicNavigation />

      <main className='main home'>
        <div className='container mx-auto mb-2'>
          {/*  */}
          <div className='flex mb-2 border border-gray-100 *:flex *:items-center *:justify-center *:flex-1 *:m-[.8rem_0_.6rem] *:p-[.6rem] *:border-e *:border-gray-100'>
            <div>
              <i className='icon-shipping' />

              <div>
                <h4 className='text-sm font-bold uppercase'>
                  FREE SHIPPING &amp; RETURN
                </h4>
                <p className='font-light text-sm tracking-[0.01em] text-body'>
                  Free shipping on all orders over $99
                </p>
              </div>
            </div>

            <div>
              <i className='icon-money'></i>

              <div>
                <h4 className='text-sm font-bold uppercase'>
                  MONEY BACK GUARANTEE
                </h4>
                <p className='text-sm font-light tracking-[0.01em] text-body'>
                  100% money back guarantee
                </p>
              </div>
            </div>

            <div>
              <i className='icon-support'></i>

              <div>
                <h4 className='text-sm font-bold uppercase'>
                  ONLINE SUPPORT 24/7
                </h4>
                <p className='text-sm font-light tracking-[0.01em] text-body'>
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              {/* End .info-box-content */}
            </div>
            {/* End .info-box */}
          </div>

          {/*  */}
          <div className='flex mt-4'>
            <div className='lg:w-3/4'>
              {/* aside */}
              <aside className='text-sm sidebar-home lg:w-3/12'>
                {/* Browse Categories */}
                <ZRUBox className='mb-2 uppercase border border-gray-100'>
                  <ZRUHeading
                    as={ZRUHeadingAsE.h2}
                    className='cursor-pointer text-[.8rem] bg-gray ls-n-25 p-[.5rem_1.5rem_.5rem] font-bold border-b border-gray-200'
                  >
                    Browse Categories
                  </ZRUHeading>

                  <ul className='*:px-[1.4rem] *:font-medium *:text-sm *:text-medium *:cursor-pointer hover:*:bg-primary hover:*:text-gray-100'>
                    <li className='group/item'>
                      <ZRUText
                        as={ZRUTextAsE.p}
                        className='text-inherit py-[.6rem] border-b border-b-gray-100 group-hover/item:border-b-transparent transition-all'
                      >
                        Home
                      </ZRUText>
                    </li>

                    <li className='group/item'>
                      <ZRUText
                        as={ZRUTextAsE.p}
                        className='text-inherit py-[.6rem] transition-all'
                      >
                        Home
                      </ZRUText>
                    </li>
                  </ul>
                </ZRUBox>

                {/* Sale */}
                <ZRUBox className='mb-2 uppercase border border-gray-100'></ZRUBox>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </ZPage>
  );
};

export default Home;
