import express from "express";
import dotenv from "dotenv";
import "colors";

import connectDB from "./config/db.js";
import products from "./data/products.js";

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/product/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(
  PORT,
  console.log(`server running in ${ENV} on port ${PORT}`.yellow.bold)
);
