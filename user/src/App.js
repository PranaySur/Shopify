import React, { useContext } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from "./context/AuthContext"
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Favourites from './pages/Favourites'
import Orders from './pages/Orders'
import "./App.css";

function App() {
    const ProtectedRoute = () => {
        const { currentUser } = useContext(AuthContext);
        return currentUser ? <Outlet /> : <Navigate to='/login' />
    }
    return (
        <>
            <Header />
            <div>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Signup />} />
                    <Route path='shop' element={<Shop />} />
                    <Route path='shop/:id' element={<ProductDetails />} />
                    <Route path="/*" element={<ProtectedRoute />}>
                        <Route path='cart' element={<Cart />} />
                        <Route path='favourites' element={<Favourites />} />
                        <Route path='orders' element={<Orders />} />
                        <Route path='checkout' element={<Checkout />} />
                    </Route>
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;