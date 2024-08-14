import { Link } from "react-router-dom";
const Navigation = () => {
  // Way to add css
  const cartStyle = {
    background: "#F59E0D",
    display: "flex",
    padding: "6px 12px",
    borderRadius: "50px",
  };

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
            <Link to="/cart">
              <div style={cartStyle}>
                <span className="mr-2">10</span>
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
