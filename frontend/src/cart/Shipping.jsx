import { useDispatch, useSelector } from 'react-redux'
import '../Styles/CartStyles/Shipping.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import CheckoutPath from './CheckoutPath'
import { useState } from 'react'
import { Country, State, City } from 'country-state-city';

function Shipping() {
    const { shippingInfo } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const shippingInfoSubmit = (e) => {
        e.preventDefault();

    }


    return (
        <>
            <PageTitle title='Shipping Info' />
            <Navbar />
            <CheckoutPath activePath={0} />
            <div className="shipping-form-container">
                <h1 className="shipping-form-header">Shipping Details</h1>
                <form className="shipping-form" onSubmit={shippingInfoSubmit}>
                    <div className="shipping-section">
                        <div className="shipping-form-group">
                            <label htmlFor="address">Address</label>
                            <input type='text' id='address' name='address' placeholder='Enter Your Address'
                                value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor="pinCode">Pin Code</label>
                            <input type='number' id='pinCode' name='pinCode' placeholder='Enter Your Pin Code'
                                value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type='tel' id='phoneNumber' name='phoneNumber' placeholder='Enter Your Phone Number'
                                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                    </div>

                    <div className="shipping-section">
                        <div className="shipping-form-group">
                            <label htmlFor="country">Country</label>
                            <select name="country" id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                                <option value="">Select a Country</option>
                                <option value="IN">India</option>
                                <option value="US">United States</option>
                            </select>
                        </div>


                        <div className="shipping-form-group">
                            <label htmlFor="state">State</label>
                            <select name="state" id="state" value={state} onChange={(e) => setState(e.target.value)}>
                                <option value="">Select a State</option>
                            </select>
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor="city">City</label>
                            <select name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)}>
                                <option value="">Select a City</option>
                            </select>
                        </div>
                    </div>

                    <button className="shipping-submit-btn">Continue</button>
                </form>
            </div>

            <Footer />
        </>
    )
}

export default Shipping