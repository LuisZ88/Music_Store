import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import NewProduct from "./components/Products/NewProduct";
import NotFound from "./components/Pages/NotFound";
import ProductList from "./components/Products/ProductList";
import SearchBar from "./components/Pages/SearchBar";
import SignUp from "./components/Pages/SignUp";
import Login from "./components/Pages/Login";
import PrivateClient from "./components/Nav/PrivateClient";
import PrivateAdmin from "./components/Nav/PrivateAdmin";
import ProductPage from "./components/Pages/ProductPage";
import CartProvider from "./components/Store/CartProvider";
import { useContext } from "react";
import AuthContext from "./components/context/auth-context";
import CartCheckout from "./components/Pages/CartCheckout";
import UserPage from "./components/Pages/UserPage";
import CategoryFilter from "./components/Pages/CategoryFilter";
import HomePage from "./components/Pages/HomePage";
import Footer from "./components/Nav/Footer";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/"
          element={
            authCtx.isLoggedIn === true ? (
              <PrivateClient />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="/user" element={<UserPage />}></Route>
        </Route>
        <Route path="/admin" element={<PrivateAdmin />}>
          <Route path="/admin/newproduct" element={<NewProduct />}></Route>
        </Route>
        <Route
          path="/registro"
          element={
            authCtx.isLoggedIn === false ? (
              <SignUp />
            ) : (
              <Navigate to="/search" />
            )
          }
        ></Route>
        <Route path="/item/:id" element={<ProductPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/product/" element={<ProductList />}></Route>
        <Route path="/search" element={<SearchBar />}></Route>
        <Route path="/category/:id" element={<CategoryFilter />}></Route>

        <Route
          path="/login"
          element={
            authCtx.isLoggedIn === false ? <Login /> : <Navigate to="/search" />
          }
        ></Route>
        <Route path="/payment" element={<CartCheckout />}></Route>
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;
