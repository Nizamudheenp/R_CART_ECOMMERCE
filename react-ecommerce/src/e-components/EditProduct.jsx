import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/product/getProductById/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/product/updateProduct/${id}`, product, config);  // put that data
            navigate('/adminDashboard');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h2>Edit Product</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name="name" value={product.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" value={product.price} onChange={handleChange} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name="category" value={product.category} onChange={handleChange} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" value={product.description} onChange={handleChange} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" name="image" value={product.image} onChange={handleChange} required />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                    Update Product
                </Button>

            </Form>
        </div>
    );
}

export default EditProduct;
