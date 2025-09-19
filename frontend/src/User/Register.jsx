import { Link } from "react-router-dom";
import "../Styles/UserStyles/Form.css";
import { useState } from "react";
import { Password } from "@mui/icons-material";

function Registe() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    Password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "https://static.vecteezy.com/system/resources/previews/036/885/313/non_2x/blue-profile-icon-free-png.png"
  );
  const { name, email, password } = user;

  return (
    <div className="form-container container">
      <div className="form-content">
        <form className="form">
          <h2>Sign Up</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="username"
              name="name"
              value={name}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="email-id"
              name="email"
              value={email}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
            />
          </div>
          <div className="input-group avatar-group">
            <input
              type="file"
              name="avatar"
              className="file-input"
              accept="image/"
            />
            <img src={avatarPreview} alt="Avatar Preview" className="avatar" />
          </div>

          <button className="authBtn">Sign Up</button>
          <p className="form-links">
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registe;
