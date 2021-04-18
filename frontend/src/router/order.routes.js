import { OrderScreen } from "../screens/OrderScreen";

import { paths } from "./paths";
import { mapRoutes } from "./routeHelpers";

const routePaths = [
  {
    path: paths.order(":id"),
    component: OrderScreen,
  },
];

const routes = mapRoutes("order", routePaths);

export default routes;
