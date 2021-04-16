import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";

import { ScreenContainer } from "../components/ScreenContainer";

import { getUserDetails, updateUserProfile } from "../actions/user.actions";

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
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }

    return () => {
      setName("");
      setEmail("");
    };
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
      </Col>
    </Row>
  );
};
