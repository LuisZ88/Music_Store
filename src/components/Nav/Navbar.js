import { useContext } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import { Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import CartContext from "../Store/cart-context";

const NavBar = () => {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const authCtx = useContext(AuthContext);
  const userName = authCtx.name;
  const goToCartFunction = () => {
    if (numberOfCartItems === 0) return;
    navigate(`/payment`);
  };
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark" >
      <Container className="shadow">
        <Nav className="justify-content-space-around">
          <NavLink
            className="text-decoration-none text-light fs-4 me-3"
            to="/"
          >
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

        {authCtx.isLoggedIn === true ? (
          <Nav>
            <NavLink to="/user" className="d-lg-none">
              <img
                alt=""
                src="https://res.cloudinary.com/pruebasmern/image/upload/v1647951048/Music%20Shop/iniciar-sesion_ixut5c.png"
                width="30"
                height="30"
                className="d-inline-block"
              />
            </NavLink>
          </Nav>
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
        <Navbar.Collapse id="responsive-navbar-nav">
   
          <NavLink to="/category/teclado" className="NavLink_drop">
            Teclados
          </NavLink>
          <NavLink
            to="/category/percusion"
            className="NavLink_drop"
          >
            Percusión
          </NavLink>
          <NavLink to="/category/guitarra" className="NavLink_drop">
            Guitarras
          </NavLink>
          <NavLink to="/category/viento" className="NavLink_drop">
            Viento
          </NavLink>
          <NavLink to="/category/bajo" className="NavLink_drop">
            Bajos
          </NavLink>
          
              {authCtx.role === "admin" && (
          <Nav>
            <NavLink
              to="/admin/newproduct"
              className="text-decoration-none text-light me-lg-3"
            >
              {" "}
              Nuevo producto
            </NavLink>
          </Nav>
        )}
        </Navbar.Collapse>
        
      
        <Nav className="d-inline-block align-top me-5">
          <img
            alt=""
            src="https://res.cloudinary.com/pruebasmern/image/upload/v1647450550/Music%20Shop/icons8-carrito-de-la-compra-cargado-100_kyzifc.png"
            width="30"
            height="30"
            onClick={goToCartFunction}
          />
          <span className="badge_cart">{numberOfCartItems}</span>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

       

        {authCtx.isLoggedIn === true ? (
          <>
            <NavLink
              to="/user"
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
              </NavLink>
              <Navbar.Collapse id="responsive-navbar-nav"> <Button
                variant="transparent"
                className="text-white"
                onClick={authCtx.logout}
              >
                Cerrar sesión
              </Button></Navbar.Collapse>
            
          </>
        ) : (
          <Nav className="d-none d-flex d-lg-flex">
             <Image
                  alt=""
                  src="https://res.cloudinary.com/pruebasmern/image/upload/v1647951048/Music%20Shop/iniciar-sesion_ixut5c.png"
                  width="30"
                  height="30"
                  className="me-1"
                />
            <Nav>
              <NavLink
                to="/login"
                className="text-decoration-none text-light "
              >
               
                Iniciar sesión
              </NavLink>
            </Nav>
            <Nav>
              <NavLink
                to="/registro"
                className="text-decoration-none text-light"
              >
                {"  |  "}
                Registro
              </NavLink>
            </Nav>
          </Nav>
          
        )}
      </Container>
    </Navbar>
  );
};
export default NavBar;
