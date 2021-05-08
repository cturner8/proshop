import asyncHandler from "express-async-handler";

import Product from "../models/product.model.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Fetch a single product
// @route GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const document = await Product.findById(req.params.id);
  if (document) {
    await document.remove();
    res.json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const document = new Product({
    name: "Sample name",
    price: 0,
    user: req.user.id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdDocument = await document.save();
  res.status(201).json(createdDocument);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const document = await Product.findById(req.params.id);

  const {
    name = document.name,
    price = document.price,
    description = document.description,
    image = document.image,
    brand = document.brand,
    category = document.category,
    countInStock = document.countInStock,
  } = req.body;

  if (document) {
    document.name = name;
    document.price = price;
    document.description = description;
    document.image = image;
    document.brand = brand;
    document.category = category;
    document.countInStock = countInStock;

    const updatedDocument = await document.save();
    res.status(201).json(updatedDocument);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
