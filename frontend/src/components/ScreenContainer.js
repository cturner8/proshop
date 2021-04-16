import { Loader } from "../components/Loader";
import { Message } from "../components/Message";

export const ScreenContainer = ({
  variant = "standard",
  loading,
  error,
  success,
  messageVariant = "danger",
  children,
}) => {
  const loader = <Loader />;
  const errorMessage = <Message variant={messageVariant}>{error}</Message>;
  const successMessage = <Message variant="success">{success}</Message>;

  switch (variant) {
    case "standard":
      return loading ? loader : error ? errorMessage : children;
    case "inline":
      return (
        <>
          {loading && loader}
          {error && errorMessage}
          {success && successMessage}
          {children}
        </>
      );
    default:
      return <></>;
  }
};
