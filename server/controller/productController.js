import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import mongoose from "mongoose";
import fs from "fs";
//@desc       Fetch All products
//@route      GET /api/products
//@access     Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc       Fetch a single products
//@route      GET /api/products/:id
//@access     Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found!");
  }
});

//@desc       Delete  a product
//@route      DELETE /api/products/:id
//@access     Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ messsage: "Product Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Product Not Found!");
  }
});

//@desc       Create a product
//@route      POST /api/products
//@access     Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc       Upudate a product
//@route      PUT /api/products/:id
//@access     Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  //update product like we did in rekojako
  const product = await Product.findById(req.params.id);

  if (product) {
    console.log(req.file);
    if (req.file) {
      if (fs.existsSync("./uploads/" + product.image) && product.image != "") {
        fs.unlinkSync("./uploads/" + product.image);
      }

      req.body.image = req.file.path;
    }
    let updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(updatedProduct);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    }
  } else {
    res.status(404);
    throw new Error("Product Not Found!");
  }
});

//@desc       Create new review
//@route      POST /api/products/:id/reviews
//@access     Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
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

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProducts = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  console.log(req.file);
  //image upload code
  const image = req.file.path;
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image,
    user: mongoose.Types.ObjectId(req.user._id),
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    numReviews: 0,
    description: req.body.description,
  });
  const createdProduct = await product.save();
  if (createdProduct) {
    res.status(201).json(createdProduct);
  } else {
    res.status(400);
    throw new Error("Product not created");
  }
});

//@desc       Get Top rated products
//@route      GET /api/products/top
//@access     Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

const getProductsByCategory = asyncHandler(async (req, res) => {

  const products = await Product.find({ category: req.params.id }).populate("category");

  if (products?.length > 0) {
    res.status(200).json({
      data: products,
    });
  } else {
    res.status(201).json({
      data: [],
      message: "No products found",
    });
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  createProducts,
  getProductsByCategory,
};
