import { useEffect, useState } from "react";
import { Button, Col,Container,Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
const ProductList = (props) => {
  const [page, setPage] = useState(0),
  maxPage = Math.ceil(props.datos.products.length/8),
  
  onNextPage = () => {
    if(maxPage-1 === page) return;
    else
    setPage((page+1)%maxPage)},
  onPrevPage = () => {
    if(page===0)return;
    setPage((page-1)%maxPage)}
  useEffect(()=>{
    setPage(0)
  },[props.datos.products])

  return (
    <>
      {props.datos.success === true ? (<Container className='invoice'>
        <Row xs={1} md={2} lg={4} xl={4} className="g-4 justify-content-center ">
          {props.datos.products.slice(page*8,8*(page+1)).map((x) => (
            <Col key={x._id} >
              <ProductCard datos={x} ></ProductCard>
            </Col>
          ))}
         
        </Row><Row className="mt-5"><Col className="text-end">
 <Button onClick={onPrevPage} variant='secondary'>Prev</Button></Col><Col><Button variant='secondary' onClick={onNextPage}>Next</Button></Col></Row></Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductList;
