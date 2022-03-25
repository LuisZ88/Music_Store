import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import ProductForm from "./components/Products/ProductForm";
import NotFound from "./components/Nav/NotFound";
import ProductList from "./components/Products/ProductList";
import SearchBar from "./components/Nav/SearchBar";
import SignUp from "./components/Nav/SignUp";
import Login from "./components/Nav/Login";
import PrivateClient from "./components/Nav/PrivateClient";
import PrivateAdmin from "./components/Nav/PrivateAdmin";
import ProductPage from "./components/Products/ProductPage";
import CartProvider from "./components/Store/CartProvider";

function App() {
  return (
  <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<PrivateAdmin />}>
          <Route path="/admin/newproduct" element={<ProductForm/>}></Route>
        </Route>
        <Route path="/registro" element={<SignUp />}></Route>
        <Route path="/item/:id" element={<ProductPage/>}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/product/" element={<ProductList />}></Route>
        <Route path="/search" element={<SearchBar />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      </CartProvider>
  );
}

export default App;
