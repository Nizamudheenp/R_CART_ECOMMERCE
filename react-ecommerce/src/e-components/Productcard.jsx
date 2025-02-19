import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { addToCart } from '../redux/CartSlice';



                        
function Productcard() {
  const[product, setProduct] = useState({})
  const {productId} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/product/getProductById/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [productId]);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", margin:"20px", width:"100%"}}>
<Card style={{ width: '25rem'}}>
      <Card.Img variant="top" src={product.image}  style={{height:"250px", padding:"50px"}}/>
      <Card.Body>
        <Card.Title style={{fontWeight:"500"}}>{product.name}</Card.Title>
        <Card.Title style={{fontWeight:"700"}}>$ {product.price}</Card.Title>
        <Card.Text>
          {product.description}
        </Card.Text >
        <div style={{display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
        <Button  onClick={()=>dispatch(addToCart(product))} variant="primary"  style={{background:"grey", border:"none", color:"#fff" }}>Add To Cart</Button>
        </div>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Productcard