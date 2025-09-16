import React, { useState } from 'react'
import '../pageStyles/ProductDetails.css'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Rating from '../components/Rating'

function ProductDetails() {
    const [userRating, setUserRating] = useState(0);
    const handleRatingChange = (newRating) => {
        setUserRating(newRating)

    }


    return (
        <>
            <PageTitle title='Product Name - Details' />
            <Navbar />
            <div className="product-details-container">
                <div className="product-detail-container">
                    {/* half part for product iamge */}
                    <div className="product-image-container">
                        <img src='' alt='Product title' className='product-detail-image'></img>
                    </div>
                    
                    {/* half for details of product */}
                    <div className="product-info">
                        <h2>
                            Product Name
                        </h2>
                        <p className='product-description'>Product description</p>
                        <p className="product-price">Price : 200/-</p>

                        <div className="product-rating">
                            <Rating
                                value={2}
                                disabled={true}
                            />
                            <span className="productCartSpan">(1 review)</span>

                        </div>

                        <div className="stock-status">
                            <span className="in-stock">
                                In stock (8 available)
                            </span>
                        </div>

                        <div className="quantity-controls">
                            <span className="quantity-label">
                                <button className="quantity-button">-</button>
                                <input type='text' value={1} className='quantity-value' readOnly />
                                <button className="quantity-button">+</button>
                            </span>
                        </div>

                        <button className="add-to-cart-btn">Add to cart</button>

                        <form>
                            <h3>Write a Review</h3>
                            <Rating value={0} disabled={false} onRatingChange={handleRatingChange} />
                            <textarea placeholder='Write your review here' className="review-input"></textarea>
                            <button className="submit-review-btn">Submit Review</button>
                        </form>

                    </div>
                </div>

                {/* previous customers reviews */}
                <div className="reviews-container">
                    <h3>Customer Reviews</h3>
                    <div className="reviews-section">
                        <div className="review-item">
                            <div className="review-header">
                                <Rating value={1} disabled={true}/>
                            </div>
                            <p className="review-comment">Review comment very very chalak bro</p>
                            <p className="review-name">By Rohit kumar Singh</p>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </>
    )
}

export default ProductDetails