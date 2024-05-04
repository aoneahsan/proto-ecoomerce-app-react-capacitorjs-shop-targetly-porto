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

const InvoiceFormSkeleton: React.FC = () => {
  return (
    <>
      <div className='flex items-center w-full py-5 maxMd:flex-col md:flex-row maxMd:gap-y-3 md:gap-y-0 animate-pulse'>
        <div className='flex items-center md:w-2/3 maxMd:w-full maxMd:flex-col maxMd:gap-y-3 md:gap-y-0 md:flex-row'>
          <span className='bg-light rounded-md me-5 w-[19rem] block h-[2.6rem] text-tertiary text-start ps-4 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>

          <span className='bg-light rounded-md me-9 w-[6rem] block h-[2.6rem] text-tertiary text-start ps-4 text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
        </div>

        <div className='flex items-center maxMd:flex-col-reverse md:w-1/3 maxMd:w-full md:justify-end'>
          <span className='bg-light rounded-md me-9 w-[6rem] block h-[2.6rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
          <span className='bg-light rounded-md w-[6rem] block h-[2.6rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
        </div>
      </div>

      <div className='w-full px-5 pt-6 pb-4 bg-white rounded-[0.625rem] shadow-[0_0.625rem_0.625rem_#0000001a] animate-pulse'>
        <div className='flex w-full'>
          <div className='w-1/2'>
            <div className='flex items-start justify-between w-full'>
              <div className='w-full'>
                <span className='block font-medium text-[.95rem] font-roboto-regular'>
                  <span className='bg-light rounded-md w-[10rem] block h-[1.1rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
                </span>
                <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                  <span className='bg-light rounded-md  w-[10rem] block h-[1.1rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
                </span>
                <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                  <span className='bg-light rounded-md  w-[10rem] block h-[1.1rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
                </span>
                <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                  <span className='bg-light rounded-md  w-[10rem] block h-[1.1rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
                </span>
                <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                  <span className='bg-light rounded-md  w-[10rem] block h-[1.1rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
                </span>
                <span className='block font-medium mt-1 text-[.95rem] font-roboto-regular'>
                  <span className='bg-light rounded-md  w-[10rem] block h-[1.1rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
                </span>
              </div>

              <div className=''>
                <span className='bg-light rounded-md w-[1.5rem] block h-[1.5rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
              </div>
            </div>

            <div className='mt-[3rem]'>
              <span className='bg-light rounded-md w-[3rem] block h-[1.5rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem] mb-2'></span>
              <div className='w-full border cursor-pointer border-[#a4a8b7] border-dashed rounded-lg min-h-[3.28rem] flex items-center'>
                <span className='bg-light rounded-md ms-7 w-[8rem] block h-[1.5rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-end w-1/2'>
            <span className='bg-light rounded-md w-[12.5rem] block h-[12.5rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem] mb-2'></span>

            <span className='bg-light rounded-md mb-2 w-[9rem] block h-[2.2rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>

            <div className='flex items-center justify-end w-full mb-2'>
              <span className='bg-light rounded-md w-[10rem] block h-[1.5rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
            </div>

            <div className='flex items-center justify-end w-full mb-2'>
              <span className='bg-light rounded-md w-[10rem] block h-[1.5rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
            </div>

            <div className='flex items-center justify-end w-full'>
              <span className='bg-light rounded-md w-[10rem] block h-[1.5rem] text-tertiary text-start text-[1rem] font-bold font-roboto-bold tracking-[0.15px] leading-[1.5rem]'></span>
            </div>
          </div>
        </div>

        <div className='w-full'>
          <div className='w-full my-4'>
            <div className='bg-[#f4f4f4] w-full h-[3.5rem]'></div>
            <div className='bg-[#f4f4f4] w-full h-[10rem] mt-3'></div>

            <div className='bg-[#f4f4f4] w-full h-[3.5rem] mt-3'></div>
            <div className='bg-[#f4f4f4] w-full h-[3.5rem] mt-3'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceFormSkeleton;
