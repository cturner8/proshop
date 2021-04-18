import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";

import { FormContainer } from "../components/FormContainer";
import { CheckoutSteps } from "../components/CheckoutSteps";

import { savePaymentMethod } from "../actions/cart.actions";

import { paths } from "../router/paths";

const paymentMethods = [
  {
    label: "PayPal or Credit Card",
    id: "PayPal",
    value: "PayPal",
  },
  //   {
  //     label: "Stripe",
  //     id: "Stripe",
  //     value: "Stripe",
  //   },
];

export const PaymentScreen = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const cart = useSelector(({ cart }) => cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push(paths.shipping);
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push(paths.placeOrder);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            {paymentMethods.map((method) => (
              <Form.Check
                key={method.id}
                type="radio"
                label={method.label}
                id={method.id}
                name="paymentMethod"
                value={method.value}
                checked={paymentMethod === method.value}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            ))}
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
