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
import { SpinSvg } from '@/assets';

// #endregion

// #region ---- Types Imports ----

// #endregion

const ZFullPageFallbackLoader: React.FC = () => {
  return (
    <div className='w-full lg:pt-[4rem] maxLg:pt-[2rem] pb-[2rem] h-screen bg-secondary text-center flex items-center justify-center flex-col'>
      <SpinSvg className='w-[2rem!important] h-[2rem!important] text-white' />
    </div>
  );
};

export default ZFullPageFallbackLoader;
