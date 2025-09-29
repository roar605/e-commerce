import React, { useEffect, useState } from "react";
import "../Styles/pageStyles/ProductDetails.css";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProductDetails,
  removeErrors,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { addItemsToCart, removeMessage } from "../features/cart/cartSlice";

function ProductDetails() {
  const [userRating, setUserRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };
  const { product, loading, error } = useSelector((state) => state.product);
  const { loading: cartLoading, error: cartError, success, message, cartItems } = useSelector((state) => state.cart);
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error('Quantity cannot be less than 1', { position: 'top-center', autoClose: 3000 })
      dispatch(removeErrors())
      return;
    }
    setQuantity(qty => qty + 1)
  }
  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      toast.error('Cannot exceed available stock!', { position: 'top-center', autoClose: 3000 })
      dispatch(removeErrors())
      return;
    }
    setQuantity(qty => qty + 1)
  }
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
    return () => {
      dispatch(removeErrors());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (cartError) {
      toast.error(cartError.message, { position: "top-center", autoClose: 3000 });
    }
  }, [dispatch, error, cartError]);

  useEffect(() => {
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(removeMessage());
    }

  }, [dispatch, success, message]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }
  if (error || !product) {
    return (
      <>
        <Navbar />
        <PageTitle title="Product Details" />
        <Footer />
      </>
    );
  }

  const addToCart = () => {
    dispatch(addItemsToCart({ id, quantity }))
  }

  return (
    <>
      <PageTitle title={`${product.name} -Details`} />
      <Navbar />
      <div className="product-details-container">
        <div className="product-detail-container">
          {/* half part for product iamge */}
          <div className="product-image-container">
            <img
              src={product.image[0].url}
              alt="Product title"
              className="product-detail-image"
            ></img>
          </div>

          {/* half for details of product */}
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price : {product.price}/-</p>

            <div className="product-rating">
              <Rating value={product.ratings} disabled={true} />
              <span className="productCartSpan">({product.numOfReviews})</span>
            </div>

            <div className="stock-status">
              <span className={product.stock > 1 ? `in-stock` : `out-of-stock`}>
                {product.stock > 0
                  ? `In Stock (${product.stock}) available`
                  : "Out of stock"}
              </span>
            </div>

            {product.stock > 0 && (
              <>
                <div className="quantity-controls">
                  <span className="quantity-label">
                    <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                    <input
                      type="text"
                      value={quantity}
                      className="quantity-value"
                      readOnly
                    />
                    <button className="quantity-button" onClick={increaseQuantity}>+</button>
                  </span>
                </div>

                <button className="add-to-cart-btn" disabled={cartLoading}
                  onClick={addToCart}>{cartLoading ? 'Adding' : 'Add to cart'}</button>
              </>
            )}
            <form>
              <h3>Write a Review</h3>
              {/* <Rating
                value={0}
                disabled={false}
                onRatingChange={handleRatingChange}
              /> */}
              <textarea
                placeholder="Write your review here"
                className="review-input"
              ></textarea>
              <button className="submit-review-btn">Submit Review</button>
            </form>
          </div>
        </div>

        {/* previous customers reviews */}
        <div className="reviews-container">
          <h3>Customer Reviews</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="reviews-section">
              {product.reviews.map((review, index) => (
                <div className="review-item" key={index}>
                  <div className="review-header">
                    <Rating value={review.rating} disabled={true} />
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <p className="review-name">By : {review.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reviews">No reviews yet.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;
