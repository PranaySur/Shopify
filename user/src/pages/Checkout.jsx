import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import CommonSection from '../components/UI/CommonSection';
import { v4 as generateID } from 'uuid';
import '../styles/checkout.css';
import { db } from '../firebase'
import { setDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { AuthContext } from "../context/AuthContext"

const Checkout = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState(0);
    const [state, setState] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    const fillDemo = () => {
        setName('Guest');
        setEmail('guest@shopify.com');
        setPhoneNumber(9988776655);
        setStreetAddress('Raja S.C. Mallick Road, Jadavpur');
        setCity('Kolkata');
        setState('West Bengal');
        setPincode(700032);
    }

    const fetchCart = async () => {
        try {
            const cartDocRef = doc(db, "cart", currentUser.uid);
            const cartDocSnap = await getDoc(cartDocRef);
            if (cartDocSnap.exists()) {
                const cartData = cartDocSnap.data();
                const cartItems = cartData.products;
                const formattedCartItems = cartItems.map(item => {
                    const { id, quantity } = item;
                    return { id, quantity };
                });
                setCartItems(formattedCartItems);
                let sum = 0;
                cartItems.forEach(item => {
                    sum += item.price * item.quantity;
                });
                setTotalAmount(sum);
                setLoading(false);
            } else {
                setCartItems([]);
                setLoading(false);
            }
        } catch (error) {
            toast.error('Error fetching cart');
            setLoading(false);
        }
    };

    const handleOrder = async (e) => {
        e.preventDefault();
        if (totalAmount < 1000) {
            toast.success('Minimum order value is 1000');
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const id = generateID();
            const date = new Date().toISOString();
            const address = {
                name,
                email,
                phoneNumber,
                streetAddress,
                city,
                state,
                pincode
            };
            if (Object.values(address).some(value => value === '')) {
                toast.error('Please fill in all address fields');
                setLoading(false);
                return;
            }
            const docRef = doc(db, "orders", id);
            await setDoc(docRef, {
                userid: currentUser.uid,
                orderid: id,
                name: currentUser.displayName,
                email: currentUser.email,
                address,
                date,
                order: cartItems,
                amount: totalAmount,
                rejected: false,
                delivered: false
            });
            const cartDocRef = doc(db, "cart", currentUser.uid);
            await deleteDoc(cartDocRef);
            toast.success('Order Placed!');
            navigate('/');
        } catch (error) {
            setLoading(false);
            const errorMessage = error.message || 'Order not placed';
            toast.error(errorMessage);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <>
            <CommonSection title='Checkout'></CommonSection>
            <section>
                {loading ? (
                    <div className='text-center'>
                        < img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" style={{ height: "50px", width: "50px" }} />
                    </div>
                ) : (
                    <Container>
                        <Row>
                            <Col lg='8'>
                                <h3 className="mb-4 fw-bold">Billing information</h3>
                                <Form className='billing__form'>
                                    <FormGroup>
                                        <Input type='text' required placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type='email' required placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type='number' required placeholder='Phone Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type='text' required placeholder='Street Address' value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type='text' required placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type='text' required placeholder='State' value={state} onChange={(e) => setState(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type='number' required placeholder='pincode' value={pincode} onChange={(e) => setPincode(e.target.value)} />
                                    </FormGroup>
                                </Form>
                                <button className='buy__btn mb-5' onClick={fillDemo}>Fill demo details</button>
                            </Col>
                            <Col lg='4'>
                                <div className="checkout__cart">
                                    <h5 className='mb-3'>Price Details</h5>
                                    <h6>Cart Total: <span>₹ {totalAmount}</span></h6>
                                    <h6>
                                        Shipping:
                                        <br />
                                        free shipping <span>₹ 0</span>
                                    </h6>
                                    <h4>Total Amount: <span>₹ {totalAmount}</span></h4>
                                    <button className="buy__btn auth__btn w-100 fs-4" onClick={handleOrder}>Place Order</button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )}
            </section>
        </>
    )
};

export default Checkout