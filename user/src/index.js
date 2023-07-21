import React from "react";
import ReactDOM from "react-dom/client";
import 'remixicon/fonts/remixicon.css'
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <BrowserRouter>
                <ToastContainer theme="dark" position="top-right" autoClose={1500} closeOnClick pauseOnHover={false} />
                <App />
            </BrowserRouter>
        </AuthContextProvider>
    </React.StrictMode>
);