import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import '../App.css'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            navigate("/")
        } catch (error) {
            alert(error.message);
        }
    };

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setEmail("");
            setPassword("");
            alert("Password reset email sent!");
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <div className="box container-fluid d-flex justify-content-center align-items-center" style={{ fontFamily: "'Poppins', sans-serif", maxWidth: "1200px", minHeight: "600px" }}>
            <div className="form-container col-md-6 px-4 pt-4 right-box">
                <div className="row align-items-center">
                    <div className="header-text mb-3">
                        <h2 className='text-primary bold-text'>Hello Admin!</h2>
                        <h4 className='text-primary bold-text'>Enter your credentials to manage your store.</h4>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control form-control-lg bg-light text-secondary fs-6" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group mb-1">
                        <input type="password" className="form-control form-control-lg bg-light text-secondary fs-6" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-group d-flex justify-content-end fs-6 mb-3">
                        <button className='btn btn-link text-secondary' onClick={handleResetPassword}>Forgot Password?</button>
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-lg btn-primary w-100 fs-5 bold-text" onClick={handleEmailSignIn}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login