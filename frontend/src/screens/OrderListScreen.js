import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";

import { ScreenContainer } from "../components/ScreenContainer";

import { listOrders } from "../actions/order.actions";

import { paths } from "../router/paths";

import { useUserLoginState } from "../hooks";

export const OrderListScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { orders = [], loading, error } = useSelector(
    ({ orderList }) => orderList
  );

  const { userInfo } = useUserLoginState();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push(paths.login);
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      <ScreenContainer loading={loading} error={error}>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
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
                <td>{order.user && order.user.name}</td>
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
    </>
  );
};
