
const Product = (props) => {
    console.log("prope", props.product)
    const {product } = props
    return (
        <div>
            <div>
                <img src={product.image} alt="peproni" />
                <div className="text-center">
                    <h2 className="text-lg font-bold py-2">{product.name}</h2>
                    <span className="bg-gray-200 py-1 rounded-full text-sm px-4">{product.size}</span>
                </div>
                <div className="flex justify-between item-center mt-4">
                    <span>{product.price}</span>
                    <button className="bg-yellow-500 py-1 px-4 rounded-full font-bold">add</button>
                </div>
            </div>
        </div>
    )
}
 
export default Product
