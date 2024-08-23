const express = require("express");
const authRoutes = require("./auth");
const productRoutes = require("./product");
const cartRoutes = require("./cart");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
