const express = require("express");
const {
  createCart,
  addToCart,
  removeFromCart,
  getCartDetails,
} = require("../controllers/cart");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/", authMiddleware, createCart);
router.post("/add", authMiddleware, addToCart);
router.patch("/remove", authMiddleware, removeFromCart);
router.get("/", authMiddleware, getCartDetails);

module.exports = router;
