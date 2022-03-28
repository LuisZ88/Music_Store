import { Container, Button, Col, Row, Image } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import CartContext from "../Store/cart-context";
import Loading from "../UI/Loading";
const ProductPage = (props) => {
  const cartCtx = useContext(CartContext);
  const amount = 1;

  let { id } = useParams();
  let [loading, setLoading] = useState(false);
  const [item, setItem] = useState({
    success: false,
    product: {},
  });

  useEffect(() => {
    const peticionGet = async () => {
      setLoading(true)
      await axios
        .get(`http://localhost:5000/api/product/${id}`)
        .then((response) => {
          setItem(response.data);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    };
    peticionGet();
  }, [id]);
  const addToCartHandler = () => {
    cartCtx.addItem({
      id: item.product._id,
      name: item.product.name,
      amount: amount,
      price: item.product.price,
      category: item.product.category,
      img: item.product.picture.url,
      subCat: item.product.subCat
    });
  };


  return (
    <>
      {item.success !== false && (
        <Container className="mt-3 bg-white signup-margin" >
          <Row className="mt-3">
            <Col  className='text-decoration-none text-secondary' ><NavLink className='text-decoration-none text-secondary' to='/search'>
              TIENDA </NavLink> / <NavLink className='text-decoration-none text-secondary' to={`/category/${item.product.category}`}>
               {item.product.category.toUpperCase()}</NavLink>  /{" "}
              {item.product.subCat.toUpperCase()}
            </Col>
          </Row>
          <Row xs={1} md={2} className=" mt-5 ">
            <Col className="text-center" style={{ maxWidth: "90%" }}>
              <Image
                fluid
                style={{ maxHeight: "75vh" }}
                src={item.product.picture.url}
              />
            </Col>
            <Col>
              <Row className="text-muted mt-3 fs-4"><Col>
                {item.product.trademark}
                </Col></Row>
              <Row className=" fs-2 mt-3">
                <Col>{item.product.name}</Col>
              </Row>
              <Row className="text-start mt-3">
                <Col>{item.product.description}</Col>
              </Row>
              <Row className=" fs-2 mt-3">
                <Col>{item.product.price} €</Col>
                <Col className="text-end">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={addToCartHandler}
                  >
                    Añadir al carro
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          
        </Container>
      ) }{loading === true && <Loading/>} 
    </>
  );
};
export default ProductPage;
