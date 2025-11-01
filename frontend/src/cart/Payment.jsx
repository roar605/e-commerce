import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import '../Styles/CartStyles/Payment.css';
import CheckoutPath from './CheckoutPath';
import axios from 'axios'
import { useSelector } from 'react-redux';
import Razorpay from 'razorpay';

function Payment() {
    const orderItem = JSON.parse(sessionStorage.getItem('orderItem'))
    const { user } = useSelector(state => state.user);
    const { shippingInfo } = useSelector(state => state.cart);
    const completePayment = async (amount) => {
        const { data: keyData } = await axios.get('/api/v1/getKey')
        const { key } = keyData
        console.log(key);

        const { data: orderData } = await axios.post('/api/v1/payment/process', { amount })
        const { order } = orderData
        console.log(order);

        // Open Razorpay Checkout
        const options = {
            key, // Replace with your Razorpay key_id
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: 'INR',
            name: 'SuperSub',
            description: 'E-Commerce Website Payment Transaction',
            order_id: order.id, // This is the order_id created in the backend
            callback_url: '/api/v1/paymentVerification', // Your success URL
            prefill: {
                name: user.name,
                email: user.email,
                contact: shippingInfo.phoneNumber
            },
            theme: {
                color: '#F37254'
            },
        };

        const rzp = new Razorpay(options);
        rzp.open();
    }

    return (
        <>
            <PageTitle title="Payment Processing" />
            <Navbar />
            <CheckoutPath activePath={2} />
            <div className="payment-container">
                <Link to='/order/confirm' className='payment-go-back'>Go Back</Link>
                <button className="payment-btn" onClick={() => completePayment(orderItem.total)}>Pay ({orderItem.total})/-</button>
            </div>
            <Footer />
        </>
    )
}

export default Payment