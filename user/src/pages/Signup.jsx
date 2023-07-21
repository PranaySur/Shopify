import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as generateID } from 'uuid';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        // Check if the file is an image
        if (uploadedFile && uploadedFile.type.includes('image/')) {
            setFile(uploadedFile);
        } else {
            // Display an error message or perform any other desired action
            toast.error('Invalid file type. Please upload an image.');
        }
    };
    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        if (name === '') {
            toast.error("Please enter your name to sign up.");
            return;
        }
        if (file === null) {
            toast.error("Please Upload your profile picture.");
            return;
        }
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, generateID());
            await uploadBytesResumable(storageRef, file);
            const url = await getDownloadURL(storageRef);
            await updateProfile(res.user, {
                displayName: name,
                photoURL: url,
            });
            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: name,
                email,
                photoURL: url,
            });
            toast.success(`Hello ${name}!`);
            navigate("/");
        } catch (error) {
            const errorCode = error.code;
            let message = "";
            switch (errorCode) {
                case "auth/invalid-email":
                    message = "Invalid email address. Please enter a valid email.";
                    break;
                case "auth/email-already-in-use":
                    message = "The email address is already in use. Please use a different email.";
                    break;
                case "auth/operation-not-allowed":
                    message = "This operation is not allowed. Please contact support for assistance.";
                    break;
                case "auth/weak-password":
                    message = "The password is too weak. Please choose a stronger password.";
                    break;
                case "auth/too-many-requests":
                    message = "Too many requests. Please try again later.";
                    break;
                default:
                    message = "An error occurred. Please try again later.";
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
                        <input type="text" className="form-control form-control-lg bg-light text-secondary fs-6" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control form-control-lg bg-light text-secondary fs-6" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control form-control-lg bg-light text-secondary fs-6" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-group d-flex justify-content-end">
                        <label htmlFor="fileInput">
                            {!file && <p className='fs-5 text-dark py-2'><i class="ri-image-2-fill">Upload Image</i></p>}
                            {file && <p className='fs-5 text-primary py-2'><i class="ri-image-2-fill">Change Image</i></p>}
                        </label>
                        <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'none' }} />
                    </div>
                    <div className="input-group mb-4">
                        <button className="btn btn-lg btn-dark w-100 fs-5 bold-text" onClick={handleEmailSignUp}>Register</button>
                    </div>
                    <div class="row">
                        <p className='fs-6 text-center mb-3'>Already have an account? <Link to="/login">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup