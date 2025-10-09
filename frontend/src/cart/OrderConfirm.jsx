import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import '../Styles/CartStyles/OrderConfirm.css'
import CheckoutPath from './CheckoutPath'
import { useNavigate } from 'react-router-dom'

function OrderConfirm() {
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = subTotal * 0.18
    const shippingCharges = subTotal > 500 ? 0 : 50
    const total = subTotal + tax + shippingCharges;

    const proceedToPayment = () => {
        const data = {
            subTotal, tax, shippingCharges, total
        }
        sessionStorage.setItem('orderItem', JSON.stringify(data))
        navigate('/process/payment')
    }

    return (
        <>
            <PageTitle title="Order Confirm" />
            <Navbar />
            <CheckoutPath activePath={1} />
            <div className="confirm-container">
                <h1 className="confirm-header">Order Confirmation</h1>
                <div className="confirm-table-container">
                    <table className="confirm-table">
                        <caption>Shipping Details</caption>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.name}</td>
                                <td>{shippingInfo.phoneNumber}</td>
                                <td>{shippingInfo.address}, {shippingInfo.city},{shippingInfo.state},{shippingInfo.country} - {shippingInfo.pinCode} </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="confirm-table-cart-table">
                        <caption>Cart Items</caption>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr>
                                    <td><img className='order-product-image' src={item.image} alt={item.name} /></td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.quantity * item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <table className="confirm-table">
                        <caption>Order Summary</caption>
                        <thead>
                            <tr>
                                <th>Subtotal</th>
                                <th>Shipping Charges</th>
                                <th>Tax</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{subTotal}/-</td>
                                <td>{shippingCharges}/-</td>
                                <td>{tax}/-</td>
                                <td>{total}/-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button className="proceed-button" onClick={proceedToPayment}>Proceed to Payment</button>
            </div>
            <Footer />
        </>
    )
}

export default OrderConfirm