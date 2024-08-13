import mongoose from "mongoose";
import { APP_URL } from "../config";

const schema = mongoose.Schema;

const productSchema = new schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    image: {
      type: String,
      required: true,
      get: (image) => {
        // http://localhost:5000/uploads/uploads/1723491948560-516571190.png
        return `${APP_URL}/${image}`;
      },
    },
  },
  { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model("Product", productSchema, "products");
 