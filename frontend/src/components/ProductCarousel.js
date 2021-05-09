import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { ScreenContainer } from "./ScreenContainer";

import { listTopProducts } from "../actions/product.actions";

import { paths } from "../router/paths";

export const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { loading, error, products = [] } = useSelector(
    ({ productTopRated }) => productTopRated
  );

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <ScreenContainer loading={loading} error={error}>
      <Carousel pause="hover" className="bg-dark">
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={paths.product(product._id)}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {product.name} {`(£${product.price})`}
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </ScreenContainer>
  );
};
