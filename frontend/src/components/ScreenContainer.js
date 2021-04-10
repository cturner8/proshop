import { Loader } from "../components/Loader";
import { Message } from "../components/Message";

export const ScreenContainer = ({
  loading,
  error,
  messageVariant = "danger",
  children,
}) => {
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant={messageVariant}>{error}</Message>
  ) : (
    children
  );
};
