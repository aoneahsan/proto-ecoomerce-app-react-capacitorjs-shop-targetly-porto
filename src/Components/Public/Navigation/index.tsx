// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import constants from '@/utils/Constants';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ChevronDown,
  productLogo,
  SearchSvg,
  UserSvg,
  ZCartBagSvg,
  ZChevronLeftSvg,
  ZFacebookSvg,
  ZHeartSvg,
  ZInstagramSvg,
  ZPhoneSvg,
  ZTwitterSvg
} from '@/assets';
import { ZCurrenciesData } from '@/Data/Currencies.data';
import ZLanguagesData from '@/Data/Languages.data';

// #endregion

const ZCurrenciesDropDown: React.FC = () => {
  return (
    <div className='pl-1 ml-3 header-dropdown'>
      <span className='flex items-center gap-1'>
        USD <ChevronDown className='w-4 h-4' />
      </span>
      <div className='header-menu'>
        <ul className='!ps-3 !pe-6'>
          {ZCurrenciesData?.map((el, index) => (
            <li key={index}>
              <span className='text-[#777] mb-1 block cursor-pointer'>
                {el?.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ZLanguagesDropDown: React.FC = () => {
  return (
    <div className='mr-auto header-dropdown mr-sm-3 mr-md-0'>
      <span className='flex items-center gap-1'>
        ENG <ChevronDown className='w-4 h-4' />
      </span>
      <div className='header-menu'>
        <ul className='!ps-3 !pe-6'>
          {ZLanguagesData?.map((el, index) => (
            <li key={index}>
              <span className='text-[#777] mb-1 block cursor-pointer'>
                {el?.shortForm}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/**
 * Represents a navigation used in public page like home etc..
 */
const ZPublicNavigation: React.FC = () => {
  return (
    <header className='header home'>
      {/* Top bar */}
      <div className='header-top bg-primary text-uppercase'>
        <div className='container mx-auto'>
          {/* Countries & Languages dropdowns */}
          <div className='header-left'>
            <ZLanguagesDropDown />

            <ZCurrenciesDropDown />
          </div>

          <div className='ml-0 header-right header-dropdowns ml-sm-auto'>
            <p className='mb-0 uppercase top-message d-none d-sm-block'>
              Welcome To {constants?.productInfo?.name}!
            </p>

            {/* Menu */}
            <div className='mr-3 header-dropdown dropdown-expanded'>
              <a href='#'>Links</a>
              <div className='header-menu'>
                <ul>
                  <li>
                    <span className='font-bold uppercase cursor-pointer'>
                      My Account
                    </span>
                  </li>
                  <li>
                    <span className='font-bold uppercase cursor-pointer'>
                      Contact Us
                    </span>
                  </li>
                  <li>
                    <span className='font-bold uppercase cursor-pointer'>
                      My Wishlist
                    </span>
                  </li>
                  <li>
                    <span className='font-bold uppercase cursor-pointer'>
                      Site Map
                    </span>
                  </li>
                  <li>
                    <span className='font-bold uppercase cursor-pointer'>
                      Cart
                    </span>
                  </li>
                  <li>
                    <span className='font-bold uppercase cursor-pointer'>
                      Log In
                    </span>
                  </li>
                </ul>
              </div>
              {/* End .header-menu */}
            </div>

            <span className='separator'></span>

            {/* Social icons */}
            <div className='social-icons'>
              <div className='inline ml-0 cursor-pointer social-icon social-facebook'>
                <ZFacebookSvg className='w-5 h-5' />
              </div>
              <div className='inline ml-0 cursor-pointer social-icon social-twitter'>
                <ZTwitterSvg className='w-5 h-5' />
              </div>
              <div className='inline ml-0 cursor-pointer social-icon social-instagram'>
                <ZInstagramSvg className='w-5 h-5' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle bar */}
      <div className='header-middle text-dark sticky-header'>
        <div className='container mx-auto'>
          <div className='w-1/6 pl-0 header-left'>
            <button className='mr-2 mobile-menu-toggler' type='button'>
              <i className='fas fa-bars'></i>
            </button>
            <img
              src={productLogo}
              width='111'
              height='44'
              alt='Porto Logo'
              className='cursor-pointer logo'
            />
          </div>
          {/* End .header-left */}

          <div className='flex-1 pl-2 header-right'>
            <div className='flex-1 header-search header-icon header-search-inline header-search-category'>
              <a href='#' className='search-toggle' role='button'>
                <i className='icon-search-3'></i>
              </a>
              <form action='#' method='get'>
                <div className='header-search-wrapper'>
                  <input
                    type='search'
                    className='flex-1 form-control'
                    name='q'
                    id='q'
                    placeholder='Search...'
                    required
                  />
                  <div className='select-custom'>
                    <select id='cat' name='cat'>
                      <option value=''>All Categories</option>
                      <option value='4'>Fashion</option>
                      <option value='12'>- Women</option>
                      <option value='13'>- Men</option>
                      <option value='66'>- Jewellery</option>
                      <option value='67'>- Kids Fashion</option>
                      <option value='5'>Electronics</option>
                      <option value='21'>- Smart TVs</option>
                      <option value='22'>- Cameras</option>
                      <option value='63'>- Games</option>
                      <option value='7'>Home &amp; Garden</option>
                      <option value='11'>Motors</option>
                      <option value='31'>- Cars and Trucks</option>
                      <option value='32'>
                        - Motorcycles &amp; Powersports
                      </option>
                      <option value='33'>- Parts &amp; Accessories</option>
                      <option value='34'>- Boats</option>
                      <option value='57'>- Auto Tools &amp; Supplies</option>
                    </select>
                  </div>
                  {/* End .select-custom */}
                  <button
                    className='flex items-center justify-center btn'
                    type='submit'
                  >
                    <SearchSvg className='w-8 h-8' />
                  </button>
                </div>
                {/* End .header-search-wrapper */}
              </form>
            </div>
            {/* End .header-search */}

            <div className='hidden gap-3 ms-5 me-5 header-contact lg:flex align-items-center xl:pe-5 xl:me-3'>
              <ZPhoneSvg className='w-16 h-16' />
              <h6 className='pt-1 line-height-1'>
                Call us now
                <a href='tel:#' className='pt-1 d-block text-dark ls-10'>
                  +123 5678 890
                </a>
              </h6>
            </div>
            {/* End .header-contact */}

            <div className='mx-4'>
              <UserSvg className='w-14 h-14' />
            </div>

            <div className='mx-4'>
              <ZHeartSvg className='w-14 h-14' />
            </div>

            <div className='ms-4 me-2'>
              <ZCartBagSvg className='w-12 h-12' />
            </div>
            <div className=''>
              <ZChevronLeftSvg className='w-8 h-8 text-dark' />
            </div>
          </div>
          {/* End .header-right */}
        </div>
        {/* End .container */}
      </div>
    </header>
  );
};

export default ZPublicNavigation;
