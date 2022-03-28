import { Container, Image, Row, Col } from "react-bootstrap";
import ProductList from "../Products/ProductList";
import Loading from "./Loading";
const CategoryCard = (props) => {

  //   const goTo = () => {
  //     navigate(`/item/${_id}`);
  //     console.log("clicked");
  //   }

  return (
    <>
      {props.tipo && (
          <Container >
        <Row
          xs={3}
          md={3}
          lg={4}
          xl={4}
          className="g-4 mb-5 justify-content-center"
          
        >
          {props.tipo.map((x, i) => (
            <Col key={i }  style={{ maxWidth: "22vh" }}>
              <Container
                style={{ height: "20vh", }}
                className="border pb-2 pt-2 rounded  bg-white"
                onClick={()=>{props.filtrar(x.filter)}}
              >
                <Row style={{ height: "60%" }}>
                  <Image
                    style={{ maxHeight: "100%", objectFit: "contain" }}
                    src={x.url}
                  />
                </Row>

                <Row style={{ height: "20%" }}>
                  <Col className="fw-bold fs-5 text-center">
                    <p style={{ maxHeight: "100%", objectFit: "contain" }}>
                      {x.name}
                    </p>
                  </Col>
                </Row>
              </Container>
            </Col>
          ))}
        </Row></Container>
      )}
       {!props.datos ? <Loading/>: <ProductList datos={props.datos}/>}
    </>
  );
};

export default CategoryCard;
