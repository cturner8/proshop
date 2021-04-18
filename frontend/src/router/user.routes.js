import { ProfileScreen } from "../screens/ProfileScreen";

import { paths } from "./paths";
import { mapRoutes } from "./routeHelpers";

const routePaths = [
  {
    path: paths.profile,
    component: ProfileScreen,
  },
];

const routes = mapRoutes("user", routePaths);

export default routes;
