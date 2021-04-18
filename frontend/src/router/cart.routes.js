import { ShippingScreen } from "../screens/ShippingScreen";
import { PaymentScreen } from "../screens/PaymentScreen";
import { CartScreen } from "../screens/CartScreen";

import { paths } from "./paths";
import { mapRoutes } from "./routeHelpers";

const routePaths = [
  {
    path: paths.cart(":id?"),
    component: CartScreen,
  },
  {
    path: paths.shipping,
    component: ShippingScreen,
  },
  {
    path: paths.payment,
    component: PaymentScreen,
  },
];

const routes = mapRoutes("cart", routePaths);

export default routes;
