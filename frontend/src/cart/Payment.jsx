import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import '../Styles/CartStyles/Payment.css';
import CheckoutPath from './CheckoutPath';

function Payment() {
    const orderItem = JSON.parse(sessionStorage.getItem('orderItem'))
    return (
        <>
            <PageTitle title="Payment Processing" />
            <Navbar />
            <CheckoutPath activePath={2} />
            <div className="payment-container">
                <Link to='/order/confirm' className='payment-go-back'>Go Back</Link>
                <button className="payment-btn">Pay ({orderItem.total})/-</button>
            </div>
            <Footer />
        </>
    )
}

export default Payment