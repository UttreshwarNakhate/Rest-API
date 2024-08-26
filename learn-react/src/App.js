import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navigation from "./components/Navigation";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import ProductsPage from "./pages/ProductsPage";
import { CartContext } from "./CartContext";
import { useEffect, useState } from "react";
import "./App.css";
// import { messaging, getToken } from "./firebase";
import ProfileDetails from "./pages/ProfileDetails";
import { getCart, storeCart } from "./Helpers";

const App = () => {
  const [cart, setCart] = useState({});

  // Fetch from localstorage
  useEffect(() => {
    getCart().then((cart) => {
      setCart(JSON.parse(cart) || {});
    });
  }, []);

  useEffect(() => {
    storeCart(JSON.stringify(cart));
  }, [cart]);

  // useEffect(() => {
  //   const requestPermission = async () => {
  //     try {
  //       const permission = await Notification.requestPermission();
  //       if (permission === "granted") {
  //         const token = await getToken(messaging, {
  //           vapidKey:
  //             "BB56iy2JjSGmRUAb3zNk84aJubxLCdM92NNz_GnwbzL6UuOYCJLGpt3DZsB-U5H2i6LICtNQENpKpxxKWQT7mLw",
  //         });
  //         console.log("FCM token:", token);
  //       } else {
  //         console.error("Permission not granted for Notification");
  //       }
  //     } catch (err) {
  //       console.error("Error getting token", err);
  //     }
  //   };

  //   requestPermission();
  // }, []);

  return (
    <Router>
      <CartContext.Provider value={{ cart, setCart }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/productsPage" element={<ProductsPage />} />
          <Route path="/products/:_id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profileDetails" element={<ProfileDetails />} />
        </Routes>
      </CartContext.Provider>
    </Router>
  );
};

export default App;
