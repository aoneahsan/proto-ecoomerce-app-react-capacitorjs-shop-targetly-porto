import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import AppRouter from './Routes';
import FetchRequiredAppDataHOC from './HOCs/FetchRequiredAppDataHOC';
import ZNetworkOffline from './components/utility/ZNetworkOffline';

// React-toastify package css
import 'react-toastify/dist/ReactToastify.css';
import PackagesImportHOC from './HOCs/PackagesImport.hoc';

// QueryClient From tanstack/react-query
const queryClientObj = new QueryClient();

// App entry point
const AppEntryPoint: React.FC = () => {
  return (
    <>
      {/* React Query */}
      <QueryClientProvider client={queryClientObj}>
        {/* Recoil State HOC */}
        <RecoilRoot>
          {/* HOC to fetch required data from api or local storage for app */}
          <FetchRequiredAppDataHOC>
            <PackagesImportHOC>
              <RouterProvider router={AppRouter} />
              <ZNetworkOffline />
            </PackagesImportHOC>
            {/* Tanstack router */}
          </FetchRequiredAppDataHOC>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export default AppEntryPoint;
