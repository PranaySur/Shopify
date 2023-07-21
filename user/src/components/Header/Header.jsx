import React, { useRef, useContext } from 'react';
import './header.css'
import { motion } from 'framer-motion'
import userIcon from '../../assets/user-icon.png'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import { toast } from 'react-toastify'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext } from "../../context/AuthContext"

const Header = () => {
    const navigate = useNavigate(); // Hook from react-router-dom for navigation
    const { currentUser } = useContext(AuthContext); // Access the current user from the AuthContext
    const profileActionRef = useRef(null); // Ref for the profile actions dropdown
    const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions'); // Toggle the visibility of profile actions dropdown
    const logout = () => {
        signOut(auth).then(() => {
            toast.success('Logged out'); // Show success toast notification
            navigate('/'); // Navigate to the home page
        }).catch((err) => {
            toast.error(err.message); // Show error toast notification
        });
    };
    return (
        <header className="header sticky__header">
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <div className="logo">
                            <Link to="/"><h1>Shopify</h1></Link> {/* Render the logo and link it to the homepage */}
                        </div>
                        <div className="nav__icons">
                            <span className="fav__icon">
                                <Link to='/favourites'><i class="ri-heart-line"></i></Link>
                            </span>
                            <span className="cart__icon">
                                <Link to='/cart'><i class="ri-shopping-cart-line"></i></Link>
                            </span>
                            <div className='profile'>
                                <motion.img
                                    src={currentUser ? currentUser.photoURL : userIcon}
                                    whileTap={{ scale: 1.2 }} alt=" "
                                    onClick={toggleProfileActions}>
                                </motion.img> {/* Render the user profile image and apply tap animation */}
                                <div className="profile__actions"
                                    ref={profileActionRef}
                                    onClick={toggleProfileActions}>
                                    {currentUser ? ( // Check if the user is logged in
                                        // Render the profile actions for logged-in users
                                        <div className='d-flex align-items-center justify-content-center flex-column'>
                                            <Link to='/'>Home</Link>
                                            <Link to='/shop'>Shop</Link>
                                            <Link to='/cart'>Cart</Link>
                                            <Link to='/favourites'>Favourites</Link>
                                            <Link to='/orders'>Orders</Link>
                                            <button onClick={logout}>Logout</button>
                                        </div>
                                    ) : (
                                        // Render the profile actions for non-logged-in users
                                        <div className='d-flex align-items-center justify-content-center flex-column'>
                                            <Link to='/register'>Register</Link>
                                            <Link to='/login'>Login</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    )
}

export default Header