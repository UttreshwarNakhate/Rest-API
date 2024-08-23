import express from "express";
import routes from "./routes";
import { APP_PORT, DB_URL } from "./config";
const app = express();
import errorHandler from "./middlewares/errorHandler";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";

// app.use(
//   cors({
//     origin: ["https://pizza-backend-chi.vercel.app/"],
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.includes(origin) || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

// Database connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected...");
});
// Enable CORS for all routes
global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));
app.use(cors())

app.use(errorHandler);

app.listen(APP_PORT, () => {
  console.log(`Listening on port  ${APP_PORT}`);
});
