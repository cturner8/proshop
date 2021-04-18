import { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";

import { Message } from "../components/Message";
import { Loader } from "../components/Loader";
import { ScreenContainer } from "../components/ScreenContainer";
import { paths } from "../router/paths";

import { getOrderDetails, payOrder } from "../actions/order.actions";
import { ORDER_PAY_RESET } from "../constants/order.constants";

export const OrderScreen = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector(({ orderDetails }) => orderDetails);
  const { order = {}, loading, error } = orderDetails;
  const [sdkReady, setSdkReady] = useState(false);

  const orderPay = useSelector(({ orderPay }) => orderPay);
  const { success: paymentSuccess, loading: paymentLoading } = orderPay;

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
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => setSdkReady(true);

      document.body.appendChild(script);
    };

    const fetchDetails = !error && order._id !== orderId;

    if (fetchDetails || paymentSuccess) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order._id, error, paymentSuccess, isPaid]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

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
                {!isPaid && (
                  <ListGroup.Item>
                    {paymentLoading && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    </ScreenContainer>
  );
};
