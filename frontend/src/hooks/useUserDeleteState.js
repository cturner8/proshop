import { useSelector } from "react-redux";

export const useUserDeleteState = () => {
  const state = useSelector(({ userDelete }) => userDelete);
  return state;
};
