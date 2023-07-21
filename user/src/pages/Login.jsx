import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";

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
            toast.success("Welcome back!");
            navigate("/")
        } catch (error) {
            const errorCode = error.code;
            let message = '';
            switch (errorCode) {
                case 'auth/invalid-email':
                    message = 'Invalid email address. Please enter a valid email.';
                    break;
                case 'auth/user-not-found':
                    message = 'User not found. Please check your email or sign up for a new account.';
                    break;
                case 'auth/wrong-password':
                    message = 'Incorrect password. Please try again.';
                    break;
                case 'auth/invalid-credential':
                    message = 'Invalid credential. Please check your email and password.';
                    break;
                case 'auth/too-many-requests':
                    message = 'Too many requests. Please try again later.';
                    break;
                case 'auth/user-disabled':
                    message = 'The user account has been disabled. Please contact support for assistance.';
                    break;
                default:
                    message = 'An error occurred. Please try again later.';
                    break;
            }
            toast.error(message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                toast.success(`Welcome back ${user.displayName}!`);
            } else {
                const { displayName, email, photoURL } = user;
                const userRef = collection(db, "users");
                await setDoc(doc(userRef, user.uid), {
                    uid: user.uid,
                    displayName,
                    email,
                    photoURL,
                });
                toast.success(`Hello ${user.displayName}!`);
            }
            navigate("/");
        } catch (error) {
            let message = 'An error occurred. Please try again later.';
            switch (error.code) {
                case 'auth/too-many-requests':
                    message = 'Too many requests. Please try again later.';
                    break;
                case 'auth/popup-closed-by-user':
                    message = 'The sign-in popup was closed. Please try again.';
                    break;
                default:
                    message = 'An error occurred. Please try again later.';
                    break;
            }
            toast.error(message);
        }
    };

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setEmail("");
            setPassword("");
            toast.success("Password reset email sent!");
        } catch (error) {
            let message = 'An error occurred. Please try again later.';
            switch (error.code) {
                case 'auth/missing-email':
                    message = 'Enter your E-Mail Address.';
                    break;
                case 'auth/invalid-email':
                    message = 'Invalid email address. Please enter a valid email.';
                    break;
                case 'auth/user-not-found':
                    message = "User doesn't exist! Please sign up.";
                    break;
                case 'auth/too-many-requests':
                    message = 'Too many requests. Please try again later.';
                    break;
                default:
                    message = 'An error occurred. Please try again later.';
                    break;
            }
            toast.error(message);
        }
    };


    return (
        <div className="box container-fluid d-flex justify-content-center align-items-center" style={{ maxWidth: "1200px", minHeight: "600px" }}>
            <div className="form-container col-md-6 px-4 pt-4 right-box">
                <div className="row align-items-center">
                    <div className="header-text mb-4">
                        <h2 className='text-dark bold-text mb-2'>Welcome Back!</h2>
                        <h4 className='text-dark bold-text'>Enter your credentials to access your account.</h4>
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
                        <button className="btn btn-lg btn-dark w-100 fs-5 bold-text" onClick={handleEmailSignIn}>Sign In</button>
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-lg btn-light text-dark w-100 fs-6" onClick={handleGoogleSignIn}>
                            <span className='fs-5 bold-text'>Sign In with <i class="ri-google-fill"></i></span>
                        </button>
                    </div>
                    <div class="row">
                        <p className='fs-6 text-center mb-3'>Don't have an account? <Link to="/register">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login