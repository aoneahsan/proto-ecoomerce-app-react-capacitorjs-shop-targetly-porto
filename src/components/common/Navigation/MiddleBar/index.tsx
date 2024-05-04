// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import ZShoppingCard from '@/components/Elements/Cards/ShoppingCard';
import {
  ZRUBox,
  ZRUButton,
  ZRUDropdownMenu,
  ZRUHeading,
  ZRUInput,
  ZRUInputSlot,
  ZRUSelect,
  ZRUText
} from '@/components/RadixUI';
import { useZMediaQueryScale } from '@/hook/helpers.hook';
import { useZSideBar } from '@/hook/globalComponents.hook';

// #endregion

// #region ---- Types Imports ----
import {
  ZRUBasicVariantE,
  ZRUColorE,
  ZRUHeadingAsE,
  ZRURadiusE,
  ZRUSelectContentPositionE,
  ZRUSideE,
  ZRUTextAsE
} from '@/types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  CloseSvg,
  UserSvg,
  ZCartBagSvg,
  ZHeartIcon,
  ZMenuIcon,
  ZPhoneSvg,
  productLogo,
  SearchSvg
} from '@/assets';

// #endregion

interface ZPublicNavMiddleBarI {
  showMenuBtn?: boolean;
  menuBtnOnClickHandler?: () => void;
}

const ZSearch: React.FC = () => {
  // #region Custom Hooks
  const { is900pxScale, isBelow900pxScale } = useZMediaQueryScale();
  // #endregion

  return (
    <>
      {is900pxScale ? (
        <ZRUInput
          className='flex-1'
          placeholder='Search...'
          size='3'
          radius={ZRURadiusE.full}
        >
          <ZRUInputSlot
            side={ZRUSideE.right}
            className='border-gray-100 border-s'
          >
            <ZRUSelect
              options={[{ label: 'All Categories', value: 'All Categories' }]}
              content={{
                position: ZRUSelectContentPositionE.popper
              }}
              trigger={{
                placeholder: 'All Categories',
                variant: ZRUBasicVariantE.ghost,
                className: 'font-medium text-sm text-medium'
              }}
            />
          </ZRUInputSlot>
          <ZRUInputSlot
            side={ZRUSideE.right}
            className='border-gray-100 cursor-pointer border-s'
          >
            <SearchSvg className='w-8 h-8 px-1 text-medium' />
          </ZRUInputSlot>
        </ZRUInput>
      ) : isBelow900pxScale ? (
        <div className='me-2 ms-auto'>
          <ZRUDropdownMenu
            trigger={{
              children: <SearchSvg className='w-7 h-7 text-dark' />
            }}
          >
            <ZRUInput
              className='flex-1'
              placeholder='Search...'
              size='3'
              radius={ZRURadiusE.full}
            >
              <ZRUInputSlot
                side={ZRUSideE.right}
                className='border-gray-100 border-s'
              >
                <ZRUSelect
                  options={[
                    { label: 'All Categories', value: 'All Categories' }
                  ]}
                  content={{
                    position: ZRUSelectContentPositionE.popper
                  }}
                  trigger={{
                    placeholder: 'All Categories',
                    variant: ZRUBasicVariantE.ghost,
                    className: 'font-medium text-sm text-medium'
                  }}
                />
              </ZRUInputSlot>
              <ZRUInputSlot
                side={ZRUSideE.right}
                className='border-gray-100 cursor-pointer border-s'
              >
                <SearchSvg className='w-8 h-8 px-1 text-medium' />
              </ZRUInputSlot>
            </ZRUInput>
          </ZRUDropdownMenu>
        </div>
      ) : null}
    </>
  );
};

const ZShoppingCartMenu: React.FC<{
  closeSidebar: () => void;
}> = ({ closeSidebar }) => {
  return (
    <ZRUBox>
      <ZRUBox className='flex items-center justify-between'>
        <ZRUHeading className='text-xl'>Shopping Cart</ZRUHeading>
        <CloseSvg
          className='cursor-pointer'
          onClick={() => {
            closeSidebar();
          }}
        />
      </ZRUBox>

      <ZRUBox className='mt-4'>
        <ZShoppingCard />
      </ZRUBox>

      <ZRUBox className='w-full pt-2 mb-8 border-t border-gray-100 bg-gray-50 max-lg:max-w-xl max-lg:mx-auto'>
        <ZRUBox className='flex items-center justify-between w-full mb-1'>
          <ZRUText
            as={ZRUTextAsE.p}
            className='text-base font-normal leading-8 text-lightDark'
          >
            Sub Total
          </ZRUText>
          <ZRUHeading
            as={ZRUHeadingAsE.h6}
            className='text-base font-semibold leading-8 text-tertiary'
          >
            $360.00
          </ZRUHeading>
        </ZRUBox>

        <ZRUBox className='flex items-center justify-between w-full pb-2 border-b border-gray-100'>
          <ZRUText
            as={ZRUTextAsE.p}
            className='text-base font-normal leading-8 text-lightDark'
          >
            Delivery Charge
          </ZRUText>
          <ZRUHeading
            as={ZRUHeadingAsE.h6}
            className='text-base font-semibold leading-8 text-tertiary'
          >
            $45.00
          </ZRUHeading>
        </ZRUBox>

        <ZRUBox className='flex items-center justify-between w-full py-2 border-b border-gray-100'>
          <ZRUText
            as={ZRUTextAsE.p}
            className='text-base font-medium leading-9 text-lightDark font-manrope'
          >
            Total
          </ZRUText>
          <ZRUHeading
            as={ZRUHeadingAsE.h6}
            className='text-base font-medium leading-9 text-primary font-manrope'
          >
            $405.00
          </ZRUHeading>
        </ZRUBox>

        <ZRUBox className='mt-4'>
          <ZRUButton
            className='w-full uppercase'
            color={ZRUColorE.blue}
            size='3'
          >
            View cart
          </ZRUButton>
          <ZRUButton
            className='w-full mt-2 uppercase'
            size='3'
            color={ZRUColorE.cyan}
          >
            Checkout
          </ZRUButton>
        </ZRUBox>
      </ZRUBox>
    </ZRUBox>
  );
};

const ZPublicNavMiddleBar: React.FC<ZPublicNavMiddleBarI> = ({
  showMenuBtn = false,
  menuBtnOnClickHandler
}) => {
  // #region Custom Hooks
  const { isMdScale, isLgScale } = useZMediaQueryScale();

  const { openSidebar: openShoppingCartSidebar } = useZSideBar({
    component: ZShoppingCartMenu,
    width: '24.75rem'
  });
  //  #endregion
  return (
    <ZRUBox className='w-full py-3 pt-5 text-dark'>
      <ZRUBox className='flex items-center mx-auto xl:container maxXl:px-3'>
        <ZRUBox className='flex items-center md:w-1/6 ps-0'>
          <img
            src={productLogo}
            width='111'
            height='44'
            alt='product Logo'
            className='cursor-pointer logo'
          />
        </ZRUBox>

        <ZRUBox className='flex items-center pl-2 md:flex-1 ms-auto md:pe-3 text-dark'>
          {/* Search */}
          {isMdScale ? <ZSearch /> : null}

          {/* Call us now */}
          {isLgScale ? (
            <ZRUBox className='flex items-center gap-2 uppercase ms-7 me-5 xl:pe-5 xl:me-3'>
              <ZPhoneSvg className='w-10 h-10' />
              <ZRUText className='pt-1 text-xs font-medium leading-none'>
                Call us now
                <ZRUText className='block text-lg tracking-wide text-dark ls-10'>
                  +123 5678 890
                </ZRUText>
              </ZRUText>
            </ZRUBox>
          ) : null}

          {/* User */}
          <ZRUBox className='mx-2 min900px:mx-4'>
            <UserSvg className='cursor-pointer min900px:w-8 min900px:h-8 max900px:w-7 max900px:h-7' />
          </ZRUBox>

          {/* Favorite */}
          <ZRUBox className='mx-2 min900px:mx-4'>
            <ZHeartIcon className='cursor-pointer min900px:w-8 min900px:h-8 max900px:w-7 max900px:h-7' />
          </ZRUBox>

          {/* Cart */}
          <ZRUBox className='ms-2 min900px:ms-4'>
            <ZCartBagSvg
              className='cursor-pointer min900px:w-8 min900px:h-8 max900px:w-7 max900px:h-7'
              onClick={() => {
                openShoppingCartSidebar();
              }}
            />
          </ZRUBox>

          {/* <ZRUBox className='ms-2'>
        <ZChevronLeftSvg
          className='w-5 h-5 cursor-pointer text-dark'
          onClick={() => {
            openShoppingCartSidebar();
          }}
        />
      </ZRUBox> */}

          {/* Button to open aside menu */}
          {!isLgScale && showMenuBtn ? (
            <ZMenuIcon
              className='w-6 h-6 cursor-pointer ms-4'
              onClick={menuBtnOnClickHandler}
            />
          ) : null}
        </ZRUBox>
      </ZRUBox>
    </ZRUBox>
  );
};

export default ZPublicNavMiddleBar;
