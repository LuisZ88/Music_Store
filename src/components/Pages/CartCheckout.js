import PaypalButton from "../Store/Paypal-button";
import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CartContext from "../Store/cart-context";
import CartItem from "../Products/CartItem";

const CartCheckout = () => {
  const cartCtx = useContext(CartContext);
  return (
    <>
      {cartCtx.totalAmount !== 0 ? (
        <>
          <Container className="mt-3  bg-white" variant="rounder">
            <CartItem />
            <Row className="fs-2">
              <Col className="text-end me-2">
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
