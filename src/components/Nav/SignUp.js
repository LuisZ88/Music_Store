import { Form, Button, Container } from "react-bootstrap";
import { useContext, useState } from "react";
import axios from "axios";
import ModalCard from "../UI/ModalCard";
import AuthContext from "../context/auth-context";

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
  const handleChange = (event) => {
    setFormInfo({
      ...formInfo,
      [event.target.name]: event.target.value,
    });
  };

  const hanldeSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/auth/signUp",
      formInfo
    );
    if (response.data.success === true) {
      authCtx.logIn(response.data.token, response.data.name,response.data.role );
    }
    if (response.data.success === false) {
      console.log(response.data);
      setMessage(response.data.message);
    }
  };
  return (
    <Container className="col-lg-6 bg-dark text-light">
      <Form onSubmit={hanldeSubmit}>
        <Form.Group className="mb-3 mt-3" controlId="name">
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

        <Form.Group className="mb-3" controlId="adress">
          <Form.Label>Dirección</Form.Label>
          <Form.Control as="textarea" name="adress"></Form.Control>
        </Form.Group>
        <Button variant="primary" className="mb-3" type="submit">
          Registrarse
        </Button>
      </Form>

      {message ? <ModalCard content={message} className="bg-light"></ModalCard> : <></>}
    </Container>
  );
};

export default SignUp;
