import { useState, useContext, useEffect } from "react";
import { CartContext } from "../CartContext";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!cart.items) {
      return;
    }
    fetch("api/products/cart-items", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ids: Object.keys(cart.items),
      }),
    })
      .then((res) => res.json())
      .then((products) => {
        // console.log("products", products);
        setProducts(products);
      });
  }, [cart]);

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
    const _cart = { ...cart };
    _cart.items[productId] = exstingQunatity - 1;
    _cart.totalItem -= 1;
    setCart(_cart);
  };

  return (
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart items</h1>

      <ul>
        {products.map((product) => {
          return (
            <li className="mb-12">
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
                <button className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="my-6" />
      <div className="text-right">
        <b>Grand Total:</b> ₹ 1000
      </div>
      <div className="text-right mt-6">
        <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
