import { useSelector } from "react-redux";

export const useProductListState = () => {
  const state = useSelector(({ productList }) => productList);
  return state;
};
