import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer py-3" style={{ backgroundColor: '#0a1d37', color: 'white' }}>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item px-2">
                                <Link to='https://github.com/PranaySur/'><i class="uil uil-github" style={{ fontSize: '30px' }}></i></Link>
                            </li>
                            <li className="list-inline-item px-2">
                                <Link to='https://www.linkedin.com/in/pranaysur/'><i class="uil uil-linkedin" style={{ fontSize: '30px' }}></i></Link>
                            </li>
                            <li className="list-inline-item px-2">
                                <Link to='https://leetcode.com/PranaySur/'><i class="uil uil-link" style={{ fontSize: '30px' }}></i></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <p>
                            &copy; {new Date().getFullYear()} Shopify. Made with <i class="uil uil-heart"  style={{ fontSize: '15px' }}></i> by Pranay Sur
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;