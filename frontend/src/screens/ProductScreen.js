import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

import { Rating } from "../components/Rating";
import { ScreenContainer } from "../components/ScreenContainer";

import { paths } from "../router/paths";

import { listProductDetails } from "../actions/product.actions";

export const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector(({ productDetails }) => productDetails);
  const { product = {}, loading, error } = productDetails;

  const isInStock = product.countInStock > 0;
  const isInStockKeys = [...Array(product.countInStock).keys()];

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  const addToCartHandler = () => {
    const url = paths.cart(match.params.id);
    history.push(`${url}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to={paths.home}>
        Go Back
      </Link>
      <ScreenContainer loading={loading} error={error}>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: £{product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>£{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{isInStock ? "In Stock" : "Out of Stock"}</Col>
                  </Row>
                </ListGroup.Item>

                {isInStock && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {isInStockKeys.map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={!isInStock}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </ScreenContainer>
    </>
  );
};
