import React, { useState, useContext, useEffect } from 'react'
import '../styles/cart.css'
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"
import { db } from '../firebase'
import { onSnapshot, getDoc, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import shoppingbag from "../assets/shopping-bag.png"

const Cart = () => {
    const { currentUser } = useContext(AuthContext);
    // State variables to manage loading state and cart items
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    // Function to calculate the total amount of products in the cart
    const calculateTotalAmount = () => {
        let sum = 0;
        cartItems.forEach(item => {
            sum += item.price * item.quantity;
        });
        return sum;
    };

    // Function to fetch the cart data from Firestore for the current user
    const fetchCart = async (id) => {
        try {
            setLoading(true);
            // Reference to the Firestore document that contains the cart data
            const cartDocRef = doc(db, "cart", id);
            // Set up a real-time snapshot listener to update the cartItems state
            const unsubscribe = onSnapshot(cartDocRef, (cartDocSnap) => {
                if (cartDocSnap.exists()) {
                    const cartData = cartDocSnap.data();
                    const cartItems = cartData.products;
                    setCartItems(cartItems);
                } else {
                    // If the cart document doesn't exist, set cartItems to an empty array
                    setCartItems([]);
                }
            });
            // Return the unsubscribe function to remove the snapshot listener when needed
            return () => unsubscribe();
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to decrease the quantity of a product in the cart
    const decreaseQty = async (productId) => {
        try {
            // Reference to the Firestore document that contains the cart data for the current user
            const cartDocRef = doc(db, "cart", currentUser.uid);
            const cartDocSnap = await getDoc(cartDocRef);
            if (cartDocSnap.exists()) {
                // Get the existing products array from the cart data
                const cartData = cartDocSnap.data();
                const existingProducts = cartData.products;
                // Find the product in the existing products array
                const product = existingProducts.find((p) => p.id === productId);
                if (product) {
                    // If the product is found, create a copy of the existing products array
                    const updatedProducts = [...existingProducts];
                    // Find the index of the product in the updated products array
                    const productIndex = updatedProducts.findIndex((p) => p.id === productId);
                    if (updatedProducts[productIndex].quantity === 1) {
                        // If the product quantity is 1, remove it from the cart
                        updatedProducts.splice(productIndex, 1);
                        toast.info('Product removed from Cart');
                    } else {
                        // If the product quantity is greater than 1, decrease the quantity by 1
                        updatedProducts[productIndex].quantity -= 1;
                        toast.info('Product quantity decreased');
                    }
                    // Update the Firestore document with the updated products array
                    await updateDoc(cartDocRef, { products: updatedProducts });
                } else {
                    toast.warning('Product not found in Cart');
                }
            } else {
                toast.warning('Cart is empty');
            }
        } catch (error) {
            toast.error("Oh no, something went wrong");
            console.error('Error decreasing quantity:', error);
        }
        // Fetch the updated cart data after decreasing the quantity
        fetchCart(currentUser.uid);
    };

    // Function to increase the quantity of a product in the cart
    const increaseQty = async (productId) => {
        try {
            // Reference to the Firestore document that contains the cart data for the current user
            const cartDocRef = doc(db, "cart", currentUser.uid);
            const cartDocSnap = await getDoc(cartDocRef);
            if (cartDocSnap.exists()) {
                // Get the existing products array from the cart data
                const cartData = cartDocSnap.data();
                const existingProducts = cartData.products;
                // Find the product in the existing products array
                const product = existingProducts.find((p) => p.id === productId);
                if (product) {
                    // If the product is found, create a copy of the existing products array
                    const updatedProducts = [...existingProducts];
                    // Find the index of the product in the updated products array
                    const productIndex = updatedProducts.findIndex((p) => p.id === productId);
                    // Increase the quantity by one
                    updatedProducts[productIndex].quantity += 1;
                    // Update the Firestore document with the updated products array
                    await updateDoc(cartDocRef, { products: updatedProducts });
                    toast.info('Product quantity increased');
                } else {
                    toast.warning('Product not found in Cart');
                }
            } else {
                toast.warning('Cart is empty');
            }
        } catch (error) {
            toast.error("Oh no, something went wrong");
            console.error('Error increasing quantity:', error);
        }
        // Fetch the updated cart data after increasing the quantity
        fetchCart(currentUser.uid);
    };

    // Fetch the cart data when the component mounts or when the currentUser changes
    useEffect(() => {
        fetchCart(currentUser.uid);
    }, [currentUser]);

    return (
        <>
            <CommonSection title='Shopping bag'></CommonSection>
            <section>
                {loading ? (
                    <div className='text-center'>
                        < img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" style={{ height: "200px", width: "200px", marginTop: "100px" }} />
                    </div>
                ) : (
                    <Container>
                        <Row>
                            <Col lg='9'>
                                {cartItems.length === 0 ? (
                                    <div className='text-center mb-5'>
                                        <div className='mb-4'>
                                            <img src={shoppingbag} alt="" style={{ maxWidth: "200px", height: "auto", marginTop: "100px" }} />
                                        </div>
                                        <div>
                                            <p className='fs-4'>
                                                Your cart is empty
                                            </p>
                                            <Link to='/shop'>
                                                <p className='fs-3'>Continue Shopping</p>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <table table className='table bordered text-center align-middle' >
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item) => (
                                                <tr key={item.id}>
                                                    <td><img src={item.imageURL} alt='' /></td>
                                                    <td>{item.title}</td>
                                                    <td> ₹ {item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>
                                                        <div>
                                                            <button className="cart_actions" onClick={() => increaseQty(item.id)}><i class="ri-add-line"></i></button>
                                                            <button className="cart_actions" onClick={() => decreaseQty(item.id)}><i class="ri-subtract-fill"></i></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </Col>
                            <Col lg='3'>
                                <div>
                                    <h6 className='d-flex align-items-center justify-content-between'>Subtotal
                                        <span className='fs-4 fw-bold'> ₹ {calculateTotalAmount()}</span></h6>
                                    <p className='fs-6 mt-2'>Taxes and shipping will be calculated while checking out</p>
                                    <div>
                                        <button className="buy__btn w-100">
                                            <Link to='/checkout'>Checkout</Link>
                                        </button>
                                        <button className="buy__btn w-100  mt-3">
                                            <Link to='/shop'>Continue Shopping</Link>
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )}
            </section>
        </>
    );
};

export default Cart;
