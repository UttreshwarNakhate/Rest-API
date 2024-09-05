import express from "express";
const router = express.Router();
import { registerController } from "../controllers";

// Route to register the user
router.post("/register", registerController.register);

export default router;
