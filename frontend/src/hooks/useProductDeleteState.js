import { useSelector } from "react-redux";

export const useProductDeleteState = () => {
  const state = useSelector(({ productDelete }) => productDelete);
  return state;
};
