import React, { useState, useContext, useEffect } from 'react'
import CommonSection from '../components/UI/CommonSection';
import { Container, Row } from 'reactstrap';
import { db } from '../firebase'
import { onSnapshot, doc } from 'firebase/firestore';
import { AuthContext } from "../context/AuthContext"
import ProductsList from '../components/UI/ProductsList'
import { Link } from 'react-router-dom';
import shoppingbag from "../assets/shopping-bag.png"

const Favourites = () => {
    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const fetchFavourites = async (id) => {
        setLoading(true);
        try {
            const favouriteDocRef = doc(db, "favourites", id);
            // Use onSnapshot to listen for real-time changes to the document
            const unsubscribe = onSnapshot(favouriteDocRef, (favouriteDocSnap) => {
                if (favouriteDocSnap.exists()) {
                    const favouriteData = favouriteDocSnap.data();
                    const products = favouriteData.products;
                    setProducts(products);
                } else {
                    setProducts([]);
                }
                setLoading(false);
            });
            // Return a function to unsubscribe from the snapshot listener when component unmounts
            return () => unsubscribe();
        } catch (error) {
            console.log('Error fetching favourites');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavourites(currentUser.uid);
    }, [currentUser]);

    return (
        <>
            <CommonSection title='wishlist'></CommonSection>
            <section className='pt-0'>
                {loading ? (
                    <div className='text-center'>
                        < img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" style={{ height: "200px", width: "200px", marginTop: "100px" }} />
                    </div>
                ) : (
                    <Container>
                        <Row>
                            {products.length === 0 ?
                                <div className='text-center'>
                                    <div className='mb-4'>
                                        <img src={shoppingbag} alt="" style={{ maxWidth: "200px", height: "auto", marginTop: "100px" }} />
                                    </div>
                                    <div>
                                        <p className='fs-4'>
                                            No liked items
                                        </p>
                                        <Link to='/shop'>
                                            <p className='fs-3'>Continue Shopping</p>
                                        </Link>
                                    </div>
                                </div> : <ProductsList data={products}></ProductsList>
                            }
                        </Row>
                    </Container>
                )}
            </section>
        </>
    )
}

export default Favourites