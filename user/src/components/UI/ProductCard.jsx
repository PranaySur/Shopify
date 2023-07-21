import React, { useContext } from 'react'
import { motion } from 'framer-motion';
import '../../styles/product-card.css';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../firebase'
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { AuthContext } from "../../context/AuthContext"

const ProductCard = ({ item }) => {
    const { currentUser } = useContext(AuthContext);
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
                const duplicateIndex = existingProducts.findIndex(existingProduct => existingProduct.id === item.id);
                if (duplicateIndex !== -1) {
                    // Remove the duplicate product from the array
                    const updatedProducts = existingProducts.filter((_, index) => index !== duplicateIndex);
                    await updateDoc(favouriteDocRef, { products: updatedProducts });
                    toast.info('Product removed from favourites!');
                } else {
                    const updatedProducts = [...existingProducts, item];
                    await updateDoc(favouriteDocRef, { products: updatedProducts });
                    toast.success('Product added to favourites!');
                }
            } else {
                await setDoc(favouriteDocRef, { products: [item] });
                toast.success('Product added to favourites!');
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
                    (product) => product.id === item.id
                );
                if (existingItemIndex !== -1) {
                    // If the item exists, update the quantity
                    const updatedProducts = [...existingProducts];
                    updatedProducts[existingItemIndex].quantity += 1;
                    await updateDoc(cartDocRef, { products: updatedProducts });
                    toast.info('Quantity increased by 1');
                } else {
                    // If the item does not exist, add it to the cart with quantity 1
                    const updatedProducts = [...existingProducts, { ...item, quantity: 1 }];
                    await updateDoc(cartDocRef, { products: updatedProducts });
                    toast.success('Added to Cart');
                }
            } else {
                // If the cart does not exist, create it with the item and quantity 1
                await setDoc(cartDocRef, { products: [{ ...item, quantity: 1 }] });
                toast.success('Added to Cart');
            }
        } catch (error) {
            toast.error("Oh no, Something went wrong");
            console.error(error.message);
        }
    };

    return (
        <Col lg='3' md='4' className='px-5 py-5'>
            <div className="product__item">
                <div className="product__img" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Link to={`/shop/${item.id}`}>
                        <motion.img whileHover={{ scale: 0.9 }} src={item.imageURL} alt="" style={{ height: "200px", width: "auto" }} />
                    </Link>
                </div>
                <div className='p-2 product__info'>
                    <h3 className="product__name"><Link to={`/shop/${item.id}`}>{item.title}</Link></h3>
                    <span>{item.category}</span>
                </div>
                <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
                    <span className="price"> ₹ {item.price}</span>
                    <div>
                        <motion.span whileHover={{ scale: 1.2 }} onClick={addFavourite}>
                            <i class="ri-heart-line mx-3"></i>
                        </motion.span>
                        <motion.span whileHover={{ scale: 1.2 }} onClick={addToCart}>
                            <i class="ri-add-line"></i>
                        </motion.span>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default ProductCard