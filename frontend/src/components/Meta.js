import { Helmet } from "react-helmet";

export const Meta = ({
  title = "Welcome to ProShop",
  description = "Best products cheaper",
  keywords = "electronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};
