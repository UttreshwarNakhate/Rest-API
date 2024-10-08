import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const [product, setProduct] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params._id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const product = await response.json();
        setProduct(product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [params._id]);

  return (
    <div className="container mx-auto mt-12">
      <button
        className="mb-12 font-bold rounded-md text-white bg-gray-400 px-4 py-2"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="flex">
        <img
          src={product.image}
          alt="pizza"
          className="w-70 h-64 object-cover"
        />
        <div className="ml-16">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold mt-2">₹. {product.price}</div>
          <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
