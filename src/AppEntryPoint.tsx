import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import AppRouter from './Routes';
import FetchRequiredAppDataHOC from './HOCs/FetchRequiredAppDataHOC';

// React-toastify package css
import 'react-toastify/dist/ReactToastify.css';

const queryClientObj = new QueryClient();

const AppEntryPoint: React.FC = () => {
  return (
    <>
      {/* React Query */}
      <QueryClientProvider client={queryClientObj}>
        {/* Recoil State HOC */}
        <RecoilRoot>
          {/* HOC to fetch required data from api or local storage for app */}
          <FetchRequiredAppDataHOC>
            {/* Tanstack router */}
            <RouterProvider router={AppRouter} />
          </FetchRequiredAppDataHOC>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export default AppEntryPoint;
