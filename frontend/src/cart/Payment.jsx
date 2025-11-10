import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import '../Styles/CartStyles/Payment.css';
import CheckoutPath from './CheckoutPath';
import axios from 'axios'
import { useSelector } from 'react-redux';
import toast from 'react-toastify'
import Razorpay from 'razorpay'

function Payment() {
    const orderItem = JSON.parse(sessionStorage.getItem('orderItem'))
    const { user } = useSelector(state => state.user);
    const { shippingInfo } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const completePayment = async (amount) => {
        try {
            const { data: keyData } = await axios.get('/api/v1/getKey')
            const { key } = keyData
            // console.log(key);

            const { data: orderData } = await axios.post('/api/v1/payment/process', { amount })
            const { order } = orderData
            // console.log(order);

            // Open Razorpay Checkout
            const options = {
                key, // Replace with your Razorpay key_id
                amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: 'INR',
                name: 'SuperSub',
                description: 'E-Commerce Website Payment Transaction',
                order_id: order.id, // This is the order_id created in the backend
                // callback_url: '/api/v1/paymentVerification', // Your success URL
                handler: async function (response) {
                    const { data } = await axios.post('/api/v1/paymentVerification', {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature
                    })
                    if (data.success) {
                        navigate(`/paymentSuccess?reference=${data.reference}`)
                    } else {
                        alert('Payment Verification failed')
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: shippingInfo.phoneNumber
                },
                theme: {
                    color: '#F37254'
                },
            };

            const rzp = await new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 })
        }
    }

    return (
        <>
            <PageTitle title="Payment Processing" />
            <Navbar />
            <CheckoutPath activePath={2} />
            <div className="payment-container">
                <Link to='/order/confirm' className='payment-go-back'>Go Back</Link>
                <button className="payment-btn" onClick={() => completePayment(orderItem.total.toFixed(2))}>Pay ({orderItem.total.toFixed(2)})/-</button>
            </div>
            <Footer />
        </>
    )
}

export default Payment