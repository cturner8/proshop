import path from "path";
import express from "express";
import dotenv from "dotenv";
import "colors";
import morgan from "morgan";

import connectDB from "./config/db.js";

import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

import { notFound, errorHandler } from "./middleware/error.middleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (_, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const ___dirname = path.resolve();
app.use("/uploads", express.static(path.join(___dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`server running in ${ENV} on port ${PORT}`.yellow.bold)
);
