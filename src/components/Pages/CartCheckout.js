import PaypalButton from "../Store/Paypal-button";
import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CartContext from "../Store/cart-context";
import CartItem from "../Products/CartItem";
import './CartCheckout.css'

const CartCheckout = () => {
  const cartCtx = useContext(CartContext);
  return (
    <>
      {cartCtx.totalAmount !== 0 ? (
        <>
          <Container className="mt-3 pt-2 cart-checkout rounded">
            <CartItem />
            <Row className="fs-2">
              <Col className="me-2 text-white text-end">
                Precio total: {cartCtx.totalAmount}€
              </Col>
            </Row><Row><Col><PaypalButton /></Col></Row>
          </Container>          
  
          
         
        </>
      ) : (
        <h1>cesta vacía</h1>
      )}
    </>
  );
};
export default CartCheckout;
