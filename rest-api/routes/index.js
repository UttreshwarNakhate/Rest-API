import express from "express";
const router = express.Router();
import {
  registerController,
  refreshController,
  loginController,
  userController,
  productController,
} from "../controllers";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import multer from "multer";
import imageModel from "../models/image-model";
import cors from "cors";
import path from "path";
import { ImageModel } from "../models";

const app = express();
app.use(express.json());
// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies to be sent with the request
  })
);
// Enable CORS for all routes
app.use(cors());

app.use(express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout", auth, loginController.logout);

// products
router.post("/products", productController.store);
router.put("/products/:id", [auth, admin], productController.update);
router.delete("/products/:id", [auth, admin], productController.destroy);
router.get("/products", productController.index);
router.get("/products/:id", productController.show);

router.post("/products/cart-items", productController.getProducts);

// Route to inset data in database
router.post("/single", upload.single("image"), async (req, res) => {
  console.log("File: ", req.file);

  try {
    const { path, filename } = req.file;
    const { name, mobile, email, age, qualification, address } = req.body;

    const image = new imageModel({
      name,
      mobile,
      email,
      age,
      qualification,
      address,
      image: {
        path,
        filename,
      },
    });

    await image.save();
    res.send({ msg: "Image uploaded sucessfully..." });
  } catch (error) {
    console.log("Error occured: ", error);
  }
});

router.get("/images", async (req, res) => {
  try {
    const users = await ImageModel.find({});
    res.json(users);

    console.log("users: ", users);
  } catch (error) {
    res.send({ Error: "Unable to get users" });
  }
});

export default router;
