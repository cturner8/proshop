import { ProductScreen } from "../screens/ProductScreen";
import { ProductListScreen } from "../screens/ProductListScreen";
import { ProductEditScreen } from "../screens/ProductEditScreen";

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
    exact: true,
  },
  {
    path: paths.productListPage(":pageNumber"),
    component: ProductListScreen,
    exact: true,
  },
  {
    path: paths.adminProductEdit(":id"),
    component: ProductEditScreen,
  },
];

const routes = mapRoutes("product", routePaths);

export default routes;
