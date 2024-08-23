import express from "express";
import routes from "./routes";
import { APP_PORT, DB_URL } from "./config";
const app = express();
import errorHandler from "./middlewares/errorHandler";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";

// Database connection
mongoose.connect(
  "mongodb+srv://uttreshwarnakhate:answer123@answerapi.yeplyja.mongodb.net/rest-api",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected...");
});
// Enable CORS for all routes
app.use(cors());
global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

app.use(errorHandler);
app.listen(5000, () => {
  console.log(`Listening on port   5000`);
});
