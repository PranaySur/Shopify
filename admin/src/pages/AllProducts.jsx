import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { db } from '../firebase';
import { doc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import '../App.css';

const AllProducts = () => {
    // State variables for loading state and products data
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    // Fetch products data from Firestore when the component mounts
    const fetchProducts = async () => {
        try {
            // Get all documents from the 'products' collection in Firestore
            const querySnapshot = await getDocs(collection(db, 'products'));
            // Map the query snapshot to an array of products
            const productsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            // Set the products state variable with the fetched data
            setProducts(productsData);
            setLoading(false);
        } catch (error) {
            alert('Error fetching products');
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch products data from Firestore when the component mounts
        fetchProducts();
    }, []);

    // Function to delete a product
    const deleteProduct = async (productId) => {
        try {
            // Create a reference to the specific product document in Firestore
            const productRef = doc(db, 'products', productId);
            // Delete the product document from Firestore
            await deleteDoc(productRef);
            fetchProducts();
            alert('Product successfully deleted!');
        } catch (error) {
            alert('Error deleting product');
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <div className='fs-2 text-center'><b>Listed Products</b></div>
                    <Col log='12' className='pt-5 text-center'>
                        {/* Display the loading indicator if the data is still loading */}
                        {loading ? (
                            <div className='text-center'>
                                <img
                                    src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
                                    alt='n'
                                    style={{ height: "200px", width: "200px", marginTop: "100px", marginBottom: "100px" }}
                                />
                            </div>
                        ) : (
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Map through the products array and render each product as a table row */}
                                    {products.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                <img src={item.imageURL} alt='' style={{ width: "60px", height: "40px" }} />
                                            </td>
                                            <td>{item.title}</td>
                                            <td>{item.category.toUpperCase()}</td>
                                            <td>₹ {item.price}</td>
                                            <td>
                                                {/* Button to delete a product */}
                                                <button onClick={() => {
                                                    deleteProduct(item.id);
                                                }}
                                                    className="btn btn-danger">Delete</button>
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

export default AllProducts;
