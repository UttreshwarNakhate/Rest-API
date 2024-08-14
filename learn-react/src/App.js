import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navigation from "./components/Navigation";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";

const App = () => {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" Component={Home} exact></Route>
          <Route path="/about" Component={About}></Route>
          <Route path="/products" exact Component={Products}></Route>
          <Route path="/products/:_id" Component={SingleProduct}></Route>
          <Route path="/cart" Component={Cart}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
