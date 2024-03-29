import { Container, Button, Col, Row, Image } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CartContext from "../Store/cart-context";
import Loading from "../UI/Loading";
import AuthContext from "../context/auth-context";
const ProductPage = (props) => {
  const cartCtx = useContext(CartContext);
  const amount = 1;
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

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
        .get(`${process.env.REACT_APP_BACKEND}api/product/${id}`)
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
  const deleteItemFromDB = async()=>{
    await axios
    .delete(`${process.env.REACT_APP_BACKEND}api/product/${id}`,{
      headers: { Authorization: authCtx.token }}
    )
    .then(navigate('/search'))
  }

  return (
    <>
      {item.success !== false && (
        <Container className="mt-3 bg-white " style={{minHeight:' 90vh'}}>
          <Row className="mt-3">
            <Col  className='text-decoration-none text-secondary fs-5' ><NavLink className='text-decoration-none text-secondary' to='/search'>
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
              <Row className=" fs-2 mt-3 fw-bold">
                <Col>{item.product.name}</Col>
              </Row>
              <Row className="text-start mt-3">
                <Col>{item.product.description}</Col>
              </Row>
              <Row className=" fs-2 mt-3 fw-bold">
                <Col>{item.product.price} €</Col>
                {authCtx.role === 'admin' && <Col><Button
                    variant="danger"
                    type="button"
                    onClick={deleteItemFromDB}
                  > Eliminar de DB
                  </Button></Col>}
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
