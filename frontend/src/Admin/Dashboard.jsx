import { AddBox, Dashboard as DashboardIcon, Inventory, People, ShoppingCart, Star } from "@mui/icons-material"
import '../Styles/AdminStyles/Dashboard.css'
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <>
            <Navbar />
            <PageTitle title="Admin Dashboard" />
            <div className="dashboard-container">
                <div className="sidebar">
                    <div className="logo">
                        <DashboardIcon className="logo-icon" />
                        Admin Dashboard
                    </div>
                    <nav className="nav-menu">
                        <div className="nav-section">
                            <h3>Products</h3>
                            <Link to="/admin/products">
                                <Inventory className="nav-icons" />
                                All Products
                            </Link>
                            <Link to="/admin/products/create">
                                <AddBox className="nav-icons" />
                                Create Products
                            </Link>
                        </div>

                        <div className="nav-section">
                            <h3>Users</h3>
                            <Link to="/admin/users">
                                <People className="nav-icons" />
                                All Users
                            </Link>
                        </div>

                        <div className="nav-section">
                            <h3>Orders</h3>
                            <Link to="/admin/orders">
                                <ShoppingCart className="nav-icons" />
                                All Orders
                            </Link>
                        </div>

                        <div className="nav-section">
                            <h3>Reviews</h3>
                            <Link to="/admin/reviewId">
                                <Star className="nav-icons" />
                                All Reviews
                            </Link>
                        </div>
                    </nav>
                </div>

                <div className="main-content">
                    <div className="stats-grid">
                        <div className="stat-box">
                            <Inventory className="icon" />
                            <h3>Total Products</h3>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Dashboard