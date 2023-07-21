import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import heroImg from '../assets/hero.png';
import { db } from "../firebase";
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/home.css'
import ProductsList from '../components/UI/ProductsList';
import counterImg from '../assets/timer-img.png';
import Clock from '../components/UI/Clock'

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [firstProducts, setFirstProducts] = useState([]);
    const [nextProducts, setNextProducts] = useState([]);
    // Array containing service data
    const serviceData = [
        {
            icon: "ri-truck-line",
            title: "Free Shipping",
            subtitle: "Members get items delivered for free at their doorstep.",
            bg: "#fdefe6",
        },
        {
            icon: "ri-refresh-line",
            title: "Easy Returns",
            subtitle: "Return your purchases hassle-free within 30 days.",
            bg: "#ceebe9",
        },
        {
            icon: "ri-secure-payment-line",
            title: "Secure Payment",
            subtitle: "Shop with confidence using our secure payment methods.",
            bg: "#e2f2b2",
        },
        {
            icon: "ri-exchange-dollar-line",
            title: "Money Back Guarantee",
            subtitle: "If you're not satisfied, we'll refund your money.",
            bg: "#d6e5fb",
        },
    ];
    useEffect(() => {
        // Function to fetch products
        const fetchProducts = async () => {
            try {
                // Query products from Firestore, ordered by price in descending order and limited to 12 products
                const querySnapshot = await getDocs(
                    query(
                        collection(db, 'products'),
                        orderBy('price', 'desc'),
                        limit(12)
                    )
                );
                // Map the retrieved documents to product objects
                const products = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                // Split the products into two sets: first eight and next eight
                const firstEight = products.slice(0, 4);
                const nextEight = products.slice(4, 12);
                // Set the state variables with the retrieved products
                setFirstProducts(firstEight);
                setNextProducts(nextEight);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching products:', error);
            }
        };
        // Call the fetchProducts function when the component mounts
        fetchProducts();
    }, []);

    return (
        <>
            <section className='hero__section d-flex'>
                <Container>
                    <Row>
                        <Col lg='6' md='6'>
                            <div className="hero__content">
                                <h2 className='text-white'>Your one stop shopping destination!</h2>
                                <p className='text-white'>Welcome to our Online Retail Haven - Where Shopping Comes Alive! Discover, Shop, and Experience the Best in Fashion, Gadgets, Home Decor, and More. Join us for a Seamless Shopping Journey and Unleash Your Retail Dreams Today!</p>
                                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn" ><Link to='/shop'><b>Explore Store</b></Link></motion.button>
                            </div>
                        </Col>

                        <Col lg='6' md='6'>
                            <div className="hero__img">
                                <img src={heroImg} alt=''></img>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="services">
                <Container>
                    <Row>
                        {serviceData.map((item, index) => (
                            <Col lg="3" md='4' key={index}>
                                <motion.div whileHover={{ scale: 1.1 }} className='service__item' style={{ background: `${item.bg}` }}>
                                    <span>
                                        <i class={item.icon}></i>
                                    </span>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.subtitle}</p>
                                    </div>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            <section className="bestsellers">
                {loading ? (
                    <div className='text-center'>
                        < img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt='' style={{ height: "100px", width: "100px" }} />
                    </div>
                ) : (
                    <Container>
                        <Row>
                            <Col lg='12' className='text-center'>
                                <h2 className="section__title">BESTSELLERS</h2>
                            </Col>
                            <ProductsList data={firstProducts} />
                        </Row>
                    </Container>
                )}
            </section>
            <section className="timer__count">
                <Container>
                    <Row>
                        <Col lg='6' md='12' className='count__down-col'>
                            <div className="clock__top-content">
                                <h4 className='text-white fs-4 mb-2'>Limited time offer</h4>
                                <h3 className='text-white fs-5 mb-3'>Grab now</h3>
                            </div>
                            <Clock></Clock>
                        </Col>
                        <Col lg='6' md='12' className='text-center counter__img'>
                            <img src={counterImg} alt=''></img>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="trending__products">
                {loading ? (
                    <div className='text-center'>
                        < img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt='' style={{ height: "100px", width: "100px" }} />
                    </div>
                ) : (
                    <Container>
                        <Row>
                            <Col lg='12' className='text-center'>
                                <h2 className="section__title">TRENDING NOW</h2>
                            </Col>
                            <ProductsList data={nextProducts} />
                        </Row>
                    </Container>
                )}
            </section>
        </>
    )
}

export default Home