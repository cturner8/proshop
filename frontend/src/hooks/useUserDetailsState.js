import { useSelector } from "react-redux";

export const useUserDetailsState = () => {
  const state = useSelector(({ userDetails }) => userDetails);
  return state;
};
