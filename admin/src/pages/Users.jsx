import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { db } from '../firebase';
import { doc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import '../App.css'

const Users = () => {
    const [loading, setLoading] = useState(true); // State variable to track the loading state
    const [users, setUsers] = useState(); // State variable to store the fetched user data

    // Function to fetch users from the Firestore database
    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'users')); // Retrieve the collection 'users' from Firestore
            const userData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })); // Map the retrieved documents to an array of user data objects
            setUsers(userData); // Update the 'users' state with the fetched user data
            setLoading(false); // Set the loading state to false since the data has been fetched
        } catch (error) {
            alert('Error fetching users'); // Display an error message if there is an error fetching users
            setLoading(false); // Set the loading state to false even if there is an error
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch users when the component mounts

        // The empty dependency array [] ensures that the effect runs only once, similar to componentDidMount
    }, []);

    // Function to delete a user from the Firestore database
    const deleteUser = async (uid) => {
        try {
            const productRef = doc(db, 'users', uid); // Get the reference to the user document in Firestore using the provided 'uid'
            await deleteDoc(productRef); // Delete the user document from Firestore
            fetchUsers(); // Fetch the updated list of users after deletion
            alert('User Removed!'); // Display a success message after successful deletion
        } catch (error) {
            alert('Error removing user'); // Display an error message if there is an error removing the user
        }
    }

    return (
        <section>
            <Container>
                <Row>
                    <div className='fs-2 text-center'><b>Registered Users</b></div>
                    <Col lg='12' className='pt-5 text-center'>
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
                                        <th>Profile Picture</th>
                                        <th>Customer Name</th>
                                        <th>Customer Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Map through the users array and render each user as a table row */}
                                    {users?.map(user => (
                                        <tr key={user.uid}>
                                            <td>
                                                <img src={user.photoURL} alt='' style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                                            </td>
                                            <td>{user.displayName}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {/* Button to delete a user */}
                                                <button onClick={() => {
                                                    deleteUser(user.uid);
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

export default Users