import { Switch, Route } from "react-router-dom";

import { paths } from "./paths";
import { HomeScreen } from "../screens/HomeScreen";
import { ProductScreen } from "../screens/ProductScreen";
import { CartScreen } from "../screens/CartScreen";

export const routes = (
  <Switch>
    <Route exact path={paths.home} component={HomeScreen} />
    <Route path={paths.product(":id")} component={ProductScreen} />
    <Route path={paths.cart(":id?")} component={CartScreen} />
  </Switch>
);
