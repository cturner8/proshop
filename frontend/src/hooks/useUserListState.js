import { useSelector } from "react-redux";

export const useUserListState = () => {
  const state = useSelector(({ userList }) => userList);
  return state;
};
