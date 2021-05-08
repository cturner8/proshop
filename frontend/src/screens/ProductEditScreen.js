import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { ScreenContainer } from "../components/ScreenContainer";
import { FormContainer } from "../components/FormContainer";

import { listProductDetails, updateProduct } from "../actions/product.actions";

import { paths } from "../router/paths";

import { useForm } from "../hooks";
import { PRODUCT_UPDATE_RESET } from "../constants/product.constants";

export const ProductEditScreen = () => {
  const history = useHistory();
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    ({ productDetails }) => productDetails
  );

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector(({ productUpdate }) => productUpdate);

  const [productData, handleChange, setProductData, clear] = useForm({
    name: "",
    price: 0,
    image: "",
    brand: "",
    category: "",
    countInStock: 0,
    description: "",
  });

  useEffect(() => {
    console.log("changed");
  }, [clear]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        ...productData,
      })
    );
  };

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product._id) {
      setProductData(product);
    }

    return () => setProductData({});
  }, [product, setProductData]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push(paths.productList);
    }
  }, [successUpdate, dispatch, history]);

  return (
    <>
      <Link to={paths.productList} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product Details</h1>
        <ScreenContainer
          variant="inline"
          loading={loading || loadingUpdate}
          error={error || errorUpdate}
        >
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter name"
                value={productData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                placeholder="Enter Price"
                value={productData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                name="image"
                type="text"
                placeholder="Enter Image"
                value={productData.image}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                name="brand"
                type="text"
                placeholder="Enter Brand"
                value={productData.brand}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                type="text"
                placeholder="Enter Category"
                value={productData.category}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                name="countInStock"
                type="number"
                placeholder="Enter Category"
                value={productData.countInStock}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Enter Description"
                value={productData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </ScreenContainer>
      </FormContainer>
    </>
  );
};
