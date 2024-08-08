import Product from "./Product"
import { useState, useEffect } from "react"


const Products = () => {

  // useState hook used to store product state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Function mounted...")

    fetch('/server/api/product')
      .then(response =>{ 
        console.log("response: ", response)
        return response.json()
      })     
      .then(products => {
        console.log("products: ", products)
        setProducts(products)
      })
  }, [])

  return (
    <>
      <div className="container mx-auto pb-24">
        <h1 className="text-lg font-bold my-8">Products</h1>
        <div className="grid grid-cols-5 my-8 gap-24">
          {
            productsArray.map(product => <Product key={product._id} product={product}/>)
          }
        </div>
      </div> 
    </>
  )
}

export default Products
