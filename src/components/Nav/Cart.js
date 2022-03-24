import "./Cart.css";
import ModalCart from "../UI/ModalCart";
import ProductCard from "../Products/ProductCard";
import { Button, Col, Row } from "react-bootstrap";

const Cart = (props) => {
  const cartItems = (
    <ul className="cart-items">
      {[
        {
          id: "c1",
          name: "sushi",
          trademark: "adidas",
          stock: 2,
          price: 12.99,
          picture: {
            url: "http://res.cloudinary.com/pruebasmern/image/upload/v1647627535/Music%20Shop/hiwtpzoiyw8rlhk8oxyy.png",
          },
        },
      ].map((item) => (
        
            <ProductCard key={item.id} datos={item}></ProductCard>
   
      ))}
    </ul>
  );
  return (
    <ModalCart>
      {cartItems}
      <Row className="justify-content-around fs-2">
        <Col>Total</Col>
        <Col className="text-end">35.62€</Col>
      </Row>
      <Row className="justify-content-around">
        <Col >
          <Button size="lg" onClick={props.onHide} variant="danger">
            Cerrar
          </Button>
        </Col>
        <Col className="text-end">
          <Button size="lg" variant="success" >
            Comprar
          </Button>
        </Col>
      </Row>
    </ModalCart>
  );
};

export default Cart;
