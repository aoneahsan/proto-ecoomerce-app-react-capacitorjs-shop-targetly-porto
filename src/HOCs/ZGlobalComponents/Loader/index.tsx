// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useRecoilState } from 'recoil';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----
import { ZLoaderRStateAtom } from '@/store/global/index.recoil';

// #endregion

// #region ---- Images Imports ----
import { SpinSvg } from '@/assets';

// #endregion

const ZLoader: React.FC = () => {
  const [ZLoaderRState] = useRecoilState(ZLoaderRStateAtom);

  return (
    <div
      className={ZClassNames({
        'fixed top-1/2 left-1/2 w-full h-full -translate-x-1/2 bg-transparent -translate-y-1/2 transition-all ease-in-out duration-100 flex justify-start items-center flex-col pt-10':
          true,
        'opacity-100 scale-100 z-20': ZLoaderRState?.isOpen,
        'opacity-0 scale-0 z-0': ZLoaderRState?.isOpen === false
      })}
    >
      <div className='absolute inset-0 z-20 w-full h-full opacity-60 bg-dark'></div>
      <div className='relative z-50 flex flex-col items-center justify-center gap-3 mt-10'>
        <SpinSvg className='w-[2rem!important] h-[2rem!important] text-white' />
        <p className='text-light drop-shadow-md text-[1.3rem]'>
          {ZLoaderRState.message}
        </p>
      </div>
    </div>
  );
};

export default ZLoader;
