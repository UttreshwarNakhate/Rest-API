// Child component use the the data of <Products/> parent component
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import { useContext } from "react";
import { useState } from "react";

const Product = (props) => {
  const [isAdding, setIsAdding] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const { product } = props;

  const addToCart = (event, product) => {
    event.preventDefault();
    console.log("Event: ", event, product);

    // check if product available or not in the cart if not assign empty object to cart variable
    let _cart = { ...cart };
    if (!_cart.items) {
      _cart.items = {};
    }

    // Check if product is alreay available if yes then increase qunatity by 1
    if (_cart.items[product._id]) {
      _cart.items[product._id] += 1;
    } else {
      // product is not in the cart then add 1
      _cart.items[product._id] = 1;
    }
    // Update totale items
    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;
    // set in the state
    setCart(_cart);
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);

    //   const cart = {
    //     items:{

    //       //product Id and how many times it present in the cart

    //     },
    //     totalItems:5
    //   }
  };

  return (
    <Link to={`/products/${product._id}`}>
      <div>
        <div>
          <img src={product.image} alt="peproni" />
          <div className="text-center">
            <h2 className="text-lg font-bold py-2">{product.name}</h2>
            <span className="bg-gray-200 py-1 rounded-full text-sm px-4">
              {product.size}
            </span>
          </div>
          <div className="flex justify-between item-center mt-4">
            <span>{product.price}</span>
            <button
              onClick={(e) => {
                addToCart(e, product);
              }}
              disabled={isAdding}
              className={`${
                isAdding ? "bg-green-500" : "bg-yellow-500"
              } py-1 px-4 rounded-full font-bold `}
            >
              ADD{isAdding ? "ED" : ""}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
