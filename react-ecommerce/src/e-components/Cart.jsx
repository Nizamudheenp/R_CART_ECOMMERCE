import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { removeFromCart } from '../redux/CartSlice';

function Cart() {
  const cartItems = useSelector((state) => state.cart.addedProducts);
  const dispatch = useDispatch();

  return (
    <>
      {cartItems.length === 0 ? (
        <p style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90vh", fontSize: "30px" }}>
          Cart is empty !!
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "20px", width: "100%" }}>
          {cartItems.map((product) => (
            <Card key={product._id} style={{ width: '26rem', margin: "10px", padding: "10px" }}>
              <Card.Img variant="top" src={product.image} style={{ height: "250px", padding: "50px" }} />
              <Card.Body>
                <Card.Title style={{ fontWeight: "500" }}>{product.name}</Card.Title>
                <Card.Title style={{ fontWeight: "700" }}>$ {product.price}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => dispatch(removeFromCart(product._id))}
                  style={{ marginTop: "10px", width: "100%" }}
                >
                  Remove from Cart
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default Cart;
