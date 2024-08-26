import { useState, useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  let total = 0;
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [priceFetched, togglePriceFetched] = useState(false);

  useEffect(() => {
    if (!cart.items) {
      return;
    }

    if (priceFetched) {
      return;
    }

    console.log("@cart items:, ", cart.items);

    fetch("/api/products/cart-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: Object.keys(cart.items),
      }),
    })
      .then((res) => res.json())
      .then((products) => {
        console.log("products from cart item: ", products);
        setProducts(products);
        togglePriceFetched(true);
      });
  }, [cart, priceFetched]);

  const getQty = (getProductId) => {
    return cart.items[getProductId];
  };

  const increament = (productId) => {
    const exstingQunatity = cart.items[productId];
    const _cart = { ...cart };
    _cart.items[productId] = exstingQunatity + 1;
    _cart.totalItem += 1;
    setCart(_cart);
  };

  const decreament = (productId) => {
    const exstingQunatity = cart.items[productId];

    if (exstingQunatity === 1) {
      return;
    }

    const _cart = { ...cart };
    _cart.items[productId] = exstingQunatity - 1;
    _cart.totalItem -= 1;
    setCart(_cart);
  };

  const handleReturnToShop = () => {
    navigate("/"); // Redirect to the home page
  };

  // get the sum of price of one product how many time added in the cart
  const getSum = (productId, price) => {
    const sum = price * getQty(productId);
    total += sum;
    return sum;
  };

  // following function is uses to delete the product from cart
  const handleDelete = (productId) => {
    const _cart = { ...cart };
    console.log("cart: ", _cart);
    const qty = _cart.items[productId];
    console.log("qty: ", qty);

    delete _cart.items[productId];
    _cart.totalItem -= qty;
    setCart(_cart);
    const updatedProductList = products.filter(
      (product) => product._id !== productId
    );
    toast.error("Item deleted!");
    setProducts(updatedProductList);
  };

  // Following function is used to handle order
  const handleOrderNow = () => {
    toast.success("Order placed successfully!");
    setProducts([]);
    setCart({});
  };

  return products.length ? (
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart items</h1>

      <ul>
        {products.map((product) => {
          return (
            <li className="mb-12" key={product._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center ">
                  <img className="h-16" src={product.image} alt="" />
                  <span className="font-bold ml-4 w-48">{product.name}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      decreament(product._id);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    -
                  </button>
                  <span className="px-4">{getQty(product._id)}</span>
                  <button
                    onClick={() => {
                      increament(product._id);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    +
                  </button>
                </div>
                <span>₹. {getSum(product._id, product.price)}</span>
                <button
                  onClick={() => {
                    handleDelete(product._id);
                  }}
                  className="bg-red-500 px-4 py-2 rounded-full leading-none text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="my-6" />
      <div className="text-right">
        <b>Grand Total:</b> ₹. {total}
      </div>
      <div className="text-right mt-6">
        <button
          onClick={handleOrderNow}
          className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
        >
          Order Now
        </button>
      </div>
    </div>
  ) : (
    <>
      <img className="mx-auto w-1/2 mt-8" src="/images/empty-cart.png" />

      <button
        onClick={handleReturnToShop}
        className="mx-auto my-4 flex justify-center item-center text-white font-normal px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
      >
        Return to shop
      </button>
    </>
  );
};

export default Cart;
