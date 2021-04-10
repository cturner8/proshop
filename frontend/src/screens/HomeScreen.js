import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { Product } from "../components/Product";
import { ScreenContainer } from "../components/ScreenContainer";
import { listProducts } from "../actions/product.actions";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector(({ productList }) => productList);
  const { products = [], loading, error } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      <ScreenContainer loading={loading} error={error}>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </ScreenContainer>
    </>
  );
};
