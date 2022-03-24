import { useState } from "react";
import { Button, Col,Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
const ProductList = (props) => {
  const [page, setPage] = useState(0),
  maxPage = Math.ceil(props.datos.products.length/5),
  onNextPage = () => {
    if(maxPage-1 === page) return;
    else
    setPage((page+1)%maxPage)},
  onPrevPage = () => {
    if(page===0)return;
    setPage((page*5-1)%maxPage)}
  

  return (
    <>{console.log(props.datos)}
      {props.datos.success === true ? (<>

        <Row className="">
          {props.datos.products.slice(page*5,5*(page+1)).map((x) => (
            <Col key={x._id}>
              <ProductCard datos={x}></ProductCard>
            </Col>
          ))}
         
        </Row>
 <Button onClick={onPrevPage} >Prev</Button><Button onClick={onNextPage}>Next</Button></>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductList;
