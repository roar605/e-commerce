import { useEffect, useState } from 'react';
import '../Styles/UserStyles/Form.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { removeErrors, removeSuccess, resetPassword } from '../features/user/userSlice';
import { toast } from 'react-toastify';

function ResetPassword() {
    const { success, loading, error } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams();


    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const data = {
            password,
            confirmPassword
        }
        dispatch(resetPassword({ token, useData: data }));
    }
    //for checking the error
    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: "top-center", autoClose: 3000 });
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    //if its success
    useEffect(() => {
        if (success) {
            toast.success("Password updated successfully.", { position: "top-center", autoClose: 3000 });
            dispatch(removeSuccess());
            navigate("/login")
        }
    }, [dispatch, success]);

    return (
        <>
            {(<>
                <Navbar />
                <PageTitle title='Reset Password' />
                <div className="container update-container">
                    <div className="form-content">
                        <form className="form" onSubmit={resetPasswordSubmit}>
                            <h2>Reset Password</h2>
                            <div className="input-group">
                                <input type="password" name='password' placeholder='Enter your new password'
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="input-group">
                                <input type="password" name='confirmPassword' placeholder='Confirm Password'
                                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <button className="authBtn">Reset Password</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </>)}
        </>

    )
}

export default ResetPassword