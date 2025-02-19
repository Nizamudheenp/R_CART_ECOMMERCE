import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';



function AdminDashboard() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {

            // get products

            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/product/getProducts`);
            setProducts(response.data);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    // delete products
    const handleDelete = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/product/deleteProduct/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // token to Authorization header
                    }
                });
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // navigation for edit and add

    const handleEdit = (productId) => {
        navigate(`/adminDashboard/EditProduct/${productId}`);
    };
    const handleAddProduct = () => {
        navigate('/adminDashboard/AddProduct');
    };

    return (

        <Stack gap={3} >
            <div style={{ padding: '35px 25px', textAlign: 'center' }}>
                <Button style={{ width: '50%', padding: '10px' }} variant="primary" onClick={handleAddProduct}>Add Product</Button>
            </div>

            {products.map((product) => (
                <div className="p-2" key={product._id}>
                    <h3>{product.name}</h3>
                    <img src={product.image} alt="" style={{ height: '300px' }} />
                    <p>{product.price}</p>
                    <p>{product.category}</p>
                    <p>{product.description}</p>

                    <Button variant="warning" onClick={() => handleEdit(product._id)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(product._id)} style={{ marginLeft: '10px' }}>Delete</Button>
                </div>
            ))}

        </Stack>


    )
}

export default AdminDashboard

