import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/UserStyles/Form.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, removeErrors } from "../features/user/userSlice";
import { toast } from "react-toastify";
function Login() {
  const location = useLocation();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { error, loading, success, isAuthenticated } = useSelector(state => state.user);
  const redirect = new URLSearchParams(location.search).get("redirect") || '/'
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginSubmit = e => {
    e.preventDefault();
    dispatch(
      login({
        email: loginEmail,
        password: loginPassword,
      })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (success) {
      toast.success("Login successfull", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, [dispatch, success]);

  return (
    <div className="form-container container">
      <div className="form-content">
        <form className="form" onSubmit={loginSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="email"
              onChange={e => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="password"
              onChange={e => setLoginPassword(e.target.value)}
            />
          </div>
          <button className="authBtn">Sign In</button>

          <p className="form-links">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <p className="form-links">
            Forgot your password? <Link to="/password/forgot">Reset password</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
