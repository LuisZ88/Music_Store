import { useContext, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/auth-context";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import CartContext from "../Store/cart-context";
import Carttest from "../Products/CartTestp";

const NavBar = () => {
  const cartCtx = useContext(CartContext)
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item)=> {
    return curNumber + item.amount;
  }, 0);
  const AuthCtx = useContext(AuthContext);
  const userName = AuthCtx.name;
  const [cartIsShow, setCartIsShow] = useState(false);
  const showCartHandleFunction = () => {
    setCartIsShow(true);
  };
  const hideCartHandleFunction = () => {
    setCartIsShow(false);
  };

  return (
    
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        bg="dark"
      ><Container>
        <Nav className="justify-content-space-around">

            <NavLink className="text-decoration-none text-light fs-4 me-3" to="/search">
              <img
                alt=""
                src="https://res.cloudinary.com/pruebasmern/image/upload/v1647445325/Music%20Shop/logo_jkade6.png"
                width="40"
                height="40"
                className="d-inline-block"
              />{" "}
              Musicalia
            </NavLink>
          </Nav>
          

          {userName ? (
            <Nav>
            <NavLink to="/" className="d-lg-none">
              <img
                alt=""
                src="https://res.cloudinary.com/pruebasmern/image/upload/v1647951048/Music%20Shop/iniciar-sesion_ixut5c.png"
                width="30"
                height="30"
                className="d-inline-block"
              />
              <Button onClick={AuthCtx.logout}>salir</Button>
            </NavLink></Nav>
          ) : (
            <Nav>
              <NavLink to="/login" className="d-lg-none">
                <img
                  alt=""
                  src="https://res.cloudinary.com/pruebasmern/image/upload/v1647951048/Music%20Shop/iniciar-sesion_ixut5c.png"
                  width="30"
                  height="30"
                />{" "}
              </NavLink>
            </Nav>
          )}

          

          <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav className="justify-content-center">
              <NavDropdown title="Teclados" id="basic-navbar-nav">
                <NavLink to="#" className="NavLink_drop">
                  Pianos Acústicos
                </NavLink>
                <NavDropdown.Divider />
                <NavLink to="#" className="NavLink_drop">
                  Pianos Electrónicos
                </NavLink>
                <NavDropdown.Divider />
                <NavLink to="#" className="NavLink_drop">
                  Teclados Electrónicos
                </NavLink>
                <NavDropdown.Divider />
                <NavLink to="#" className="NavLink_drop">
                  Teclados Electrónicos
                </NavLink>
              </NavDropdown>
              <NavDropdown title="Guitarras" id="basic-navbar-nav">
                <NavLink to="#" className="NavLink_drop">
                  Guitarras Clásicas
                </NavLink>
                <NavDropdown.Divider />
                <NavLink to="#" className="NavLink_drop">
                  Guitarras Eléctricas
                </NavLink>
                <NavDropdown.Divider />
                <NavLink to="#" className="NavLink_drop">
                  Guitarras Acústicas
                </NavLink>
              </NavDropdown>
              <NavDropdown title="Bajos" id="basic-navbar-nav">
                <NavLink to="#" className="NavLink_drop">
                  Bajos Acústicos
                </NavLink>
                <NavDropdown.Divider />
                <NavLink to="#" className="NavLink_drop">
                  Bajos Eléctricos
                </NavLink>
              </NavDropdown>
              <NavDropdown title="Percusión" id="basic-navbar-nav">
                <NavLink to="#" className="NavLink_drop">
                  Baterías Acústicas
                </NavLink>
                <NavDropdown.Divider />
                <NavLink to="#" className="NavLink_drop">
                  Baterías Electrónicas
                </NavLink>
              </NavDropdown>
              <NavDropdown title="Viento" id="basic-navbar-nav">
                <NavLink to="#" className="NavLink_drop">
                  Flautas Dulces
                </NavLink>
                <NavDropdown.Divider />
                <NavLink to="#" className="NavLink_drop">
                  Flautas Traveseras
                </NavLink>{" "}
                <NavDropdown.Divider />
                <NavLink to="#" className="NavLink_drop">
                  Saxofones
                </NavLink>
              </NavDropdown>
            </Nav>
            </Navbar.Collapse>
            <Nav className="d-inline-block align-top me-5">
          <img
            alt=""
            src="https://res.cloudinary.com/pruebasmern/image/upload/v1647450550/Music%20Shop/icons8-carrito-de-la-compra-cargado-100_kyzifc.png"
            width="30"
            height="30"
            
            onClick={showCartHandleFunction}
          /><span className="badge_cart">{numberOfCartItems}</span></Nav>
            
            {AuthCtx.role === "admin" && (
              <Nav>
                <NavLink
                  to="/admin/newproduct"
                  className="text-decoration-none text-light me-lg-3"
                >
                  {" "}
                  Nuevo producto
                </NavLink>
              </Nav>
            ) }
            

            {userName ? (
              <>
                <NavLink
                  to="/"
                  className="text-decoration-none text-light d-none d-lg-inline-block"
                >
                  <img
                    alt=""
                    src="https://res.cloudinary.com/pruebasmern/image/upload/v1647951048/Music%20Shop/iniciar-sesion_ixut5c.png"
                    width="30"
                    height="30"
                    className="d-inline-block"
                  />{" "}
                  {userName}
                  {"     "}
                  <Button variant="transparent" onClick={AuthCtx.logout}>Cerrar sesión</Button>
                </NavLink>
              </>
            ) : (<Nav className="justify-content-center">
              <Nav>
                <NavLink
                  to="/login"
                  className="text-decoration-none text-light d-none d-lg-inline-block"
                >
                  <img
                    alt=""
                    src="https://res.cloudinary.com/pruebasmern/image/upload/v1647951048/Music%20Shop/iniciar-sesion_ixut5c.png"
                    width="30"
                    height="30"
                  />{" "}
                  Iniciar sesión
                </NavLink> </Nav>
                <Nav>
                <NavLink
                  to="/registro"
                  className="text-decoration-none text-light d-none d-lg-inline-block me-3"
                >
                  {"  |  "}
                  Registrarse
                </NavLink>
              </Nav></Nav>
            )}
          
          <Nav>
              <NavLink
                className="text-decoration-none text-light d-none d-lg-inline-block"
                to="/search"
              >
                Tienda
              </NavLink>
            </Nav>
          {cartIsShow && <Carttest onHide={hideCartHandleFunction} />}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Container>
      </Navbar>
  );
};
export default NavBar;
