
import axios from "axios";
import { useEffect, useState,} from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "../UI/CategoryCard";
import Loading from "../UI/Loading";
import "./UserPage.css";
const guitarra = [
  {
    name: "Guitarras Eléctricas",
    url: "https://res.cloudinary.com/pruebasmern/image/upload/v1648474799/Music%20Shop/guitar-electrica_ezzhjk.png", filter: 'ELÉCTRICA'
  },
  {
    name: "Guitarras Acústicas",
    url: "https://res.cloudinary.com/pruebasmern/image/upload/v1648475926/Music%20Shop/gui-acustica_tkpx6y.jpg",
    filter: 'ACÚSTICA'
  },
  {
    name: "Guitarra Española",
    url: "https://res.cloudinary.com/pruebasmern/image/upload/v1648475926/Music%20Shop/gui-espa%C3%B1ola_r7hoi0.png",
    filter: 'ESPAÑOLA'
  },
];
const bajos = [
  {
    name: "Bajos Eléctricos",
    url: "https://res.cloudinary.com/pruebasmern/image/upload/v1648476604/Music%20Shop/bajo_elec_dupray.jpg",
    filter: 'Eléctrico'
  },
  {
    name: "Bajos Acústicos",
    url: "https://res.cloudinary.com/pruebasmern/image/upload/v1648476598/Music%20Shop/bajo_acu_vsd1da.jpg",
    filter: 'Acústico'
  },
];
const percusion = [
  {
    name: "Batería Eléctrica",
    url: "https://res.cloudinary.com/pruebasmern/image/upload/v1648476782/Music%20Shop/bat_elec_cs87ux.jpg",
    filter: 'eléctrica'
  },
  {
    name: "Batería Acústica",
    url: "https://res.cloudinary.com/pruebasmern/image/upload/v1648476782/Music%20Shop/bat_acus_lwuolc.jpg",
    filter: 'acústica'
  },
];
const viento = [
  {
    name: "Flauta travesera",
    url: "https://res.cloudinary.com/pruebasmern/image/upload/v1648476895/Music%20Shop/flauta_trav_pg0non.png",
    filter: 'travesera'
  },
  {
    name: "Flauta Dulce",
    url: "https://res.cloudinary.com/pruebasmern/image/upload/v1648476964/Music%20Shop/flauta_dulce_fvidxp.png",
    filter: 'Dulce'
  },
];
const teclado = [
  { name: "Teclado Digital", url: "https://res.cloudinary.com/pruebasmern/image/upload/v1648477318/Music%20Shop/pidigital_l4ufy5.jpg", filter: 'TECLADO DIGITAL' },
  { name: "Piano Digital", url: "https://res.cloudinary.com/pruebasmern/image/upload/v1648477318/Music%20Shop/pidigital_l4ufy5.jpg",  filter: 'PIANO DIGITAL' },
  {
    name: "Piano Acústico",
    url: "https://res.cloudinary.com/pruebasmern/image/upload/v1648477318/Music%20Shop/pianoacus_af3mb5.webp", filter: 'PIANO ACÚSTICO'
  },
];

const CategoryFilter = () => {
  let  {id}  = useParams();
  const [tablaProducts, setTablaProducts] = useState(null);
  const [products, setProducts] = useState(null);
  const [loader, setLoader] = useState(true)
  
  const [tipo, setTipo] = useState(null)
  useEffect(() => {
    const peticionGet = async () => {
        let url
        if(id === 'teclado'){ url = '621784e468386d8ef6fbaa3f';
        setTipo(teclado)}
        if(id === 'viento'){ url = '6218af329a77f7030d41d8a9';
        setTipo(viento)}
        if(id === 'percusion'){ url = '6218af729a77f7030d41d8ab';
        setTipo(percusion)}
        if(id === 'bajo'){ url = '6218afad9a77f7030d41d8af';
        setTipo(bajos)}
        if(id === 'guitarra'){ url = '6218af919a77f7030d41d8ad';
        setTipo(guitarra)}
      await axios
        .get(`${process.env.REACT_APP_BACKEND}api/category/${url}`)
        .then((response) => {
          
          setTablaProducts({
            products: response.data.category.product_id,
            success: true,
          });
          setProducts({
            products: response.data.category.product_id,
            success: true,
          });
          setLoader(false)
        })
    
    };
    peticionGet();
  }, [id]);
  const search = (busqueda) => {
    setLoader(true)
    let resultadoBusqueda = tablaProducts.products.filter((elemento) => {
      if (
        elemento.subCat
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      )
        {return elemento;}
        return false;
    });
    setProducts({ success: true, products: resultadoBusqueda });
    setLoader(false)
    
  };
  return (
    <>
      {loader === true ? <Loading/> : <CategoryCard tipo={tipo} filtrar={search} datos={products}/>}
     
    </>
  );
};
export default CategoryFilter;
