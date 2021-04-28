import { ProfileScreen } from "../screens/ProfileScreen";
import { UserListScreen } from "../screens/UserListScreen";
import { UserEditScreen } from "../screens/UserEditScreen";

import { paths } from "./paths";
import { mapRoutes } from "./routeHelpers";

const routePaths = [
  {
    path: paths.profile,
    component: ProfileScreen,
  },
  {
    path: paths.adminUserList,
    component: UserListScreen,
  },
  {
    path: paths.user(":id"),
    component: UserEditScreen,
  },
];

const routes = mapRoutes("user", routePaths);

export default routes;
