import axios from "axios";
import { useRef, useState } from "react";
import { Form, Button, Container, FloatingLabel } from "react-bootstrap";

const Register = () => {
  const inputRef = useRef();
  const submitHandler = async (event) => {
    event.preventDefault();
    let form = new FormData(event.target);
    let user = await axios.post("http://localhost:5000/api/auth/signUp", form);
    localStorage.setItem("Login ok", user.data.token);
    console.log(user.data.token);
    inputRef.current.reset();
  };
  return (
    <Container className="bg-dark pt-3 pb-4 mt-1 mb">
      <Form onSubmit={submitHandler} ref={inputRef} >
        <FloatingLabel controlId="name" label="Nombre" className="mb-3 mt-3">
          <Form.Control name="name" placeholder="" required />
        </FloatingLabel>

        <FloatingLabel className="mb-1" controlId="surname" label="Apellido">
          <Form.Control name="surname" required></Form.Control>
        </FloatingLabel>

        <FloatingLabel
          className="mb-1"
          controlId="email"
          label="Correo electrónico"
        >
          <Form.Control name="email" required type="email"></Form.Control>
        </FloatingLabel>
        <FloatingLabel className="mb-1" controlId="password" label="Contraseña">
          <Form.Control name="password" required type="password"></Form.Control>
        </FloatingLabel>

        <FloatingLabel className="mb-1" controlId="adress" label="Descripción">
          <Form.Control as="textarea" name="adress" required></Form.Control>
        </FloatingLabel>

        <Button type="submit">Registrarse</Button>
      </Form>
    </Container>
  );
};
export default Register;
