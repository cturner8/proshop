import { ProductScreen } from "../screens/ProductScreen";

import { paths } from "./paths";
import { mapRoutes } from "./routeHelpers";

const routePaths = [
  {
    path: paths.product(":id"),
    component: ProductScreen,
  },
];

const routes = mapRoutes("product", routePaths);

export default routes;
