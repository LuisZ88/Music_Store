import { useContext } from 'react';
import {Row,Col,Image,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import CartContext from '../Store/cart-context';
const CartItem = (props) => {
    const cartCtx = useContext(CartContext)
  return (
    <>
      {cartCtx.items.map((item) => (
        <Row
          key={item.id}
          style={{ height: "40%", width: "100%" }}
          className=" border pt-2 pb-2"
        >
          <Col className="text-center" xs={2} style={{ maxWidth: "40%" }}>
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
      ))}
    </>
  );
};
export default CartItem;
