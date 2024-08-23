import { Product } from "../models";
import multer from "multer";
import path from "path";
import CustomErrorHandler from "../services/CustomErrorHandler";
import fs from "fs";
import productSchema from "../validators/productValidator";

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
      const { error: validationError } = productSchema.validate(req.body);

      if (validationError) {
        // Delete the iploaded image
        fs.unlink(`${appRoot}/${filePath}`, (unlinkError) => {
          if (unlinkError) {
            return next(CustomErrorHandler.serverError(unlinkError.message));
          }
        });

        return next(validationError);
      }

      const { name, price, size } = req.body;

      console.log(name, price, size);

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
      console.log("document: ", document);

      // Here, you can save the file information to the database or perform other actions
      res.status(201).json(document);
    });
  },

  async update(req, res, next) {
    handleMultipartData(req, res, async (error) => {
      if (error) {
        return next(CustomErrorHandler.serverError(error.message));
      }

      let filePath;
      if (req.file) {
        filePath = req.file.path;
      }

      const { error: validationError } = productSchema.validate(req.body);

      if (validationError) {
        if (req.file) {
          // Delete the iploaded image
          fs.unlink(`${appRoot}/${filePath}`, (unlinkError) => {
            if (unlinkError) {
              return next(CustomErrorHandler.serverError(unlinkError.message));
            }
          });
        }
        return next(validationError);
      }

      // destructure the req body
      const { name, price, size } = req.body;

      let document;
      try {
        document = await Product.findOneAndUpdate(
          { _id: req.params.id },
          {
            name,
            price,
            size,
            ...(req.file && { image: filePath }),
          },
          { new: true }
        );
        console.log(document);
      } catch (error) {
        return next(error);
      }
      console.log("document: ", document);

      // Here, you can save the file information to the database or perform other actions
      res.status(201).json(document);
    });
  },

  // Delete product
  async destroy(req, res, next) {
    const document = await Product.findOneAndRemove({ _id: req.params.id });
    console.log(document);
    if (!document) {
      return next(new Error("Product is not available to delete"));
    }
    // Image delete
    const imagePath = document._doc.image;
    console.log("ImagePath", imagePath);

    fs.unlink(`${appRoot}/${imagePath}`, (error) => {
      if (error) {
        return next(CustomErrorHandler.serverError());
      }
      return res.json(document);
    });
  },

  // Get all products
  async index(req, res, next) {
    let documents;
    // Pagination Mongoose pagination library for pagination)
    try {
      documents = await Product.find()
        .select("-__v, -updatedAt")
        .sort({ _id: -1 });
      console.log("All products: ", documents);
    } catch (error) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },

  // Get single product
  async show(req, res, next) {
    let document;
    try {
      document = await Product.findOne({ _id: req.params.id }).select(
        "-__v, -updatedAt"
      );
    } catch (error) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(document);
  },

  // Get products for cart
  async getProducts(req, res, next) {
    let documents;
    try {
      documents = await Product.find({
        _id: { $in: req.body.ids },
      }).select("-updatedAt -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },
};

export default productController;
