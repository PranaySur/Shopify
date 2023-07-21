import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { v4 as generateID } from 'uuid';
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore';
import '../App.css'

const AddProduct = () => {
    const [title, setTitle] = useState('') // State variable for storing the title of the product
    const [description, setDescription] = useState('') // State variable for storing the description of the product
    const [category, setCategory] = useState('') // State variable for storing the category of the product
    const [price, setPrice] = useState(0) // State variable for storing the price of the product
    const [image, setImage] = useState(null) // State variable for storing the image of the product
    const [loading, setLoading] = useState(false) // State variable for indicating whether the product is being loaded or not
    const navigate = useNavigate() // A function provided by a routing library to navigate to different pages

    const handleReset = () => {
        // Function to reset all the state variables to their initial values
        setTitle('')
        setDescription('')
        setCategory('')
        setPrice()
        setImage(null)
    }

    const addProduct = async (e) => {
        e.preventDefault() // Prevents the default form submission behavior
        setLoading(true) // Sets the loading state to true, indicating that the product is being added
        try {
            const id = generateID() // Generates a unique ID for the product
            const storageRef = ref(storage, id) // Creates a reference to the storage location using the generated ID
            // Uploads the image file to the storage location referenced by storageRef in a resumable manner
            await uploadBytesResumable(storageRef, image)
            // Retrieves the download URL of the uploaded image from the storage location referenced by storageRef
            const downloadURL = await getDownloadURL(storageRef)
            const docRef = doc(db, "products", id) // Creates a reference to the document location in the database using the generated ID
            // Creates a new document with the product details in the "products" collection using the document reference
            await setDoc(docRef, {
                id,
                title,
                description,
                price,
                category,
                imageURL: downloadURL,
            })
            navigate('/all-products') // Navigates to the "/all-products" page
            alert('Product successfully added!') // Shows an alert message indicating that the product was successfully added
        } catch (error) {
            setLoading(false) // Sets the loading state to false, indicating that the product addition has finished (with an error)
            alert(error.message) // Shows an alert message with the error message
        }
    }

    return (
        <section style={{ minHeight: "500px" }}>
            <Container>
                <Row>
                    <Col lg='12'>
                        <div className='fs-2 mb-3 text-center'><b>List New Product</b></div>
                        {loading ?
                            <div className='text-center'>
                                <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt='loading' style={{ height: "200px", width: "200px", marginTop: "100px", marginBottom: "100px" }} />
                            </div>
                            : <Form onSubmit={addProduct}>
                                <div className="mb-3 fs-5">
                                    <FormGroup className='form__group'>
                                        <div className='d-flex align-items-center'>
                                            <label htmlFor="title">Product Name : &nbsp; &nbsp;</label>
                                            <input id='title' type='text' placeholder='' value={title} onChange={e => setTitle(e.target.value)} required style={{ border: "none", outline: "none" }}></input>
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="mb-3">
                                    <FormGroup className='form__group'>
                                        <label className="fs-5" htmlFor="description">Product Description :</label>
                                        <textarea
                                            className='w-100 fs-6'
                                            id="description"
                                            placeholder=''
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            required
                                            style={{ border: "none", outline: "none" }}
                                            rows={5}
                                        ></textarea>
                                    </FormGroup>
                                </div>
                                <div className='d-flex align-items-center justify-content-between gap-5 mb-3 fs-5'>
                                    <FormGroup className='form__group w-50'>
                                        <div className='d-flex align-items-center'>
                                            <p>Rs.</p>
                                            <input type='number' className='p-2' placeholder='' value={price} onChange={e => setPrice(e.target.value)} required style={{ border: "none", outline: "none" }}></input>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className='form__group w-50'>
                                        <select className='w-100 p-2' value={category} onChange={e => setCategory(e.target.value)} required style={{ border: "none", outline: "none" }}>
                                            <option>Category</option>
                                            <option value='chair'>Chair</option>
                                            <option value='table'>Table</option>
                                            <option value='sofa'>Sofa</option>
                                            <option value='bed'>Bed</option>
                                            <option value='cabinet'>Cabinet</option>
                                            <option value='refrigerator'>Refrigerator</option>
                                            <option value='washing'>Washing Machine</option>
                                        </select>
                                    </FormGroup>
                                </div>
                                <div className='text-center fs-5 mb-5'>
                                    <FormGroup className='form__group'>
                                        <label htmlFor='fileInput'>
                                            {!image && <p className='fs-5 text-secondary'><i class="uil uil-image" style={{ fontSize: '30px' }}></i>&nbsp;&nbsp;Upload Product Image</p>}
                                            {image && <p className='fs-5 text-primary'><i class="uil uil-image-edit" style={{ fontSize: '30px' }}></i>&nbsp;&nbsp;Change Image Uploaded</p>}
                                        </label>
                                        <input
                                            id='fileInput'
                                            type='file'
                                            onChange={e => setImage(e.target.files[0])}
                                            required
                                            style={{ display: 'none' }}
                                        />
                                    </FormGroup>

                                </div>
                                <div className='d-flex align-items-center justify-content-around fs-5 mb-4'>
                                    <button className="btn btn-primary w-50 px-5 mx-5" onClick={handleReset}>Reset</button>
                                    <button className="btn btn-primary  w-50 px-5 mx-5" type='submit'>List</button>
                                </div>
                            </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AddProduct