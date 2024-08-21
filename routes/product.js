const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.js");
const authMiddleware = require("../middleware/auth.js");

const router = express.Router();

router.post("/create", authMiddleware, createProduct);
router.get("/getAll", getProducts);
router.get("/getById", getProductById);
router.delete("/delete", authMiddleware, deleteProduct);
router.put("/update/:id", authMiddleware, updateProduct);

module.exports = router;
