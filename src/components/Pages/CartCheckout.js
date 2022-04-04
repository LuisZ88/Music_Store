import PaypalButton from "../Store/Paypal-button";
import { useContext } from "react";
import { Container, Row, Col, NavLink } from "react-bootstrap";
import CartContext from "../Store/cart-context";
import CartItem from "../Products/CartItem";
import './CartCheckout.css'
import AuthContext from "../context/auth-context";

const CartCheckout = () => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext)
  return (
    <>
      {cartCtx.totalAmount !== 0 ? (
        <>
          <Container className="mt-3 pt-4 cart-checkout rounded">
            <CartItem />
            <Row className="fs-2 pt-2 center m-auto " style={{maxWidth: '80vh'}}>
            <Col className='ms-4'>{!authCtx.isLoggedIn === false ? <PaypalButton /> :  <NavLink className="text-light text-decoration-none fs-4" to="/login">Inicia sesión aquí</NavLink>}</Col><Col className="me-4 text-white text-end">
                Total: {cartCtx.totalAmount}€
              </Col></Row>
          </Container>          
  
          
         
        </>
      ) : (
        <h1>Cesta vacía</h1>
      )}
    </>
  );
};
export default CartCheckout;
