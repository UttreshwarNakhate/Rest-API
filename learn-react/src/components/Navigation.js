import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import { useContext } from "react";

const Navigation = () => {
  // Way to add css
  const cartStyle = {
    background: "#F59E0D",
    display: "flex",
    padding: "6px 12px",
    borderRadius: "50px",
  };

  const { cart } = useContext(CartContext);

  return (
    <>
      <nav className="container mx-auto flex item-center justify-between py-4">
        <Link to="/">
          <img style={{ height: 45 }} src="/images/logo.png" alt="pizzaLogo" />
        </Link>

        <ul className="flex item-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="ml-6">
            <Link to="/productsPage">Products</Link>
          </li>
          <li className="ml-6">
            <Link to="/about">About</Link>
          </li>
          <li className="ml-6">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="ml-6">
            <Link to="/profileDetails">Users</Link>
          </li>
          <li className="ml-6">
            <Link to="/cart">
              <div style={cartStyle}>
                <span className="mr-2">
                  {cart.totalItems ? cart.totalItems : 0}
                </span>
                <img src="/images/cart.png" alt="cart-icon" />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
