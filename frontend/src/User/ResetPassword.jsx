import { useState } from 'react';
import '../Styles/UserStyles/Form.css'

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const data = {
            password,
            confirmPassword
        }
        console.log(data);

    }

    return (
        <>
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
        </>
    )
}

export default ResetPassword