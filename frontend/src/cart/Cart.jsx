import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import '../Styles/CartStyles/Cart.css'
import CartItem from './CartItem'

function Cart() {
    const { cartItems } = useSelector(state => state.cart)
    console.log(cartItems);


    return (
        <>
            <PageTitle title="Your Cart" />
            <Navbar />

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
                        <p className="summary-value">200/-</p>
                    </div>

                    <div className="summary-item">
                        <p className="summary-label">Tax (18%) : </p>
                        <p className="summary-value">10/-</p>
                    </div>

                    <div className="summary-item">
                        <p className="summary-label">Shipping : </p>
                        <p className="summary-value">50/-</p>
                    </div>

                    <div className="summary-item">
                        <p className="total-label">Total : </p>
                        <p className="total-value">260/-</p>
                    </div>
                    <button className="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Cart