import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import { ScreenContainer } from "../components/ScreenContainer";
import { FormContainer } from "../components/FormContainer";

import { register } from "../actions/user.actions";

import { paths } from "../router/paths";

export const RegisterScreen = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const userRegister = useSelector(({ userRegister }) => userRegister);
  const { loading, error, userInfo } = userRegister;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : paths.home;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
      setMessage("");
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <ScreenContainer
        variant="inline"
        loading={loading}
        error={error || message}
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
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an account?
            <Link
              to={
                redirect ? `${paths.login}?redirect=${redirect}` : paths.login
              }
            >
              Login
            </Link>
          </Col>
        </Row>
      </ScreenContainer>
    </FormContainer>
  );
};
