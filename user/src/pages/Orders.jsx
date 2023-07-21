import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { db } from '../firebase'
import shoppingbag from "../assets/shopping-bag.png"
import { getDocs, doc, collection, updateDoc } from 'firebase/firestore';
import { AuthContext } from "../context/AuthContext"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Orders = () => {
    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async (id) => {
        try {
            // Fetching the orders collection from the Firestore database
            const querySnapshot = await getDocs(collection(db, 'orders'));
            // Mapping the document data and adding an 'id' field to each order
            const orderData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            // Filtering orders based on the specified ID
            const filteredOrders = orderData.filter((order) => order.userid === id);
            // Updating the orders state with the filtered order data
            setOrders(filteredOrders);
            // Setting the loading state to 'false' to indicate that orders are loaded
            setLoading(false);
        } catch (error) {
            // Displaying an error message if there is an error fetching the orders
            alert('Something went wrong!');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(currentUser.uid);
    }, [currentUser]);

    const rejectOrder = async (id) => {
        try {
            const orderRef = doc(db, 'orders', id);
            await updateDoc(orderRef, { rejected: true });
            fetchOrders(currentUser.uid);
            toast.error('Order Cancelled!');
        } catch (error) {
            alert('Something went wrong!');
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <div className='fs-2 text-center'><b>Order History</b></div>
                    <Col log='12' className='pt-5 text-center'>
                        {loading ? (
                            <div className='text-center'>
                                <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt='loading' style={{ height: "100px", width: "100px", marginTop: "100px", marginBottom: "100px" }} />
                            </div>
                        ) : (
                            <>
                                {orders.length === 0 ? (
                                    <div className='text-center'>
                                        <div className='mb-4'>
                                            <img src={shoppingbag} alt="" style={{maxWidth: "200px", height: "auto"}} />
                                        </div>
                                        <div>
                                            <p className='fs-4'>
                                                You are yet to place an order with us
                                            </p>
                                            <Link to='/shop'>
                                                <p className='fs-3'>Continue Shopping</p>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <table table className='table' >
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Order Status</th>
                                                <th>Date</th>
                                                <th>Total Amount</th>
                                                <th>Cancel</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order.id}>
                                                    <td>OD{order.id.substr(0, 8).toUpperCase()}</td>
                                                    <td>{order.delivered ? 'Delivered' : order.rejected ? 'Cancelled' : 'Pending'}</td>
                                                    <td>{order.date ? order.date.substr(0, 10) : ''}</td>
                                                    <td>₹ {order.amount}</td>
                                                    <td className='d-flex align-items-center justify-content-around'>
                                                        <button onClick={() => rejectOrder(order.orderid)} className="btn btn-danger" disabled={order.rejected || order.delivered}>
                                                            Cancel
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Orders