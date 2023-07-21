import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from "./AuthContext"
import './App.css';
import Dashboard from './pages/Dashboard';
import AllProducts from './pages/AllProducts';
import AddProduct from './pages/AddProduct';
import Login from './pages/Login';
import Users from './pages/Users';
import Orders from './pages/Orders'
import Admin from './pages/Admin'
import Footer from './pages/Footer';

function App() {
    const { currentUser } = useContext(AuthContext);
    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <>
            <Admin />
            <div style={{ minHeight: `calc(100vh - 170px)` }}>
                <Routes>
                    <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='all-products' element={<ProtectedRoute><AllProducts /></ProtectedRoute>} />
                    <Route path='add-product' element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
                    <Route path='orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                    <Route path='users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
                    <Route path='/*' element={<Login />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;