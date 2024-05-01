// #region ---- Core Imports ----
import React, { useCallback } from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBox,
  ZRUButton,
  ZRUDropdownMenu,
  ZRUText
} from '@/Components/RadixUI';
import { AppRoutes } from '@/Routes/AppRoutes';
import { useMatchRoute } from '@tanstack/react-router';
import { ZClassNames } from '@/Packages/ClassNames';
import { useZNavigate } from '@/ZHooks/Navigation.hook';
import { reportCustomError } from '@/utils/Helpers';
import { useZMediaQueryScale } from '@/ZHooks/Helpers.hook';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ZPagesLinks = () => {
  // #region Custom hooks
  const navigate = useZNavigate();
  // #endregion

  // #region Functions
  const categoriesOnClickHandler = useCallback(() => {
    try {
      void navigate({ to: AppRoutes.category });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const productsOnClickHandler = useCallback(() => {
    try {
      void navigate({ to: AppRoutes.product });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const homeOnClickHandler = useCallback(() => {
    try {
      void navigate({ to: AppRoutes.home });
    } catch (error) {
      reportCustomError(error);
    }
  }, []);
  // #endregion

  // #region Routes
  const isCategoryPage = useMatchRoute()({
    to: AppRoutes.category
  });

  const isProductPage = useMatchRoute()({
    to: AppRoutes.product
  });
  // #endregion

  return (
    <ul className='flex min900px:items-center min900px:gap-5 gap-3 max900px:flex-col *:text-xs *:mx-2 *:uppercase *:cursor-pointer min900px:hover:*:text-primary *:transition-all *:border-b *:border-transparent min900px:hover:*:border-primary *:font-semibold'>
      <li onClick={homeOnClickHandler}>Home</li>
      <li
        className={ZClassNames({
          'text-primary !border-primary': isCategoryPage
        })}
        onClick={categoriesOnClickHandler}
      >
        Categories
      </li>
      <li
        className={ZClassNames({
          'text-primary !border-primary': isProductPage
        })}
        onClick={productsOnClickHandler}
      >
        Products
      </li>
      <li>Pages</li>
      <li>Blog</li>
      <li>Elements</li>
      <li>Contact us</li>
    </ul>
  );
};

const ZPagesMenu: React.FC = () => {
  // #region Custom hooks
  const { is900pxScale } = useZMediaQueryScale();
  // #endregion

  return (
    <ZRUBox className='w-full py-2'>
      <ZRUBox className='flex items-center justify-between py-3 mx-auto border-t border-gray-100 xl:container maxXl:px-3'>
        <ZRUBox>
          {is900pxScale ? (
            <ZPagesLinks />
          ) : (
            <ZRUDropdownMenu
              className='flex items-center'
              trigger={{
                children: (
                  <ZRUText className='block px-2 py-1 text-xs font-medium uppercase border rounded-md cursor-pointer text-primary'>
                    Pages
                  </ZRUText>
                )
              }}
            >
              <ZPagesLinks />
            </ZRUDropdownMenu>
          )}
        </ZRUBox>

        <ZRUBox>
          <ul className='flex items-center gap-0 md:gap-5 *:text-xs maxMd:*:ms-3 md:*:mx-2 *:uppercase *:cursor-pointer hover:*:text-success *:transition-all *:border-b *:border-transparent hover:*:border-success *:font-semibold'>
            <li>Special Offer!</li>
            <li>Buy Porto!</li>
          </ul>
        </ZRUBox>
      </ZRUBox>
    </ZRUBox>
  );
};

export default ZPagesMenu;
