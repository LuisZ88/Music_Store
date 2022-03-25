import { Card, Container, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
const ProductCard = (props) => {
  let navigate = useNavigate();

  const goTo = () => {
    navigate(`/item/${_id}`);
    console.log("clicked");
  }
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
      <Container
        style={{ height: "25vh" }}
      >
        <Row style={{ height: "40%" }}>
          <Image
            onClick={goTo}
            style={{ maxHeight: "100%", objectFit: "contain" }}
            src={picture.url}
          />
        </Row>
        <Row className="text-muted font-italic d-block" style={{ height: "10%", fontSize: '0.7rem' }}>
          <Col
            // onClick={() => {
            //   goTo("/");
            // }}
          >
            {category.toUpperCase()}/{subCat.toUpperCase()}
          </Col>
        </Row>
        <Row style={{ height: "30%" }} >
          <Col className="mb-1"><p style={{ maxHeight: "100%", objectFit: "contain" }}>
          {name}</p></Col>
        </Row>
        <Row style={{ height: "10%" }}>
          <Col>{price} €</Col>
        </Row>
      </Container>
    </>
  );
};
export default ProductCard;
