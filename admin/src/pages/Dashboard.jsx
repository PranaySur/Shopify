import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { db } from '../firebase';
import { getDocs, collection } from 'firebase/firestore';
import '../styles/Dashboard.scss';

const Dashboard = () => {
    // State variables to store the counts
    const [productCount, setProductCount] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        // Function to fetch the counts from the database
        const fetchCount = async () => {
            try {
                // Fetch products count
                const productsSnapshot = await getDocs(collection(db, 'products'));
                const productsData = productsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProductCount(productsData.length);

                // Fetch users count
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const usersData = usersSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsersCount(usersData.length);

                // Fetch orders count and calculate total sales
                const ordersSnapshot = await getDocs(collection(db, 'orders'));
                const ordersData = ordersSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                // Filter out the orders where rejected is true
                const filteredOrdersData = ordersData.filter((order) => !order.rejected);

                // Calculate the total sales only for the filtered orders
                const sales = filteredOrdersData.reduce((total, order) => total + order.amount, 0);
                setTotalSales(sales / 100000);
                setOrdersCount(filteredOrdersData.length);
            } catch (error) {
                alert('Error fetching details');
            }
        };

        // Call the fetchCount function when the component mounts
        fetchCount();
    }, []);

    return (
        <>
            <section>
                <Container>
                    <Row>
                        {/* Title */}
                        <div className='fs-2 text-center pb-5'><b>Dashboard</b></div>

                        {/* Total Sales */}
                        <Col className='lg-3'>
                            <div className="revenue__box">
                                <h5>Total Sales</h5>
                                <span> ₹ {totalSales}L</span>
                            </div>
                        </Col>

                        {/* Orders */}
                        <Col className='lg-3'>
                            <div className="order__box">
                                <h5>Orders</h5>
                                <span>{ordersCount}</span>
                            </div>
                        </Col>

                        {/* Total Products */}
                        <Col className='lg-3'>
                            <div className="products__box">
                                <h5>Total Products</h5>
                                <span>{productCount}</span>
                            </div>
                        </Col>

                        {/* Total Users */}
                        <Col className='lg-3'>
                            <div className="users__box">
                                <h5>Total Users</h5>
                                <span>{usersCount}</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Dashboard;