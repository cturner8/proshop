export const paths = {
  home: "/",
  product: (id) => `/product/${id}`,
  login: "/login",
  cart: (id = "") => `/cart/${id}`,
};
