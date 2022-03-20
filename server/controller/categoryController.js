import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import mongoose from "mongoose";
import fs from "fs";
//@desc       Fetch All Categorys
//@route      GET /api/Categorys
//@access     Public
const getCategorys = asyncHandler(async (req, res) => {

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

  const count = await Category.countDocuments({ ...keyword });
  const Categorys = await Category.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

   

  res.json({ Categorys, page, pages: Math.ceil(count / pageSize) });
});

//@desc       Fetch a single Categorys
//@route      GET /api/Categorys/:id
//@access     Public
const getCategoryById = asyncHandler(async (req, res) => {
  const Category = await Category.findById(req.params.id);

  if (Category) {
    res.json(Category);
  } else {
    res.status(404);
    throw new Error("Category Not Found!");
  }
});

//@desc       Delete  a Category
//@route      DELETE /api/Categorys/:id
//@access     Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const CategoryObj = await Category.findById(req.params.id);

  if (CategoryObj) {
    await CategoryObj.remove();
    res.json({ messsage: "Category Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Category Not Found!");
  }
});

const createCategorys = asyncHandler(async (req, res) => {
  //image upload code
  const image = req.file.path;
  const CategoryObj = new Category({
    title: req.body.title,
    image,
    description: req.body.description,
  });
  const createdCategory = await CategoryObj.save();
  if (createdCategory) {
    res.status(200).json(createdCategory);
  } else {
    res.status(400);
    throw new Error("Category not created");
  }
});

//@desc       Get Top rated Categorys
//@route      GET /api/Categorys/top
//@access     Public
const getTopCategorys = asyncHandler(async (req, res) => {
  const Categorys = await Category.find({}).sort({ rating: -1 }).limit(3);

  res.json(Categorys);
});
export { getCategorys, deleteCategory, createCategorys,getCategoryById, getTopCategorys };
