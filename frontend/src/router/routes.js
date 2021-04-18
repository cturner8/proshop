import { Switch, Route } from "react-router-dom";

import { paths } from "./paths";
import { HomeScreen } from "../screens/HomeScreen";
import { ProductScreen } from "../screens/ProductScreen";
import { CartScreen } from "../screens/CartScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ShippingScreen } from "../screens/ShippingScreen";
import { PaymentScreen } from "../screens/PaymentScreen";

export const routes = (
  <Switch>
    <Route path={paths.product(":id")} component={ProductScreen} />
    <Route path={paths.cart(":id?")} component={CartScreen} />
    <Route path={paths.login} component={LoginScreen} />
    <Route path={paths.register} component={RegisterScreen} />
    <Route path={paths.profile} component={ProfileScreen} />
    <Route path={paths.shipping} component={ShippingScreen} />
    <Route path={paths.payment} component={PaymentScreen} />
    <Route exact path={paths.home} component={HomeScreen} />
  </Switch>
);
