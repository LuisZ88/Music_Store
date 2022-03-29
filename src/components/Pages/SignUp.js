import { Form, Button, Container,Row,Col } from "react-bootstrap";
import { useContext, useState } from "react";
import axios from "axios";
import ModalCard from "../UI/ModalCard";
import AuthContext from "../context/auth-context";
import { NavLink } from "react-router-dom";
import Loading from "../UI/Loading";

const SignUp = () => {
  const authCtx = useContext(AuthContext)
  const [message, setMessage] = useState("");
  const [formInfo, setFormInfo] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    adress: "",
  });
  let [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setFormInfo({
      ...formInfo,
      [event.target.name]: event.target.value,
    });
  };

  const hanldeSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/auth/signUp",
      formInfo
    );
    if (response.data.success === true) {
      const expirationTime = new Date((new Date().getTime()+ (+response.data.expiresIn)))
      authCtx.logIn(response.data.token, response.data.name,response.data.role, expirationTime.toISOString() );
      setLoading(false)
    }
    if (response.data.success === false) {
      console.log(response.data);
      setMessage(response.data.message);
      setLoading(false)
    }
  };
  return (<>
    <Container className=" signup-css">
    <Container className="col-6 col-sm-5 text-light footer-padding position-relative ">
      <Form onSubmit={hanldeSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="surname">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Primer apellido"
            name="surname"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduce tu email"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Row><Col><Button variant="secondary" className="mb-3" type="submit">
          Registrarse
        </Button>
        </Col>{message && <Col className='text-danger'>{message}</Col>}</Row>
        
      </Form> 
      <NavLink className="text-light text-decoration-none" to="/login">¿Ya estás registrado?  Inicia sesión aquí</NavLink>
      {loading === true && <Loading/>}


      {message ? <ModalCard content={message} className="bg-light"></ModalCard> : <></>}
    </Container></Container></>
  );
};

export default SignUp;
