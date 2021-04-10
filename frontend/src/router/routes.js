import { Switch, Route } from "react-router-dom";

import { paths } from "./paths";
import { HomeScreen } from "../screens/HomeScreen";
import { ProductScreen } from "../screens/ProductScreen";

export const routes = (
  <Switch>
    <Route exact path={paths.home} component={HomeScreen} />
    <Route path={paths.product(":id")} component={ProductScreen} />
  </Switch>
);
