import { HomeScreen } from "../screens/HomeScreen";

import { paths } from "./paths";
import { mapRoutes } from "./routeHelpers";

const pageNumber = ":pageNumber";
const keyword = ":keyword";

const routePaths = [
  {
    path: paths.home,
    component: HomeScreen,
    exact: true,
  },
  {
    path: paths.page(pageNumber),
    component: HomeScreen,
    exact: true,
  },
  {
    path: paths.searchAndPage(keyword, pageNumber),
    component: HomeScreen,
    exact: true,
  },
  {
    path: paths.search(keyword),
    component: HomeScreen,
  },
];

const routes = mapRoutes("app", routePaths);

export default routes;
