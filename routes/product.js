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

router.post("/", authMiddleware, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", authMiddleware, deleteProduct);
router.put("/:id", authMiddleware, updateProduct);

module.exports = router;
