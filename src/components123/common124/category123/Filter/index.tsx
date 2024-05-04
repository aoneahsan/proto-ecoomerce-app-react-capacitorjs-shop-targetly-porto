// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUAccordingGroup,
  ZRUAccordionContent,
  ZRUAccordionItem,
  ZRUAccordionTrigger,
  ZRUBox,
  ZRUButton,
  ZRUCheckboxCardsGroup,
  ZRUCheckboxCardsItem,
  ZRUText
} from '@/components123/RadixUI';
import ZRCSlider from '@/components123/Elements/RCSlider';
import ZHorizontalProductCard from '@/components123/Elements/Cards/HorizontalProductCard';

// #endregion

// #region ---- Types Imports ----
import { ZRUTextAsE } from '@/types123/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ZCategoriesFilters: React.FC = () => {
  return (
    <>
      {/* Categories */}
      <ZRUBox>
        <ZRUText
          as={ZRUTextAsE.span}
          className='block px-5 pt-3 pb-1 font-semibold uppercase text-ellipsis text-dark'
        >
          Categories
        </ZRUText>

        <ZRUAccordingGroup type='multiple'>
          {/* Accessories */}
          <ZRUAccordionItem value='Accessories'>
            <ZRUAccordionTrigger>Accessories (3)</ZRUAccordionTrigger>
            <ZRUAccordionContent>
              <ZRUBox className='p-2'>Caps (1)</ZRUBox>
              <ZRUBox className='p-2'>Watches (2)</ZRUBox>
            </ZRUAccordionContent>
          </ZRUAccordionItem>

          {/* Dress */}
          <ZRUAccordionItem value='Dress'>
            <ZRUAccordionTrigger>Dress (4)</ZRUAccordionTrigger>
            <ZRUAccordionContent>
              <ZRUBox className='p-2'>Clothing (4)</ZRUBox>
            </ZRUAccordionContent>
          </ZRUAccordionItem>

          {/* Electronics */}
          <ZRUAccordionItem value='Electronics'>
            <ZRUAccordionTrigger>Electronics (2)</ZRUAccordionTrigger>
            <ZRUAccordionContent>
              <ZRUBox className='p-2'>Headphone (1)</ZRUBox>
              <ZRUBox className='p-2'>Watch (1)</ZRUBox>
            </ZRUAccordionContent>
          </ZRUAccordionItem>

          {/* Fashion */}
          <ZRUAccordionItem value='Fashion'>
            <ZRUAccordionTrigger>Fashion (6)</ZRUAccordionTrigger>
            <ZRUAccordionContent>
              <ZRUBox className='p-2'>Shoes (4)</ZRUBox>
              <ZRUBox className='p-2'>Bag (2)</ZRUBox>
            </ZRUAccordionContent>
          </ZRUAccordionItem>
        </ZRUAccordingGroup>
      </ZRUBox>

      {/* Price */}
      <ZRUBox className='px-5 mt-2 border-t border-gray-100'>
        <ZRUText
          as={ZRUTextAsE.span}
          className='block pt-3 pb-1 font-semibold uppercase text-ellipsis text-dark'
        >
          Price
        </ZRUText>
        <ZRCSlider
          range
          min={0}
          max={20}
          defaultValue={[3, 10]}
          className='mt-1'
          // tipFormatter={(value) => `${value}!`}
        />

        <ZRUBox className='flex items-center justify-between mt-2'>
          <ZRUText className='text-xs'>Price: $0 - $1000</ZRUText>

          <ZRUButton className='uppercase'>Filter</ZRUButton>
        </ZRUBox>
      </ZRUBox>

      {/* Color */}
      <ZRUBox className='mt-2 border-t border-gray-100'>
        <ZRUText
          as={ZRUTextAsE.span}
          className='block px-5 pt-3 pb-1 font-semibold uppercase text-ellipsis text-dark'
        >
          Color
        </ZRUText>

        <ZRUCheckboxCardsGroup className='flex px-4 py-2'>
          <ZRUCheckboxCardsItem value='1' className='p-0 !border-transparent'>
            <ZRUBox
              width='2.9rem'
              height='2.6rem'
              className='rounded-md bg-primary'
            ></ZRUBox>
          </ZRUCheckboxCardsItem>

          <ZRUCheckboxCardsItem value='2' className='p-0 !border-transparent'>
            <ZRUBox
              width='2.9rem'
              height='2.6rem'
              className='rounded-md bg-primary'
            ></ZRUBox>
          </ZRUCheckboxCardsItem>

          <ZRUCheckboxCardsItem value='3' className='p-0 !border-transparent'>
            <ZRUBox
              width='2.9rem'
              height='2.6rem'
              className='rounded-md bg-primary'
            ></ZRUBox>
          </ZRUCheckboxCardsItem>
        </ZRUCheckboxCardsGroup>
      </ZRUBox>

      {/* Size */}
      <ZRUBox className='mt-2 border-t border-gray-100'>
        <ZRUText
          as={ZRUTextAsE.span}
          className='block px-5 pt-3 pb-1 font-semibold uppercase text-ellipsis text-dark'
        >
          Size
        </ZRUText>

        <ZRUCheckboxCardsGroup className='flex px-4 py-2'>
          <ZRUCheckboxCardsItem value='1' className='py-1 w-max'>
            xl
          </ZRUCheckboxCardsItem>
        </ZRUCheckboxCardsGroup>
      </ZRUBox>

      {/* Featured */}
      <ZRUBox className='mt-2 border-t border-gray-100'>
        <ZRUText
          as={ZRUTextAsE.span}
          className='block px-5 pt-3 pb-1 font-semibold uppercase text-ellipsis text-dark'
        >
          Featured
        </ZRUText>

        <ZHorizontalProductCard />
      </ZRUBox>

      {/*  */}
      <ZRUBox className='mt-2 border-t border-gray-100'>
        <ZRUText
          as={ZRUTextAsE.span}
          className='block px-5 pt-3 font-semibold uppercase text-ellipsis text-dark'
        >
          Custom HTML Block
        </ZRUText>
        <ZRUText
          as={ZRUTextAsE.span}
          className='block px-5 pb-1 text-sm font-medium text-ellipsis text-dark'
        >
          This is a custom sub-title.
        </ZRUText>

        <ZRUText
          as={ZRUTextAsE.span}
          className='block px-5 pb-1 mt-2 text-sm font-normal text-ellipsis text-dark line-clamp-4'
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non
          placerat mi. Etiam non tellus
        </ZRUText>
      </ZRUBox>
    </>
  );
};

export default ZCategoriesFilters;
