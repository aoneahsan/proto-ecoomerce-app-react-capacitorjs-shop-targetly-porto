import {
  clientRoute,
  clientFormRouteTree,
  homeRoute,
  invoiceRoute,
  loginRoute,
  onboardingRoutesTree,
  profileSettingsRoutesTree,
  registerRoute,
  testingRoute,
  invoiceFormRouteTree,
  forgotRoute,
  categoryRoute,
  productRoute
} from './AllRoutes';
import tanstackRootRoute from './RootRoute';

const routeTree = tanstackRootRoute.addChildren([
  homeRoute,
  registerRoute,
  loginRoute,
  testingRoute,
  onboardingRoutesTree,
  profileSettingsRoutesTree,
  clientRoute,
  invoiceRoute,
  clientFormRouteTree,
  invoiceFormRouteTree,
  forgotRoute,
  categoryRoute,
  productRoute
]);

export default routeTree;
