import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import '../Styles/UserStyles/Form.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { removeErrors, removeSuccess } from '../features/user/userSlice'

function ForgotPassword() {
    const { loading, error, success, message } = useSelector(state => state.user);
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const forgotPasswordEmail = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('email', email);
        dispatch(ForgotPassword(myForm))
        setEmail("")
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
        }
    }, [dispatch, success]);
    return (<>

        {loading ? <Loader /> : (<>
            <PageTitle title="Forgot Password" />
            <Navbar />

            <div className="container forgot-container">
                <div className="form-content email-group">
                    <form className="form" onSubmit={forgotPasswordEmail}>
                        <h2>Forgot Password</h2>
                        <div className="input-group">
                            <input type='email' placeholder='Enter your email' name='email'
                                value={email} onChange={(e) => setEmail(e.target.value)} />

                        </div>
                        <button className='authBtn'>Send</button>
                    </form>
                </div>
            </div>


            <Footer />
        </>)}
    </>)
}

export default ForgotPassword