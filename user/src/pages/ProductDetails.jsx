import React, { useState, useContext, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { getDocs, doc, updateDoc, getDoc, setDoc, collection, query, limit, where } from 'firebase/firestore';
import { AuthContext } from "../context/AuthContext"
import '../styles/product-details.css';
import { motion } from 'framer-motion';
import { db } from '../firebase'
import { toast } from 'react-toastify';
import ProductsList from '../components/UI/ProductsList'

const ProductDetails = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { id } = useParams()

    useEffect(() => {
        const getProduct = async () => {
            const docRef = doc(db, 'products', id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setProduct(docSnap.data())
                const querySnapshot = await getDocs(query(collection(db, 'products'), where('category', '==', docSnap.data().category), limit(4)));
                const productsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setRelatedProducts(productsData);
            } else {
                navigate('/');
                console.log('no product')
            }
        }
        getProduct()
    }, [])
    const { title, price, imageURL, description, category } = product;

    const addFavourite = async () => {
        if (!currentUser) {
            toast.info("You need to log in first");
            return;
        }
        try {
            const favouriteDocRef = doc(db, "favourites", currentUser.uid);
            const favouriteDocSnap = await getDoc(favouriteDocRef);

            if (favouriteDocSnap.exists()) {
                const favouriteData = favouriteDocSnap.data();
                const existingProducts = favouriteData.products;

                // Check if the product's id already exists in the array
                const duplicateIndex = existingProducts.findIndex(existingProduct => existingProduct.id === product.id);

                if (duplicateIndex !== -1) {
                    // Remove the duplicate product from the array
                    const updatedProducts = existingProducts.filter((_, index) => index !== duplicateIndex);
                    await updateDoc(favouriteDocRef, { products: updatedProducts });
                    toast.info('Removed from favourites');
                } else {
                    const updatedProducts = [...existingProducts, product];
                    await updateDoc(favouriteDocRef, { products: updatedProducts });
                    toast.success('Added to favourites');
                }
            } else {
                await setDoc(favouriteDocRef, { products: [product] });
                toast.success('Added to favourites');
            }
        } catch (error) {
            toast.error("Oh no, Something went wrong");
            console.error(error.message);
        }
    };

    const addToCart = async () => {
        if (!currentUser) {
            toast.info("You need to log in first");
            return;
        }
        try {
            const cartDocRef = doc(db, "cart", currentUser.uid);
            const cartDocSnap = await getDoc(cartDocRef);
            if (cartDocSnap.exists()) {
                const cartData = cartDocSnap.data();
                const existingProducts = cartData.products;

                // Check if the item already exists in the cart
                const existingItemIndex = existingProducts.findIndex(
                    (p) => p.id === product.id
                );

                if (existingItemIndex !== -1) {
                    // If the item exists, update the quantity
                    const updatedProducts = [...existingProducts];
                    updatedProducts[existingItemIndex].quantity += 1;
                    await updateDoc(cartDocRef, { products: updatedProducts });
                    toast.info('Quantity increased by 1');
                } else {
                    // If the item does not exist, add it to the cart with quantity 1
                    const updatedProducts = [...existingProducts, { ...product, quantity: 1 }];
                    await updateDoc(cartDocRef, { products: updatedProducts });
                    toast.success('Added to Cart');
                }
            } else {
                // If the cart does not exist, create it with the item and quantity 1
                await setDoc(cartDocRef, { products: [{ ...product, quantity: 1 }] });
                toast.success('Added to Cart');
            }
        } catch (error) {
            toast.error("Oh no, Something went wrong");
            console.error(error.message);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [product])
    return (
        <>
            <section className='pt-0'>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <img src={imageURL} alt='' />
                        </Col>

                        <Col lg='6'>
                            <div className="product__details">
                                <h2>{title}</h2>
                                <div className="product__rating d-flex align-items-center gap-5 md-3">
                                    <div>
                                        <span>
                                            <i class="ri-star-s-fill"></i></span>
                                        <span>
                                            <i class="ri-star-s-fill"></i></span>
                                        <span>
                                            <i class="ri-star-s-fill"></i></span>
                                        <span>
                                            <i class="ri-star-s-fill"></i></span>
                                        <span>
                                            <i class="ri-star-half-s-line"></i></span>
                                    </div>
                                </div>
                                <div>
                                    <span className='product__price d-flex align-items-center gap-5'> ₹ {price}</span>
                                    <span>Category : {category}</span>
                                </div>
                                <p className='mt-3'>{description}</p>
                                <div>
                                    <motion.button
                                        whileTap={{ scale: 1.2 }}
                                        style={{ marginRight: "10px" }}
                                        className="buy__btn" onClick={addFavourite}>Favourite
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 1.2 }}
                                        className="buy__btn" onClick={addToCart}>Add to Cart
                                    </motion.button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="bestsellers">
                <Container>
                    <Row>
                        <Col lg='12' className='text-center'>
                            <h2 className="related__title">Our Other Products</h2>
                        </Col>
                        <ProductsList data={relatedProducts} />
                    </Row>
                </Container>
            </section>
        </>
    )
};

export default ProductDetails