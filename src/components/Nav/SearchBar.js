import { useEffect, useState } from "react";
import axios from "axios";

import ProductList from "../Products/ProductList";
import { FormControl, Button, Form } from "react-bootstrap";

const SearchBar = () => {
  const [products, setProducts] = useState(null);
  const [tablaProducts, setTablaProducts] = useState();
  const [filter, setFilter] = useState("");
 
  const peticionGet = async () => {
    await axios
      .get("http://localhost:5000/api/product")
      .then((response) => {
        setProducts(response.data);
        setTablaProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionGet();
  }, []);
  const enterKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      search(filter);
    }
  };
  const filterChange = (event) => {
    setFilter(event.target.value);

    console.log(products);
  };
  const searchClick = (event) => {
    search(filter);
  };
  const search = (busqueda) => {
    let resultadoBusqueda = tablaProducts.products.filter((elemento) => {
      if (
        elemento.name.toString().toLowerCase().includes(busqueda.toLowerCase())
      )
        return elemento
    });
    setProducts({ success: true, products: resultadoBusqueda });
  };
  return (
    <>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={filter}
          onChange={filterChange}
          onKeyDown={enterKeyDown}
        />
        <Button variant="outline-success" onClick={searchClick}>
          Buscar
        </Button>
      </Form>
      {products !== null ? <ProductList datos={products}/> : <></>}
    </>
  );
};

export default SearchBar;
