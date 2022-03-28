import { Container, Image, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
const ProductCard = (props) => {
  let navigate = useNavigate();

  const goTo = () => {
    navigate(`/item/${_id}`);
  };
  const {
    name,
    price,
    category,
    subCat,
    trademark,
    picture,
    _id,
  } = props.datos;

  return (
    <>
      <Container
        style={{ height: "25vh" }}
        className="border pb-2 pt-2 rounded  bg-white"
      >
        <Row style={{ height: "40%" }}>
          <Image
            onClick={goTo}
            style={{ maxHeight: "100%", objectFit: "contain" }}
            src={picture.url}
          />
        </Row>
        <Row
          className="text-muted font-italic d-block mb-3"
          style={{ height: "10%", fontSize: "0.7rem" }}
        >
          <Col
          // onClick={() => {
          //   goTo("/");
          // }}
          >
            {category.toUpperCase()}/{subCat.toUpperCase()}
          </Col>
        </Row>
        <Row style={{ height: "30%" }}>
          <Col className="">
            <p style={{ maxHeight: "100%", objectFit: "contain" }}>{name}</p>
          </Col>
        </Row>
        <Row style={{ height: "5%" }}>
          <Col className="text-muted font-italic">{trademark} </Col>
          <Col className="text-end">{price} €</Col>
        </Row>
      </Container>
    </>
  );
};
export default ProductCard;
