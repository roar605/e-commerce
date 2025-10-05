import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import '../Styles/CartStyles/Cart.css'

function Cart() {
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

                            {/* Cart item */}
                            <div className="cart-item">
                                <div className="item-info">
                                    <img src='' alt='Product image' className='item-image' />
                                    <div className="item-details">
                                        <h3 className="item-name">Mobile</h3>
                                        <p className="item-price"><strong>Price: </strong>200/-</p>
                                        <p className="item-quantity"><strong>Quantity: </strong>3</p>

                                    </div>
                                </div>

                                <div className="quantity-controls">
                                    <button className="quantity-button decrease-btn">-</button>
                                    <input type='number' value={1} className='quantity-input' readOnly min='1' />
                                    <button className="quantity-button increase-btn">+</button>
                                </div>

                                <div className="item-total"><span className="item-total-price">200.00/-</span></div>

                                <div className="item-actions">
                                    <button className="update-item-btn">Update</button>
                                    <button className="rempove-item-btn">Remove</button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Price summary */}

            </div>

            <Footer />
        </>
    )
}

export default Cart