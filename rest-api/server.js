import express from "express";
import routes from "./routes/index.js";
import errorHandler from "../REST-API-PIZZA/rest-api/controllers/middlewares/errorHandler.js";
import { APP_PORT } from "./config";
import mongoose from "mongoose";
const app = express();

// Database connection
mongoose.connect(DB_URL)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', ()=> {
  console.log("Database connected...")
})

app.use(express.json());
app.use("/api", routes);

app.use(errorHandler);
app.listen(APP_PORT, () => {
  console.log(`Listening on port  ${APP_PORT}`);
});
