import { Link } from "react-router-dom";
import { Col, Row, Button, Image, Container } from "react-bootstrap";

import ModalCart from "../UI/ModalCart";
import { useContext } from "react";
import CartContext from "../Store/cart-context";
const Carttest = (props) => {
  const cartCtx = useContext(CartContext);

  const cartEmpty = cartCtx.items.length > 0;
  const cartItems = (<>
      {cartCtx.items.map((item) => (
        <Row key={item.id} style={{ height: "40%", width: '100%' }}>
          <Col className="text-center" xs={2} style={{ maxWidth: '40%' }}>
            <Image
            fluid
              src={item.img}
              alt=""
              style={{ maxHeight: "10vh", objectFit: "contain" }}
              className=""
            />
          </Col>
          <Col className="ms-3 d-inline-block align-middle">
            <Link
              to={`/item/${item.id}`}
              onClick={props.onHide}
              className="text-dark d-inline-block align-middle fs-5 text-decoration-none"
            >
              {item.name}
            </Link>
            <span className="text-muted font-weight-normal font-italic d-block">
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)} /
              {item.subCat}
            </span>
          </Col>

          <Col className="fw-bold" xs={1}>
            {item.amount}
          </Col>
          <Col className="border-0" xs={1}>
            <Button
              to="#"
              variant="transparent"
              onClick={() => {
                cartCtx.removeItem(item.id);
              }}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Col>
          <Col className="text-end fw-bold" xs={2}>
            {item.price}€
          </Col>
        </Row>
      ))}</>
  );
  return (
    <>
      <ModalCart>
        <Row>
          <Col className="border-0 bg-light" xs={7}>
            <div className="p-2 px-3 text-uppercase ">Producto</div>
          </Col>

          <Col className="border-0 bg-light" xs={2}>
            <div className="py-2 text-uppercase text-end">Cant.</div>
          </Col>
          <Col className="border-0 bg-light" xs={3}>
            <div className="py-2 text-uppercase text-end">Precio</div>
          </Col>
        </Row>

        {cartItems}

        <Row className="justify-content-around fs-2">
          <Col>Total</Col>
          <Col className="text-end">{cartCtx.totalAmount}€</Col>
        </Row>
        <Row className="justify-content-around">
          <Col>
            <Button onClick={props.onHide} variant="secondary">
              Cerrar
            </Button>
          </Col>
          {cartEmpty && (
            <Col className="text-end">
              <Button variant="secondary">Comprar</Button>
            </Col>
          )}
        </Row>
      </ModalCart>
    </>
  );
};

export default Carttest;
