import express from "express";
import multer from "multer";
import path from "path";
import {
  createCategorys,
  deleteCategory,
  getCategoryById,
  getCategorys,
} from "../controller/categoryController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname.replace(/\s/g, "_"));
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

import {
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controller/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getCategorys).post(protect, admin, getCategorys);
router
  .route("/add")
  .get(getCategorys)
  .post(protect, admin, upload.single("image"), createCategorys);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, upload.single("image"), updateProduct);
  

export default router;
