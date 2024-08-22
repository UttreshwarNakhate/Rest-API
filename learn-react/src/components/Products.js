// Parent component

import { CartContext } from "../CartContext";
import Product from "./Product";
import { useState, useEffect, useContext } from "react";

const Products = () => {
  // useState hook used to store product state
  const [products, setProducts] = useState([]);
  const [mode, setMode] = useState("online");

  try {
    useEffect(() => {
      fetch("/api/products")
        .then((response) => {
          return response.json();
        })
        .then((products) => {
          console.log("products: ", products);
          setProducts(products);
          localStorage.setItem("products", JSON.stringify(products));
        });
    }, []);
  } catch (error) {
    let collection = localStorage.getItem("products");
    setProducts(JSON.parse(collection));
    setMode("offline");
  }

  return (
    <>
      <div className="container mx-auto pb-24">
        <h1 className="text-lg font-bold my-8">Products </h1>

        <div className="my-4">
          {mode === "offline" ? (
            <div class="alert alert-warning" role="alert">
              No internet connection
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-5 my-8 gap-24">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
