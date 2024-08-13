import Joi from "joi";

// Validate request
const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  size: Joi.string().required(),
  Image: Joi.string(),
});

export default productSchema;
