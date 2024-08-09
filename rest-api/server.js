import express from "express";
import routes from "./routes";
import { APP_PORT, DB_URL } from "./config";
const app = express();
import errorHandler from "./middlewares/errorHandler";
import mongoose from "mongoose";

// Database connection
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected...");
});

app.use(express.json());
app.use("/api", routes);

app.use(errorHandler);
app.listen(APP_PORT, () => {
  console.log(`Listening on port  ${APP_PORT}`);
});
