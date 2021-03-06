import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import { ScreenContainer } from "../components/ScreenContainer";
import { FormContainer } from "../components/FormContainer";

import { login } from "../actions/user.actions";

import { paths } from "../router/paths";

export const LoginScreen = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector(({ userLogin }) => userLogin);
  const { loading, error, userInfo } = userLogin;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : paths.home;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <ScreenContainer variant="inline" loading={loading} error={error}>
        <Form onSubmit={submitHandler}>
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
          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer?
            <Link
              to={
                redirect
                  ? `${paths.register}?redirect=${redirect}`
                  : paths.register
              }
            >
              Register
            </Link>
          </Col>
        </Row>
      </ScreenContainer>
    </FormContainer>
  );
};
