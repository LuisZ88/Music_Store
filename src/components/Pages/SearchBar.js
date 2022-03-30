import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../Products/ProductList";
import { FormControl, Button, Form, Container } from "react-bootstrap";
import Loading from "../UI/Loading";
import './UserPage.css'
const SearchBar = (props) => {
  const [products, setProducts] = useState(null);
  const [tablaProducts, setTablaProducts] = useState(null);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    const peticionGet = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND}api/product`)
        .then((response) => {
          setProducts(response.data);
          setTablaProducts(response.data);
        })
        .then(setLoading(false))
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
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
  };
  const searchClick = (event) => {
    search(filter);
  };
  const search = (busqueda) => {
    setLoading(true)
    let resultadoBusqueda = tablaProducts.products.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.category
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.subCat
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      )
        return {
          elemento
          };
          return setLoading(false);
  });
    setLoading(false)
    setProducts({ success: true, products: resultadoBusqueda });
  };
  return (
    <>
      {loading === true ? 
        <Loading />
     : (
        <Container className="invoice pt-2">
          <Form className="d-flex mb-5 mt-2">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={filter}
              onChange={filterChange}
              onKeyDown={enterKeyDown}
            />
            <Button variant="secondary" onClick={searchClick}>
              Buscar
            </Button>
          </Form>
          {products !== null ? <ProductList datos={products} /> : <Loading/>}
        </Container>
      )}
    </>
  );
};

export default SearchBar;
