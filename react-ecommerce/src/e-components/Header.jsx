import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Header({ searchTerm, setSearchTerm }) {
    const cartItems = useSelector((state) => state.cart.addedProducts);
    const token = localStorage.getItem('token');
    const [isAdmin, setIsAdmin] = useState(false)
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('')
    const [username, SetUsername] = useState('')



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        const adminStatus = localStorage.getItem('isAdmin');
        if (adminStatus) {
            setIsAdmin(JSON.parse(adminStatus));
        }
        const userDashboard = async () => {
            const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/userDashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEmail(userResponse.data.email)
            SetUsername(userResponse.data.username)

        }
        userDashboard()
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        setShow(false)
    };




    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">R-CART</Navbar.Brand>
                    <Nav.Link as={Link} to="/" style={{ display: "flex", alignItems: "center", margin: "0 20px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                        </svg>
                    </Nav.Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
 {/* if token     */}
                        {token ? (
                            <Nav className="ml-auto">
                                <Nav.Link style={{ display: "flex", alignItems: "center", margin: "0 20px" }} onClick={handleShow}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                    </svg>
                                </Nav.Link>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Hi {username} !!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        email: {email}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="danger" onClick={handleLogout}>
                                            Logout
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
    {/* admin only */}

                                {isAdmin && (
                                    <Nav.Link as={Link} to="/adminDashboard" style={{ display: "flex", alignItems: "center", margin: "0 20px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                        </svg>
                                        <span style={{ marginLeft: "8px" }}>admin</span>
                                    </Nav.Link>
                                )}
                            </Nav>
                        ) : (
                            <Nav className="ml-auto">
                                <Nav.Link as={Link} to="/login" style={{ display: "flex", alignItems: "center", margin: "0 20px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                    </svg>
                                    <span style={{ marginLeft: "8px" }}>Login</span>
                                </Nav.Link>
                            </Nav>
                        )}

 {/* or */}

                        <Form className="d-flex w-100">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Nav.Link as={Link} to="/cart" style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                            <p style={{ borderRadius: "50%", padding: "0px 6px", background: "green", color: "white" }}>{cartItems.length}</p>
                        </Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
