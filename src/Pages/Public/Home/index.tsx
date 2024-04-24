// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZPage } from '@/Components/Elements';
import ZPublicNavigation from '@/Components/Public/Navigation';

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
          <div className='flex mb-2 info-boxes-container row row-joined font2'>
            <div className='info-box info-box-icon-left col-lg-4'>
              <i className='icon-shipping' />

              <div className='info-box-content'>
                <h4>FREE SHIPPING &amp; RETURN</h4>
                <p className='text-body'>
                  Free shipping on all orders over $99
                </p>
              </div>
              {/* End .info-box-content */}
            </div>
            {/* End .info-box */}

            <div className='info-box info-box-icon-left col-lg-4'>
              <i className='icon-money'></i>

              <div className='info-box-content'>
                <h4>MONEY BACK GUARANTEE</h4>
                <p className='text-body'>100% money back guarantee</p>
              </div>
              {/* End .info-box-content */}
            </div>
            {/* End .info-box */}

            <div className='info-box info-box-icon-left col-lg-4'>
              <i className='icon-support'></i>

              <div className='info-box-content'>
                <h4>ONLINE SUPPORT 24/7</h4>
                <p className='text-body'>Lorem ipsum dolor sit amet.</p>
              </div>
              {/* End .info-box-content */}
            </div>
            {/* End .info-box */}
          </div>

          <div className='row'>
            <div className='lg:w-3/4'>
              <aside className='sidebar-home lg:w-3/12 mobile-sidebar'>
                <div className='mb-2 uppercase side-menu-wrapper none lg:block'>
                  <h2 className='side-menu-title bg-gray ls-n-25'>
                    Browse Categories
                  </h2>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </ZPage>
  );
};

export default Home;
