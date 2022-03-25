import { useState } from "react";
import { Button, Col,Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
const ProductList = (props) => {
  const [page, setPage] = useState(0),
  maxPage = Math.ceil(props.datos.products.length/10),
  onNextPage = () => {
    if(maxPage-1 === page) return;
    else
    setPage((page+1)%maxPage)},
  onPrevPage = () => {
    if(page===0)return;
    setPage((page-1)%maxPage)}
  

  return (
    <>{console.log(props.datos)}
      {props.datos.success === true ? (<>

        <Row xs={1} md={2} lg={4} xl={5} className="g-4">
          {props.datos.products.slice(page*10,10*(page+1)).map((x) => (
            <Col key={x._id}>
              <ProductCard datos={x}></ProductCard>
            </Col>
          ))}
         
        </Row><Row className="mt-5"><Col className="text-end">
 <Button onClick={onPrevPage} >Prev</Button></Col><Col><Button onClick={onNextPage}>Next</Button></Col></Row></>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductList;
