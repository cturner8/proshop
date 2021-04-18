import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";

import { Message } from "../components/Message";
import { ScreenContainer } from "../components/ScreenContainer";
import { paths } from "../router/paths";

import { getOrderDetails } from "../actions/order.actions";

export const OrderScreen = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector(({ orderDetails }) => orderDetails);
  const { order = {}, loading, error } = orderDetails;

  const {
    shippingAddress = {},
    paymentMethod,
    orderItems = [],
    shippingPrice,
    taxPrice,
    totalPrice,
    user = {},
    isPaid,
    isDelivered,
    paidAt,
    deliveredAt,
  } = order;

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  const itemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  useEffect(() => {
    if (order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, order._id]);

  const placeOrderHandler = () => {};

  return (
    <ScreenContainer loading={loading} error={error}>
      <>
        <h1>Order {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name{": "}</strong>
                  {user.name}
                </p>
                <p>
                  <strong>Email{": "}</strong>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
                <p>
                  <strong>Address{": "}</strong>
                  {shippingAddress.address}
                  {", "}
                  {shippingAddress.city}
                  {", "}
                  {shippingAddress.postalCode}
                  {", "}
                  {shippingAddress.country}
                  {", "}
                </p>
                {isDelivered ? (
                  <Message variant="success">
                    Delivered on {deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method{": "}</strong>
                  {paymentMethod}
                </p>
                {isPaid ? (
                  <Message variant="success">Paid on {paidAt}</Message>
                ) : (
                  <Message variant="danger">Not paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {!orderItems.length ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={paths.product(item.product)}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty}
                            {" x £"}
                            {item.price}
                            {" = £"}
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>
                      {"£"}
                      {itemsPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>
                      {"£"}
                      {shippingPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>
                      {"£"}
                      {taxPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>
                      {"£"}
                      {totalPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    </ScreenContainer>
  );
};
