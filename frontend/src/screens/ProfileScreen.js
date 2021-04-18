import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { ScreenContainer } from "../components/ScreenContainer";

import { getUserDetails, updateUserProfile } from "../actions/user.actions";
import { listMyOrders } from "../actions/order.actions";

import { paths } from "../router/paths";

export const ProfileScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userDetails = useSelector(({ userDetails }) => userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(({ userLogin }) => userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(
    ({ userUpdateProfile }) => userUpdateProfile
  );
  const { success } = userUpdateProfile;

  const orderMyList = useSelector(({ orderMyList }) => orderMyList);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders = [],
  } = orderMyList;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userInfo) {
      history.push(paths.login);
    } else {
      if (!user.name) {
        dispatch(getUserDetails());
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      const update = { id: user._id, name, email, password };
      dispatch(updateUserProfile(update));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <ScreenContainer
          variant="inline"
          loading={loading}
          error={error || message}
          success={success}
        >
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter email"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </ScreenContainer>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        <ScreenContainer loading={loadingOrders} error={errorOrders}>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={paths.order(order._id)}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScreenContainer>
      </Col>
    </Row>
  );
};
