import { BrowserRouter as Router, Routes, Route, json } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from './pages/Profile'
import Navigation from "./components/Navigation";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import ProductsPage from "./pages/ProductsPage";
import { CartContext } from "./CartContext";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState({});

  // fetch from localstorage
  useEffect(() => {
    const cart = window.localStorage.getItem("cart");
    setCart(JSON.parse(cart));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Router>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navigation />
          <Routes>
            <Route path="/" Component={Home} exact></Route>
            <Route path="/about" Component={About}></Route>
            <Route path="/profile" Component={Profile}></Route>
            <Route path="/productsPage" exact Component={ProductsPage}></Route>
            <Route path="/products/:_id" Component={SingleProduct}></Route>
            <Route path="/cart" Component={Cart}></Route>
          </Routes>
        </CartContext.Provider>
      </Router>
    </>
  );
};

export default App;
