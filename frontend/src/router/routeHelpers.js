import { Route } from "react-router-dom";

export const mapRoutes = (entity, paths = []) => {
  return paths.map((routePath, index) => (
    <Route {...routePath} key={`${entity}-${index}`} />
  ));
};
