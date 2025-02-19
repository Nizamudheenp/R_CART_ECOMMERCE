import { useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleProductCreation = async (e) => {
        e.preventDefault();

        if (!name || !description || !price || !category || !image) {
            setMessage('All fields are required!');
            setShowModal(true);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage('No token found, please log in.');
                setShowModal(true);
                return;
            }

            // post new products

            const response = await axios.post(
                `http://localhost:5000/api/user/product/creatProducts`,
                { name, description, price, category, image },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setMessage('Product created successfully!');

            // moadal

            setShowModal(true);
            setTimeout(() => {
                navigate('/adminDashboard');
            }, 4000);

        } catch (error) {
            setMessage('Failed to create product!');
            setShowModal(true);
            console.error('Add product failed', error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h2>Add New Product</h2>
            <Form onSubmit={handleProductCreation}>
                <Form.Group className="mb-3" controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        placeholder="Product Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        placeholder="Product Description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        placeholder="Product Price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        placeholder="Product Category"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridImage">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        placeholder="Image URL"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Product Creation Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddProduct;
