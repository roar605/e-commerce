import React, { useEffect, useState } from "react";
import "../Styles/pageStyles/ProductDetails.css";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createReview,
  getProductDetails,
  removeErrors,
  removeSuccess,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { addItemsToCart, removeMessage } from "../features/cart/cartSlice";

const imgLoading = "/images/images.png"

function ProductDetails() {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(imgLoading)
  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };
  const { product, loading, error, reviewSuccess, reviewLoading } = useSelector((state) => state.product);
  const { loading: cartLoading, error: cartError, success, message, cartItems } = useSelector((state) => state.cart);

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error('Quantity cannot be less than 1', { position: 'top-center', autoClose: 3000 })
      dispatch(removeErrors())
      return;
    }
    setQuantity(qty => qty - 1)
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
  // error and success control
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

  useEffect(() => {
    if (product && product.image && product.image.length > 0) {
      setSelectedImage(product.image[0].url)
    }
  }, [product])


  const addToCart = () => {
    dispatch(addItemsToCart({ id, quantity }))
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!userRating) {
      toast.error('Please select a rating', { position: 'top-center', autoClose: 3000 })
      return
    }
    dispatch(createReview({
      rating: userRating,
      comment,
      productId: id
    }))
  }

  useEffect(() => {
    if (reviewSuccess) {
      toast.success('Review submitted successfully', { position: 'top-center', autoClose: 3000 })
      setUserRating(0)
      setComment('')
      dispatch(removeSuccess())
      dispatch(getProductDetails(id))
    }
  }, [reviewSuccess, id, dispatch])
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

  return (
    <>
      <PageTitle title={`${product.name} -Details`} />
      <Navbar />
      <div className="product-details-container">
        <div className="product-detail-container">
          {/* half part for product iamge */}
          <div className="product-image-container">
            <img
              src={selectedImage}
              alt={product.name}
              className="product-detail-image"
            ></img>

            {product.image.length > 1 && (<div className="product-thumbnails">
              {product.image.map((img, index) => (
                <img src={img.url} alt={`Thumbnail ${index + 1}`} className="thumbnail-image"
                  onClick={() => setSelectedImage(img.url)} key={index} />
              ))}
            </div>)}
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
            <form className="review-form" onSubmit={handleReviewSubmit} >
              <h3>Write a Review</h3>
              <Rating
                value={0}
                disabled={false}
                onRatingChange={handleRatingChange}
              />
              <textarea
                placeholder="Write your review here"
                className="review-input" value={comment}
                onChange={(e) => setComment(e.target.value)} required></textarea>
              <button className="submit-review-btn"
                disabled={reviewLoading}>{reviewLoading ? 'Submitting...' : 'Submit Review'}</button>
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
