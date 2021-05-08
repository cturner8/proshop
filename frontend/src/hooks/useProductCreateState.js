import { useSelector } from "react-redux";

export const useProductCreateState = () => {
  const state = useSelector(({ productCreate }) => productCreate);
  return state;
};
