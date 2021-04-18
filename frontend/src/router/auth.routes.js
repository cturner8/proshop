import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";

import { paths } from "./paths";
import { mapRoutes } from "./routeHelpers";

const routePaths = [
  {
    path: paths.login,
    component: LoginScreen,
  },
  {
    path: paths.register,
    component: RegisterScreen,
  },
];

const routes = mapRoutes("auth", routePaths);

export default routes;
