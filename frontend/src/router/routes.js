import { Switch } from "react-router-dom";

import appRoutes from "./app.routes";
import authRoutes from "./auth.routes";
import cartRoutes from "./cart.routes";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";

export const Routes = (
  <Switch>
    {cartRoutes}
    {authRoutes}
    {userRoutes}
    {productRoutes}
    {appRoutes}
  </Switch>
);
