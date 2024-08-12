import { Product } from "../models";
import multer from "multer";
import path from "path";
import CustomErrorHandler from "../services/CustomErrorHandler";
import fs from "fs";
import Joi from "joi";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 }, // 5MB
}).single("image");

const productController = {
  async store(req, res, next) {
    handleMultipartData(req, res, async (error) => {
      if (error) {
        return next(CustomErrorHandler.serverError(error.message));
      }

      const filePath = req.file.path;

      // Validate request
      const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        size: Joi.string().required(),
      });

      const { error: validationError } = productSchema.validate(req.body);

      if (validationError) {
        // Delete the iploaded image
        fs.unlink(`${appRoot}/${filePath}`, (unlinkError) => {
          return next(CustomErrorHandler.serverError(unlinkError.message));
        });

        return next(validationError);
      }

      const { name, price, size } = req.body;

      let document;
      try {
        document = await Product.create({
          name,
          price,
          size,
          image: filePath,
        });
      } catch (error) {
        return next(error);
      }

      // Here, you can save the file information to the database or perform other actions
      res.status(201).json(document);
    });
  },
};

export default productController;
