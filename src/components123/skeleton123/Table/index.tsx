// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

const TableSkeleton: React.FC = () => {
  return (
    <div className='pt-1 overflow-auto mt-7 animate-pulse'>
      {/* Table */}
      <div className='w-[64.4375rem]'>
        <div className='flex gap-3 items-center w-full py-3 border-b border-[rgba(58,54,83,0.54)]'>
          {[...Array(5)].map((el, index) => (
            <span
              className='bg-light rounded-full h-4 w-[10.4125rem] text-tertiary text-start ps-4 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'
              key={index}
            ></span>
          ))}
        </div>

        <div className='flex gap-3 items-center w-full py-1 border-b border-[rgba(58,54,83,0.54)]'>
          {[...Array(5)].map((el, index) => (
            <span
              className='bg-light rounded-full h-[1rem] w-[10.8125rem] text-tertiary text-start ps-4 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'
              key={index}
            ></span>
          ))}
          <span className='p-[0!important] bg-light ms-2 rounded-sm flex items-center justify-center h-6 w-6'></span>
          <span className='p-[0!important] bg-light ms-2 flex items-center justify-center h-11 w-[5.5rem] rounded-md'></span>
        </div>

        <div className='flex justify-center mt-5 items-center w-full py-[.4rem]'>
          <div className='w-1/2'>
            <span className='font-normal h-4 w-1/2 block rounded-full bg-light  ps-4 text-primary text-[1rem] leading-[120%] font-roboto-medium'></span>
          </div>
          <div className='flex items-center justify-end w-1/2'>
            <span className='p-[0!important] bg-light me-4 flex items-center justify-center h-4 w-[5.5rem] rounded-md'></span>
            <span className='p-[0!important] bg-light ms-2 flex items-center justify-center h-11 w-12 rounded-md'></span>
            <span className='p-[0!important] bg-light ms-2 flex items-center justify-center h-11 w-12 rounded-md'></span>
            <span className='p-[0!important] bg-light ms-4 flex items-center justify-center h-4 w-[5.5rem] rounded-md'></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
