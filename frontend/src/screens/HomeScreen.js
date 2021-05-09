import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import { Product } from "../components/Product";
import { Paginate } from "../components/Paginate";
import { ProductCarousel } from "../components/ProductCarousel";
import { ScreenContainer } from "../components/ScreenContainer";
import { Meta } from "../components/Meta";
import { listProducts } from "../actions/product.actions";
import { paths } from "../router/paths";

export const HomeScreen = () => {
  const { keyword = "", pageNumber = 1 } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector(({ productList }) => productList);
  const { products = [], loading, error, page, pages } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {keyword ? <Link to={paths.home} className="btn btn-light">Go Back</Link> : <ProductCarousel />}
      <h1>Latest Products</h1>
      <ScreenContainer loading={loading} error={error}>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword} />
      </ScreenContainer>
    </>
  );
};
