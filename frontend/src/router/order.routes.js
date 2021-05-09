import { OrderScreen } from "../screens/OrderScreen";
import { OrderListScreen } from "../screens/OrderListScreen";

import { paths } from "./paths";
import { mapRoutes } from "./routeHelpers";

const routePaths = [
  {
    path: paths.order(":id"),
    component: OrderScreen,
  },
  {
    path: paths.orderList,
    component: OrderListScreen,
  },
];

const routes = mapRoutes("order", routePaths);

export default routes;
