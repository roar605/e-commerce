import React from 'react'
import '../Styles/AdminStyles/OrdersList.css'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';

function OrdersList() {
    return (
        <>
            <PageTitle title="Orders List" />
            <Navbar />
            <div className="ordersList-container">
                <h1 className="ordersList-title">All Orders</h1>
                <div className="ordersList-table-container">
                    <table className="ordersList-table">
                        <thead>
                            <tr>
                                <th>Sl no</th>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Total Price</th>
                                <th>Number of items</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>1234</td>
                                <td>Processing</td>
                                <td>500/-</td>
                                <td>3</td>
                                <td>
                                    <Link to='/admin/order/:orderId' className='action-icon edit-icon'><Edit /></Link>
                                    <button className="action-btn delete-icon"><Delete /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default OrdersList