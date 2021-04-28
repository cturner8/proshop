import { useSelector } from "react-redux";

export const useUserLoginState = () => {
  const state = useSelector(({ userLogin }) => userLogin);
  return state;
};
