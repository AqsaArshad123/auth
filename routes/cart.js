const express = require("express");
const {
  createCart,
  addToCart,
  removeFromCart,
  getCartByUserId,
} = require("../controllers/cart");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/", authMiddleware, createCart);
router.post("/add/:userId", authMiddleware, addToCart);
router.patch("/remove/:userId", authMiddleware, removeFromCart);
router.get("/:userId", authMiddleware, getCartByUserId);

module.exports = router;
