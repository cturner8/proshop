import { Loader } from "../components/Loader";
import { Message } from "../components/Message";

export const ScreenContainer = ({
  variant = "standard",
  loading,
  error,
  messageVariant = "danger",
  children,
}) => {
  const loader = <Loader />;
  const errorMessage = <Message variant={messageVariant}>{error}</Message>;

  switch (variant) {
    case "standard":
      return loading ? loader : error ? errorMessage : children;
    case "inline":
      return (
        <>
          {loading && loader}
          {error && errorMessage}
          {children}
        </>
      );
    default:
      return <></>;
  }
};
