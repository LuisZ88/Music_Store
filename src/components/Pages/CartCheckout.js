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
          <Container className="mt-3 pt-4 cart-checkout rounded">
            <CartItem />
            <Row className="fs-2 pt-2 center m-auto " style={{maxWidth: '80vh'}}>
            <Col className='ms-4'><PaypalButton /></Col><Col className="me-4 text-white text-end">
                Total: {cartCtx.totalAmount}€
              </Col></Row>
          </Container>          
  
          
         
        </>
      ) : (
        <h1>cesta vacía</h1>
      )}
    </>
  );
};
export default CartCheckout;
