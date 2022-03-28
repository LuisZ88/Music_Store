import { Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/auth-context";
import CartContext from "../Store/cart-context";
import './UserPage.css'
import Loading from "../UI/Loading";

const UserPage = () => {
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    surname: "",
    invoices: [],
  });

  useEffect(() => {
    const info = async () => {
      await axios
        .get("http://localhost:5000/api/auth/getUser", {
          headers: {
            Authorization: authCtx.token,
            "content-type": "text/json",
          },
        })
        .then((response) => {
          setUserData({
            name: response.data.user.name,
            surname: response.data.user.surname,
            email: response.data.user.email,
            invoices: response.data.user.invoices,
          });
        });
    };
    info();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <h1 className="text-center">Pedidos de {userData.name}</h1>
      {userData.invoices.map((item) => (
        <Container key={item.id} className="mb-5 border pb-3 rounded invoice" style={{width: '80vw'}}>
          <Row className="" >
            <Col xs="5">Fecha</Col>
            <Col xs="2">Total</Col>
            <Col xs='5'>Enviar a</Col>
            
          </Row>
          <Row className="fw-bold">
            <Col xs="5">{new Date(item.date).toLocaleDateString()}</Col>
            <Col xs="2" >{item.totalAmount}€</Col>
            <Col  xs='5'>
              {userData.name} {userData.surname}
            </Col>
            <Col> Pedido: {item.id}</Col>
          </Row>
          {item.items.map((i)=> (
            <Container  key={item.id + i.id}className="border rounded pt-2 invoice-item">
            <Row className="fw-bold">
              <Col style={{ maxHeight: "100%", objectFit: "contain" }}>
                {i.name}
              </Col>
              <Col className="text-end">Unidades {i.amount}</Col>
            </Row>
            <Row><Col>{i.price} €</Col></Row>
          </Container>
        



          ))}
          </Container>
      ))}
    </>
  );
};
export default UserPage;
