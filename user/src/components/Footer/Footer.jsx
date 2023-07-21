import React from 'react'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem, List } from 'reactstrap'
import { Link } from 'react-router-dom'
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg='4' md="12">
                        <div className="logo">
                            <div>
                                <h1 className='text-white'>Shopify</h1>
                            </div>
                        </div>
                        <p className='footer__text mt-4'>Revolutionize Your Shopping Experience with the Ultimate E-commerce Destination. Discover, Experience, and Shop in Style at the Ultimate Online Retail Haven!</p>
                    </Col>
                    <Col lg='2' md="3" sm='6'>
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">Customer Service</h4>
                            <ListGroup>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/'>FAQs</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/'>Returns & Exchanges</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/'>Shipping Information</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/'>Track Order</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg='2' md="3" sm='6'>
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">Useful Links</h4>
                            <ListGroup>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/'>About Us</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/'>Privacy Policy</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/'>Terms & Conditions</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/'>Careers</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg='2' md="3" sm='6'>
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">Website Links</h4>
                            <ListGroup>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/'>Home</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/shop'>Shop</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/favourites'>Favourites</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/cart'>Cart</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg='2' md="3" sm='6'>
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">Contact Us</h4>
                            <ListGroup className='footer__contact'>
                                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                                    <span><i class="ri-map-pin-line"></i></span>
                                    <p>Kolkata, West Bengal</p>
                                </ListGroupItem>

                                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                                    <span><i class="ri-phone-line"></i></span>
                                    <p>+91 9988776655</p>
                                </ListGroupItem>

                                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                                    <span><i class="ri-mail-line"></i></span>
                                    <p>contact@shopify.com</p>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg='12'>
                        <p className='footer__copyright'>&copy; {currentYear} Shopify. All rights reserved.</p>
                    </Col>
                    <Col className='footer__icons' lg='12'>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item px-2">
                                <Link to='https://leetcode.com/PranaySur/'><i class="ri-pages-fill"></i></Link>
                            </li>
                            <li className="list-inline-item px-2">
                                <Link to='https://github.com/PranaySur/'><i class="ri-github-fill"></i></Link>
                            </li>
                            <li className="list-inline-item px-2">
                                <Link to='https://www.linkedin.com/in/pranaysur/'><i className="ri-linkedin-fill"></i></Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer