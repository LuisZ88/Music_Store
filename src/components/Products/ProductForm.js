import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  FormSelect,
  FloatingLabel,
} from "react-bootstrap";
import ProductCard from "./ProductCard";
import ModalCard from "../UI/ModalCard";
import AuthContext from "../context/auth-context";

const ProductForm = () => {
  const authCtx = useContext(AuthContext);
  let [info, setInfo] = useState();
  const inputRef = useRef();
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(event.target);
    let form = new FormData(event.target);
    info = await axios.post("http://localhost:5000/api/product",form,
      {
        headers: {
          Authorization: authCtx.token,
          'content-type': 'text/json'
        },
      });
    setInfo(info.data.newProduct);
    console.log(info);
    inputRef.current.reset();
  };
  return (
    <>
      <Container className="bg-dark pt-3 pb-4 mt-1 mb col-lg-6 bg-dark text-light">
        <Form onSubmit={submitHandler} ref={inputRef}>
          <FloatingLabel
            controlId="name"
            label="Nombre del producto"
            className="mb-3 mt-3"
          >
            <Form.Control name="name" placeholder="" required />
          </FloatingLabel>

          <FloatingLabel
            className="w-responsive mb-1"
            controlId="category"
            label="Categoría"
          >
            <FormSelect name="category" required>
              <option value="viento">Viento</option>
              <option value="teclado">Teclado</option>
              <option value="bajo">Bajo</option>
              <option value="percusion">Percusión</option>
              <option value="guitarra">Guitarra</option>
            </FormSelect>
          </FloatingLabel>

          <FloatingLabel
            className="mb-1"
            controlId="subCat"
            label="Subcategoría"
          >
            <Form.Control name="subCat" required></Form.Control>
          </FloatingLabel>

          <FloatingLabel className="mb-1" controlId="trademark" label="Marca">
            <Form.Control name="trademark" required></Form.Control>
          </FloatingLabel>
          <FloatingLabel className="mb-1" controlId="price" label="Precio">
            <Form.Control name="price" required></Form.Control>
          </FloatingLabel>
          <FloatingLabel
            className="mb-1"
            controlId="special"
            label="Características especiales"
          >
            <Form.Control name="special" required></Form.Control>
          </FloatingLabel>

          <FloatingLabel
            className="mb-1"
            controlId="description"
            label="Descripción"
          >
            <Form.Control
              as="textarea"
              name="description"
              required
            ></Form.Control>
            <Form.Group className="mb-1" controlId="file">
              <Form.Label>Subir imagen</Form.Label>
              <Form.Control type="file" name="file"></Form.Control>
            </Form.Group>
          </FloatingLabel>
          <FloatingLabel className="mb-1 " controlId="stock" label="Stock">
            <Form.Control name="stock" type="number" required></Form.Control>
          </FloatingLabel>

          <Button type="submit">Crear Producto</Button>
        </Form>
      </Container>
      {info !== undefined ? (
        <ModalCard content={<ProductCard datos={info} />}></ModalCard>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductForm;
