import { useSelector } from "react-redux";

export const useUserUpdateState = () => {
  const state = useSelector(({ userUpdate }) => userUpdate);
  return state;
};
