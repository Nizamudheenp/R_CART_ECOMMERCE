import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom';

export async function productLoader() {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/product/getProducts`);
  return response.data
}

function ProductList({searchTerm}) {
  const products = useLoaderData()

  const filterProducts = searchTerm
  ? products.filter((productItem) =>
      productItem.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    )
  : products;


  return (
    <div>
      <h1 style={{textAlign:"center", margin:"18px"}}>PRODUCTS</h1>

      <Container >
      
        <Row>
          {filterProducts.length > 0 ? 
        (filterProducts.map((productItem) => (
          <Col key={productItem._id} md={4} lg={3} sm={6} style={{display:"flex", flexDirection:"column" , alignItems:"center", justifyContent:"center", padding:"10px"}}>
          <img
              src={productItem.image}
              
              alt={productItem.name}
              style={{ width: "150px", height: "150px", borderRadius: "10px" }}
            />
            <span style={{padding:"10px"}}>{productItem.name}</span>
            <Link to={`productItem/${productItem._id}`}>
            <button style={{padding:"6px 15px", borderRadius:"10px", border:"none", background:"grey", color:"#fff"}}>view details</button>
            </Link>
          </Col>
            ))) : 





        products.map((productItem) => (
          <Col key={productItem._id} md={4} lg={3} sm={6} style={{display:"flex", flexDirection:"column" , alignItems:"center", justifyContent:"center", padding:"10px"}}>
          <img
              src={productItem.image}
              
              alt={productItem.name}
              style={{ width: "150px", height: "150px", borderRadius: "10px" }}
            />
            <span style={{padding:"10px"}}>{productItem.name}</span>
            <Link to={`productItem/${productItem._id}`}>
            <button style={{padding:"6px 15px", borderRadius:"10px", border:"none", background:"grey", color:"#fff"}}>view details</button>
            </Link>
          </Col>
            ))}
        </Row>
      
      </Container>
    </div>
  );
}

export default ProductList;
