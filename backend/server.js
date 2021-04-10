import express from "express";
import dotenv from "dotenv";
import "colors";

import connectDB from "./config/db.js";

import productRoutes from "./routes/product.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`server running in ${ENV} on port ${PORT}`.yellow.bold)
);
