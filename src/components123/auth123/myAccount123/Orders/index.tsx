// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUScrollArea,
  ZRUText
} from '@/components123/RadixUI';

// #endregion

// #region ---- Types Imports ----
import {
  ZRUHeadingAsE,
  ZRUScrollbarTypeE
} from '@/types123/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZEllipsisVerticalCircleIcon } from '@/assets';

// #endregion

const Orders: React.FC = () => {
  return (
    <>
      <ZRUHeading
        as={ZRUHeadingAsE.h3}
        className='text-[.8rem] ls-n-25 p-[.5rem_1.5rem_.5rem] font-bold text-xl'
      >
        Orders
      </ZRUHeading>

      <ZRUBox className='relative overflow-x-auto'>
        <ZRUScrollArea type={ZRUScrollbarTypeE.auto}>
          <table className='w-full text-sm text-left text-medium rtl:text-right min-w-[48rem]'>
            <thead className='text-xs uppercase text-tertiary bg-light'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Order
                </th>
                <th scope='col' className='px-6 py-3'>
                  Date
                </th>
                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  Total
                </th>
                <th scope='col' className='px-6 py-3'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-white border-b border-gray-200'>
                <th
                  scope='row'
                  className='w-1/2 px-6 py-2 font-medium whitespace-nowrap'
                >
                  <ZRUText className='block md:w-[14rem] lg:w-[23rem] overflow-hidden text-ellipsis line-clamp-1'>
                    Microsoft Surface Pro
                  </ZRUText>
                </th>
                <td className='px-6 py-2'>
                  <ZRUText className='block overflow-hidden text-ellipsis line-clamp-1'>
                    White
                  </ZRUText>
                </td>
                <td className='px-6 py-2'>
                  <ZRUText className='block overflow-hidden text-ellipsis line-clamp-1'>
                    Laptop PC
                  </ZRUText>
                </td>
                <td className='px-6 py-2'>
                  <ZRUText className='block overflow-hidden text-ellipsis line-clamp-1'>
                    $1999
                  </ZRUText>
                </td>
                <td className='py-2 ps-10'>
                  <ZEllipsisVerticalCircleIcon className='w-6 h-6 cursor-pointer hover:text-primary' />
                </td>
              </tr>
            </tbody>
          </table>
          <ZRUBox className='flex items-center justify-center w-full py-5 border-b border-gray-200'>
            <ZRUText className='text-lg text-center text-primary'>
              No Orders Found
            </ZRUText>
          </ZRUBox>
        </ZRUScrollArea>

        <ZRUBox className='flex items-center justify-center w-full mt-4'>
          <ZRUButton size='3' className='maxSm:w-full'>
            Go Shop
          </ZRUButton>
        </ZRUBox>
      </ZRUBox>
    </>
  );
};

export default Orders;
