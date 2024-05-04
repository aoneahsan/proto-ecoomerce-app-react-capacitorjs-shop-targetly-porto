import React, { Suspense } from 'react';
import ZGlobalComponents from '@/HOCs/ZGlobalComponents';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NotFound404Page from '@/pages123/common123/404';
import ZFullPageFallbackLoader from '@/components123/Elements/FallbackLoader';

// Radix UI
import { Theme } from '@radix-ui/themes';

// eslint-disable-next-line react-refresh/only-export-components
const ZaionsTSRAppRoot: React.FC = () => {
  //
  return (
    <>
      <Theme>
        <Outlet />
        <ZGlobalComponents />
        <ToastContainer />
      </Theme>

      {/* React Query Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

const tanstackRootRoute = createRootRoute({
  component: ZaionsTSRAppRoot,
  notFoundComponent: () => {
    return (
      <Suspense fallback={<ZFullPageFallbackLoader />}>
        <NotFound404Page />
      </Suspense>
    );
  }
});

export default tanstackRootRoute;
