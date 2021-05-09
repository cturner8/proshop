import asyncHandler from "express-async-handler";

import Product from "../models/product.model.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const { keyword, pageNumber } = req.query;

  const pageSize = 10;
  const page = Number(pageNumber) || 1;

  const searchKeyword = keyword
    ? {
        name: {
          $regex: keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...searchKeyword });
  const products = await Product.find({ ...searchKeyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private
export const createProductReview = asyncHandler(async (req, res) => {
  const document = await Product.findById(req.params.id);

  const { rating, comment } = req.body;

  if (document) {
    const alreadyReviewed = document.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    document.reviews.push(review);
    document.numReviews = document.reviews.length;
    document.rating =
      document.reviews.reduce((acc, item) => item.rating + acc, 0) /
      document.reviews.length;

    await document.save();
    res.status(201).json({ messsage: "review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
