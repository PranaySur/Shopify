import React, { useRef, useContext } from 'react';
import '../styles/Admin.scss'
import { motion } from 'framer-motion'
import userIcon from '../user-icon.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from "../AuthContext"

// An array of navigation links to be displayed in the admin header
const nav__links = [
    {
        display: 'Listed Products',
        path: '/all-products'
    },
    {
        display: 'List New Product',
        path: '/add-product'
    },
    {
        display: 'Existing Orders',
        path: '/orders'
    },
    {
        display: 'Registered Users',
        path: '/users'
    }
]

const Admin = () => {
    // Create a reference for the profile action element
    const profileActionRef = useRef(null);
    // A hook to navigate to different routes
    const navigate = useNavigate()
    // Access the current user from the AuthContext
    const { currentUser } = useContext(AuthContext);

    // Function to handle user logout
    const logout = () => {
        signOut(auth).then(() => {
            console.error('Logged out')
            // Navigate to the home route after successful logout
            navigate('/home')
        }).catch((err) => {
            console.error(err.message)
        })
    }

    // Function to toggle the visibility of profile actions dropdown
    const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions');

    return (
        <header className="header sticky__header">
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <div className="logo">
                            {/* Link to the home route */}
                            <Link to="/"><h1>Shopify</h1></Link>
                        </div>
                        <div className="navigation">
                            {currentUser ? <ul className="menu">
                                {
                                    // Render navigation links using the nav__links array
                                    nav__links.map((item, index) => (
                                        <li className='nav__item' key={index}>
                                            {/* NavLink component to handle navigation */}
                                            <NavLink to={item.path} className={(navClass) =>
                                                navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink>
                                        </li>
                                    ))}
                            </ul> : <div className="empty_cell">.</div>
                            }
                        </div>
                        <div className="nav__icons">
                            <div className='profile'>
                                <motion.img
                                    src={currentUser?.photoURL ? currentUser.photoURL : userIcon}
                                    whileTap={{ scale: 1.2 }} alt=" "
                                    onClick={toggleProfileActions}
                                    style={{ width: "40px", height: "40px" }}>
                                </motion.img>

                                <div className="profile__actions"
                                    ref={profileActionRef}
                                    onClick={toggleProfileActions}>
                                    <span onClick={logout}>Logout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    )
}

export default Admin