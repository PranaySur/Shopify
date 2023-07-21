import React, { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../firebase";
import { toast } from 'react-toastify';
import CommonSection from '../components/UI/CommonSection';
import { Container, Col, Row } from 'reactstrap';
import ProductsList from '../components/UI/ProductsList'
import empty from '../assets/empty.png'
import '../styles/shop.css'

const Shop = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const product = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(product);
                setLoading(false);
            } catch (error) {
                toast.error('Error fetching products');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        setLoading(true);
        const search = searchQuery.toLowerCase();
        let tempFilteredProducts = [...products];
        if (selectedCategory !== '' && selectedCategory !== 'all') {
            tempFilteredProducts = tempFilteredProducts.filter(
                (product) => product.category === selectedCategory
            );
        }
        if (selectedSort === 'asc') {
            tempFilteredProducts.sort((a, b) => a.price - b.price);
        } else if (selectedSort === 'desc') {
            tempFilteredProducts.sort((a, b) => b.price - a.price);
        }
        if (search !== '') {
            tempFilteredProducts = tempFilteredProducts.filter((product) =>
                product.title.toLowerCase().includes(search)
            );
        }
        setFilteredProducts(tempFilteredProducts);
        setLoading(false);
    }, [selectedCategory, selectedSort, products, searchQuery]);

    return (
        <>
            <CommonSection title='Products'></CommonSection>
            <section>
                <Container>
                    <Row>
                        <Col lg='3' md='6'>
                            <div className="filter__widget w-100">
                                <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                                    <option value='all'>Filter By Category</option>
                                    <option value='chair'>Chair</option>
                                    <option value='table'>Table</option>
                                    <option value='sofa'>Sofa</option>
                                    <option value='bed'>Bed</option>
                                    <option value='cabinet'>Cabinet</option>
                                    <option value='mobile'>Mobile</option>
                                    <option value='watch'>Watch</option>
                                    <option value='television'>Television</option>
                                    <option value='refrigerator'>Refrigerator</option>
                                    <option value='washing'>Washing Machine</option>
                                    <option value='misc'>Other Appliances</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg='3' md='6'>
                            <div className="filter__widget w-100">
                                <select onChange={(e) => setSelectedSort(e.target.value)} value={selectedSort}>
                                    <option>Price</option>
                                    <option value='asc'>Ascending</option>
                                    <option value='desc'>Descending</option>
                                </select>
                            </div>
                        </Col>

                        <Col lg='6' md='12'>
                            <div className="search__box w-100">
                                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                <span><i class="ri-search-line"></i></span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='pt-0'>
                {loading ? (
                    <div className='text-center'>
                        < img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" style={{ height: "100px", width: "100px" }} />
                    </div>
                ) : (
                    <Container>
                        <Row>
                            {
                                filteredProducts.length === 0 ?
                                    <div className='text-center'>
                                        <img src={empty} alt="" style={{ height: "250px", width: "250px" }} />
                                        <p className='fs-4'>No products found</p>
                                    </div>
                                    : <ProductsList data={filteredProducts}></ProductsList>
                            }
                        </Row>
                    </Container>
                )}
            </section>
        </>
    )
}

export default Shop