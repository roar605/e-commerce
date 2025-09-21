import { Link } from 'react-router-dom'
import '../Styles/UserStyles/Profile.css'
import { useSelector } from 'react-redux'

function Profile() {
    const { loading, isAuthenticated, user } = useSelector(state => state.user);
    console.log(user);



    return (
        <div className="profile-container">
            <div className="profile-image">
                <h1 className="profile-heading">My Profile</h1>
                <img src="" alt="User Profile" className="profile-image" />
                <Link to="/profile/update">Edit Profile</Link>
            </div>
            <div className="profile-details">
                <div className="profile-detail">
                    <h2>Username:</h2>
                    <p>Rohit</p>
                </div>

                <div className="profile-detail">
                    <h2>Email:</h2>
                    <p>rohitsingh@gmail.com</p>
                </div>

                <div className="profile-detail">
                    <h2>Joined on:</h2>
                    <p>September 21st , 2025</p>
                </div>
            </div>

            <div className="profile-buttons">
                <Link to='/orders/user'>My orders</Link>
                <Link to='/password/update'>Change Password</Link>
            </div>
        </div>
    )
}

export default Profile