import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ProductPage = (props) => {
  let { id } = useParams();
  console.log(id);
  const [item, setItem] = useState({
    success: false,
    product: {},
  });
  const peticionGet = async () => {
    await axios
      .get(`http://localhost:5000/api/product/${id}`)
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <>
      {item.success !== false ? (
        <Container>
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={item.product.picture.url}
                alt="..."
              ></img>
            </div>
            <div className="col-md-6">
              <div className="small mb-1">{item.product.trademark}</div>
              <h1 className="display-5 fw-bolder">{item.product.name}</h1>
              <div className="fs-5 mb-5">
                <span>{item.product.price} €</span>
              </div>
              <p className="lead">{item.product.description}</p>
              <div className="d-flex">
                <input
                  className="form-control text-center me-3"
                  id="inputQuantity"
                  type="num"
                  //   value="1"
                ></input>
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                >
                  <i className="bi-cart-fill me-1"></i>
                  Añadir al carro
                </button>
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};
export default ProductPage;
