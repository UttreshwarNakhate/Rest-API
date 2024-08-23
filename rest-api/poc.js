import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import contactRoute from "./route/contact.route.js";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// app.use(
//   cors({ origin: "https://bookstoreapplication-pwa-dqf4-gcgf5nhpj.vercel.app" })
// );
// app.use(cors({ origin: "https://bookstoreapplication-pwa-dqf4.vercel.app" }));

app.use(cors());
app.options("*", cors());

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGODBURI = process.env.MongoDBURI;

app.use(
  cors({
    origin: ["https://bookstoreapplication-pwa-dqf4.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

//connect to mongodb
try {
  mongoose.connect(MONGODBURI);
  console.log("Connected to Mongo");
} catch (error) {
  console.log("error connecting to ", error);
}

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
