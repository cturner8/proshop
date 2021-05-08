import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";

import { ScreenContainer } from "../components/ScreenContainer";

import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/product.actions";
import { PRODUCT_CREATE_RESET } from "../constants/product.constants";

import { paths } from "../router/paths";

import {
  useProductCreateState,
  useProductDeleteState,
  useProductListState,
  useUserLoginState,
} from "../hooks";

export const ProductListScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { products = [], loading, error } = useProductListState();

  const {
    success: successCreate,
    product: createdProduct = {},
    loading: loadingCreate,
    error: errorCreate,
  } = useProductCreateState();

  const {
    success: deleteSuccess,
    error: deleteError,
    loading: deleteLoading,
  } = useProductDeleteState();

  const { userInfo = {} } = useUserLoginState();

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push(paths.login);
    }

    if (successCreate) {
      history.push(paths.adminProductEdit(createdProduct._id));
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    deleteSuccess,
    successCreate,
    createdProduct._id,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-item-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus" />
            Create Product
          </Button>
        </Col>
      </Row>
      <ScreenContainer
        loading={loading || deleteLoading || loadingCreate}
        error={error || deleteError || errorCreate}
      >
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>£{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={paths.adminProductEdit(product._id)}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScreenContainer>
    </>
  );
};
