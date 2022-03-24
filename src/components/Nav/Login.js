import { Form, Button, Container, Nav } from "react-bootstrap";
import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/auth-context";
import { NavLink } from "react-router-dom";

const Login = () => {
  const authCtx = useContext(AuthContext);

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
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formInfo
    );
    if (response.data.success === true) {
      authCtx.logIn(response.data.token, response.data.name, response.data.role);
      console.log(response.data)
    }
    if (response.data.success === false) {
      console.log(response.data);
    }
  };
  return (
    <Container className="col-lg-6 bg-dark text-light">
      <Form onSubmit={hanldeSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduce tu email"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" className="mb-3" type="submit">
          Login
        </Button>
      </Form>
      <Nav className="pb-3"> 
      <NavLink to="/registro">Registrate</NavLink>
      </Nav>
    </Container>
  );
};

export default Login;
