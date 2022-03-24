import { Card, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductCard.css";
const ProductCard = (props) => {
  const {
    name,
    price,
    category,
    subCat,
    description,
    trademark,
    picture,
    special,
    stock,
    _id,
  } = props.datos;

  return (
    <>
      <Card className="col-12">
        <Container
          style={{ height: "12rem", width: "30rem" }}
          className="justify-content-center"
        >
          <Card.Img fluid src={picture.url} />
        </Container>
        <Card.Body>
          <Link to={`/item/${_id}`} className="text-decoration-none">
            <Card.Title className="fs-2">{name}</Card.Title>
          </Link>
          <Card.Subtitle className="text-secondary mt-2 fs-5">
            {trademark}
          </Card.Subtitle>
          <Card.Title className="text-end">{price} €</Card.Title>
          <Card.Subtitle className="">Cantidad {stock}</Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
};
export default ProductCard;
