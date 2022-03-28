import { Form, Button, Container, Nav, Col,Row } from "react-bootstrap";
import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/auth-context";
import { NavLink } from "react-router-dom";
import Loading from "../UI/Loading";

const Login = () => {
  const authCtx = useContext(AuthContext);
  let [loading, setLoading] = useState(false);
 
  const [message, setMessage] = useState("");
  const [formInfo, setFormInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    
    setFormInfo({
      ...formInfo,
      [event.target.name]: event.target.value,
    });
  };
  const hanldeSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formInfo
    );
    if (response.data.success === true) {
      const expirationTime = new Date((new Date().getTime()+ (+response.data.expiresIn) * 1000))
      authCtx.logIn(response.data.token, response.data.name, response.data.role, expirationTime.toISOString());
      console.log(response.data)
      setLoading(false);
    }
    if (response.data.success === false) {
      setMessage(response.data.message);
      setLoading(false);
  
    }
  };
  return (
    <Container className="col-lg-6 bg-dark text-light rounded pt-2 footer-padding">
      <Form onSubmit={hanldeSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Correo eléctronico</Form.Label>
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
      <Row><Col>
        <Button variant="primary" className="mb-3" type="submit">
          Inicia sesión
        </Button></Col>{message && <Col className='text-danger'>{message}</Col>}</Row>
      </Form>
      <Nav className="pb-3"> 
      <NavLink className="text-light text-decoration-none" to="/registro">¿No estás registrado?  Crea tu cuenta aquí</NavLink>
      </Nav>
      {loading === true && <Loading/>}
    </Container>
  );
};

export default Login;
