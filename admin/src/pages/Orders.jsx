import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { db } from '../firebase';
import { doc, getDocs, collection, updateDoc } from 'firebase/firestore';
import '../App.css'

const Orders = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    // This state variable 'loading' is used to track the loading state of orders.
    // It is initialized as 'true' to indicate that orders are being fetched.
    // The 'setLoading' function is used to update the loading state.

    // This state variable 'orders' is used to store the fetched orders.
    // It is initialized as an empty array.
    // The 'setOrders' function is used to update the orders state.

    const fetchOrders = async () => {
        try {
            // Fetching the orders collection from the Firestore database
            const querySnapshot = await getDocs(collection(db, 'orders'));
            // Mapping the document data and adding an 'id' field to each order
            const orderData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            // Sorting the orderData array based on the 'date' field in ascending order
            orderData.sort((a, b) => new Date(a.date) - new Date(b.date));
            // Updating the orders state with the fetched and sorted order data
            setOrders(orderData);
            // Setting the loading state to 'false' to indicate that orders are loaded
            setLoading(false);
        } catch (error) {
            // Displaying an error message if there is an error fetching the orders
            alert('Error fetching orders');
            setLoading(false);
        }
    };

    // The 'fetchOrders' function is an asynchronous function that fetches the orders from the Firestore database.
    // It utilizes the 'getDocs' function to retrieve the documents in the 'orders' collection.
    // The fetched data is then mapped to an array of orders, including the 'id' field for each order.
    // The orderData array is sorted based on the 'date' field.
    // The 'setOrders' function is used to update the 'orders' state with the fetched and sorted data.
    // If there is an error during the fetch process, an error message is displayed and the loading state is set to 'false'.

    useEffect(() => {
        // This useEffect hook is used to fetch the orders when the component mounts.

        fetchOrders();
        // Invoking the 'fetchOrders' function to initiate the order fetching process.
        // Since the dependency array is empty, this will only run once when the component mounts.
    }, []);

    const rejectOrder = async (id) => {
        try {
            // Creating a reference to the specific order document using its 'uid'
            const orderRef = doc(db, 'orders', id);

            // Updating the 'rejected' field of the order document to 'true'
            await updateDoc(orderRef, { rejected: true });

            // Fetching the updated orders after rejecting an order
            fetchOrders();

            // Displaying a success message after rejecting the order
            alert('Order Rejected!');
        } catch (error) {
            // Displaying an error message if there is an error rejecting the order
            alert('Error rejecting order');
        }
    };

    // The 'rejectOrder' function is an asynchronous function that handles the rejection of an order.
    // It takes the 'uid' of the order as a parameter.
    // It creates a reference to the specific order document using the 'uid' and updates the 'rejected' field to 'true'.
    // After updating the order, it fetches the updated orders using the 'fetchOrders' function to reflect the changes.
    // If there is an error during the rejection process, an error message is displayed.

    const deliveredOrder = async (uid) => {
        try {
            // Creating a reference to the specific order document using its 'uid'
            const orderRef = doc(db, 'orders', uid);

            // Updating the 'delivered' field of the order document to 'true'
            await updateDoc(orderRef, { delivered: true });

            // Fetching the updated orders after marking an order as delivered
            fetchOrders();

            // Displaying a success message after delivering the order
            alert('Order Delivered!');
        } catch (error) {
            // Displaying an error message if there is an error marking the order as delivered
            alert(error.message);
        }
    };

    // The 'deliveredOrder' function is an asynchronous function that handles marking an order as delivered.
    // It takes the 'uid' of the order as a parameter.
    // It creates a reference to the specific order document using the 'uid' and updates the 'delivered' field to 'true'.
    // After updating the order, it fetches the updated orders using the 'fetchOrders' function to reflect the changes.
    // If there is an error during the delivery process, an error message is displayed.

    return (
        <section>
            <Container>
                <Row>
                    <div className='fs-2 text-center'><b>Existing Orders</b></div>
                    <Col log='12' className='pt-5 text-center'>
                        {loading ? (
                            <div className='text-center'>
                                <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt='loading' style={{ height: "200px", width: "200px", marginTop: "100px", marginBottom: "100px" }} />
                            </div>
                        ) : (
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Order Status</th>
                                        <th>Date</th>
                                        <th>Customer Name</th>
                                        <th>Total Amount</th>
                                        <th>Take Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>OD{order.orderid.substr(0, 8).toUpperCase()}</td>
                                            <td>{order.delivered ? 'Delivered' : order.rejected ? 'Rejected' : 'Pending'}</td>
                                            <td>{order.date ? order.date.substr(0, 10) : ''}</td>
                                            <td>{order.name}</td>
                                            <td>₹ {order.amount}</td>
                                            <td className='d-flex align-items-center justify-content-around'>
                                                <button
                                                    onClick={() => rejectOrder(order.orderid)}
                                                    className="btn btn-danger"
                                                    disabled={order.rejected || order.delivered}
                                                >
                                                    Reject
                                                </button>
                                                <button
                                                    onClick={() => deliveredOrder(order.orderid)}
                                                    className="btn btn-success"
                                                    disabled={order.delivered || order.rejected}
                                                >
                                                    Delivered
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Orders