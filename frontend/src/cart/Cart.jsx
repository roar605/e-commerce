import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import '../Styles/CartStyles/Cart.css'
import CartItem from './CartItem'
import { Link, useNavigate } from 'react-router-dom'

function Cart() {
    const { cartItems } = useSelector(state => state.cart)
    const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = subTotal * 0.18
    const shippingCharges = subTotal > 500 ? 0 : 50
    const total = subTotal + tax + shippingCharges
    // console.log(cartItems);
    const navigate = useNavigate();
    const checkoutHandler = () => {
        navigate(`/login?redirect=/shipping`)
    }

    return (
        <>
            <Navbar />
            <PageTitle title="Your Cart" />
            {cartItems.length === 0 ? (
                <div className='empty-cart-container'>
                    <p className="empty-cart-message">Your cart is empty</p>
                    <Link to='/products' className='viewProducts'>View Products</Link>
                </div>
            ) : (<>
                <div className="cart-page">
                    <div className="cart-items">
                        <div className="cart-items-heading">
                            <div className="cart-table">
                                <div className="cart-table-header">
                                    <div className="header-product">Product</div>
                                    <div className="header-quantity">Quantity</div>
                                    <div className="header-total item-total-heading">Item Total</div>
                                    <div className="header-action">Actions</div>
                                </div>

                                {cartItems && cartItems.map((item) => <CartItem item={item} key={item.name} />)}
                            </div>
                        </div>
                    </div>

                    {/* Price summary */}
                    <div className="price-summary">
                        <h3 className="price-summary-heading">Price Summary</h3>
                        <div className="summary-item">
                            <p className="summary-label">Subtotal : </p>
                            <p className="summary-value">{subTotal}/-</p>
                        </div>

                        <div className="summary-item">
                            <p className="summary-label">Tax (18%) : </p>
                            <p className="summary-value">{tax}/-</p>
                        </div>

                        <div className="summary-item">
                            <p className="summary-label">Shipping : </p>
                            <p className="summary-value">{shippingCharges}/-</p>
                        </div>

                        <div className="summary-item">
                            <p className="total-label">Total : </p>
                            <p className="total-value">{(total).toFixed(2)}/-</p>
                        </div>
                        <button className="checkout-btn" onClick={checkoutHandler}>Proceed to Checkout</button>
                    </div>
                </div>

            </>)}
            <Footer />

        </>
    )
}

export default Cart