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

const ZClientFormSkeleton: React.FC = () => {
  return (
    <div className='max-w-[23.438rem]  mt-4 w-full flex flex-col gap-8'>
      {[...Array(8)].map((el, index) => (
        <span
          className='bg-light rounded-md w-full block h-[2rem] text-tertiary text-start ps-4 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'
          key={index}
        ></span>
      ))}
      <div className='flex pt-3 max-w-[23.438rem] w-full mt-10 maxSm:flex-col-reverse maxSm:gap-y-2 sm:items-center sm:justify-between'>
        <span className='bg-light rounded-md w-[6rem] block h-[2.6rem] text-tertiary text-start ps-4 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
        <span className='bg-light rounded-md w-[6rem] block h-[2.6rem] text-tertiary text-start ps-4 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
      </div>
    </div>
  );
};

export default ZClientFormSkeleton;
