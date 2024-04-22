// #region Packages imports
import { createRouter } from '@tanstack/react-router';
import routeTree from './RoutesTree';
// #endregion

const AppRouter = createRouter({
  routeTree,
  defaultPreload: 'intent'
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof AppRouter;
  }
}

export default AppRouter;
