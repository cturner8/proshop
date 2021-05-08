import { ProductScreen } from "../screens/ProductScreen";
import { ProductListScreen } from "../screens/ProductListScreen";

import { paths } from "./paths";
import { mapRoutes } from "./routeHelpers";

const routePaths = [
  {
    path: paths.product(":id"),
    component: ProductScreen,
  },
  {
    path: paths.productList,
    component: ProductListScreen,
  },
];

const routes = mapRoutes("product", routePaths);

export default routes;
