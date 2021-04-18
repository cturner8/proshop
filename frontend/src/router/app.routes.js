import { HomeScreen } from "../screens/HomeScreen";

import { paths } from "./paths";
import { mapRoutes } from "./routeHelpers";

const routePaths = [
  {
    path: paths.home,
    component: HomeScreen,
    exact: true,
  },
];

const routes = mapRoutes("app", routePaths);

export default routes;
