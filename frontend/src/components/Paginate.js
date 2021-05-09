import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { paths } from "../router/paths";

export const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? paths.searchAndPage(keyword, x + 1)
                  : paths.page(x + 1)
                : paths.productListPage(x + 1)
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};
