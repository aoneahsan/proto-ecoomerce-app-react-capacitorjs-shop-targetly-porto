// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useRecoilValue } from 'recoil';

// #endregion

// #region ---- Custom Imports ----
import ZButton from '@/Components/Elements/Button';
import { useZNavigate } from '@/ZHooks/Navigation.hook';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----
import { IsAuthenticatedRStateSelector } from '@/Store/Auth/index.recoil';

// #endregion

// #region ---- Images Imports ----
import { Z404Svg } from '@/assets';
import { AppRoutes } from '@/Routes/AppRoutes';
import { ZInvoiceTypeE } from '@/Types/Auth/Invoice';

// #endregion

// #region ---- Types Imports ----

// #endregion

const NotFound404Page: React.FC = () => {
  const isAuthenticated = useRecoilValue(IsAuthenticatedRStateSelector);
  const navigate = useZNavigate();
  return (
    <div className='w-full lg:pt-[4rem] maxLg:pt-[2rem] pb-[2rem] h-screen bg-secondary text-center flex items-center justify-center flex-col'>
      <Z404Svg className='w-[10rem] h-[10rem] text-primary' />
      <h3 className='text-primary mt-9 text-[1.8rem] font-black font-mont-heavy'>
        Page Not Fount
      </h3>

      <ZButton
        className='uppercase mt-9'
        onClick={() => {
          if (isAuthenticated) {
            void navigate({
              to: AppRoutes.authRoutes.invoices,
              params: {
                invoiceType: ZInvoiceTypeE.inv
              }
            });
          } else {
            void navigate({
              to: AppRoutes.home
            });
          }
        }}
      >
        Go to Home
      </ZButton>
    </div>
  );
};

export default NotFound404Page;
