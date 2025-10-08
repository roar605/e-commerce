import { LocalShipping } from '@mui/icons-material'
import '../Styles/CartStyles/CheckoutPath.css'


function CheckoutPath() {

    return (
        <div className="checkoutPath">
            <div className="checkoutPath-step">
                <p className="checkoutPath-icon"><LocalShipping /></p>
                <p className="checkoutPath-label">Shipping Details</p>
            </div>
        </div>
    )
}

export default CheckoutPath