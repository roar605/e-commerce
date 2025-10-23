import { AddBox, AttachMoney, CheckCircle, Dashboard as DashboardIcon, Error, Instagram, Inventory, LinkedIn, People, ShoppingCart, Star, YouTube } from "@mui/icons-material"
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
                            <p>4</p>
                        </div>

                        <div className="stat-box">
                            <ShoppingCart className="icon" />
                            <h3>Total Orders</h3>
                            <p>6</p>
                        </div>

                        <div className="stat-box">
                            <Star className="icon" />
                            <h3>Total Reviews</h3>
                            <p>13</p>
                        </div>

                        <div className="stat-box">
                            <AttachMoney className="icon" />
                            <h3>Total Revenue</h3>
                            <p>2349.00/-</p>
                        </div>

                        <div className="stat-box">
                            <Error />
                            <h3>Out Of Stock</h3>
                            <p>2</p>
                        </div>

                        <div className="stat-box">
                            <CheckCircle className="icon" />
                            <h3>In Stock</h3>
                            <p>4</p>
                        </div>
                    </div>

                    <div className="social-stats">
                        <div className="social-box instagram">
                            <Instagram />
                            <h3>Instagram</h3>
                            <p>123k followers</p>
                            <p>13 posts</p>
                        </div>

                        <div className="social-box linkedIn">
                            <LinkedIn />
                            <h3>LinkedIn</h3>
                            <p>133 connections</p>
                            <p>5 posts</p>
                        </div>

                        <div className="social-box youtube">
                            <YouTube />
                            <h3>Instagram</h3>
                            <p>36k subscribers</p>
                            <p>46 videos</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Dashboard