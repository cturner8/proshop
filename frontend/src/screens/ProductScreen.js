import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
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
import { Meta } from "../components/Meta";
import { ScreenContainer } from "../components/ScreenContainer";

import { paths } from "../router/paths";

import {
  listProductDetails,
  createProductReview,
} from "../actions/product.actions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/product.constants";

import { useForm } from "../hooks";
import { Message } from "../components/Message";

export const ProductScreen = () => {
  const history = useHistory();
  const { id } = useParams();

  const [qty, setQty] = useState(1);

  const [reviewData, handleChange, setReviewData] = useForm({
    rating: 0,
    comment: "",
  });

  const dispatch = useDispatch();
  const productDetails = useSelector(({ productDetails }) => productDetails);
  const { product = {}, loading, error } = productDetails;

  const {
    error: errorProductReview,
    success: successProductReview,
  } = useSelector(({ productReviewCreate }) => productReviewCreate);

  const { userInfo } = useSelector(({ userLogin }) => userLogin);

  const isInStock = product.countInStock > 0;
  const isInStockKeys = [...Array(product.countInStock).keys()];

  useEffect(() => {
    if (successProductReview) {
      alert("Review submitted");
      setReviewData({
        rating: 0,
        comment: "",
      });
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview, setReviewData]);

  const addToCartHandler = () => {
    const url = paths.cart(id);
    history.push(`${url}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, reviewData));
  };

  return (
    <>
      <Link className="btn btn-light my-3" to={paths.home}>
        Go Back
      </Link>
      <ScreenContainer loading={loading} error={error}>
        <Meta title={`ProShop | ${product.name}`} />
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
        <Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {!product?.reviews?.length && <Message>No reviews</Message>}
            <ListGroup variant="flush">
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write a review</h2>
                {errorProductReview && (
                  <Message variant="danger">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={reviewData.rating}
                        name="rating"
                        onChange={handleChange}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        name="comment"
                        value={reviewData.comment}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    {"Please "}
                    <Link to={paths.login}>login</Link>
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </ScreenContainer>
    </>
  );
};
