const express = require("express");
const {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
} = require("../controllers/product.js");

const router = express.Router();

router.post("/create", createProduct);
router.get("/getAll", getProducts);
router.get("/getById", getProductById);
router.delete("/delete", deleteProduct);
router.put("/update/:id", updateProduct);

module.exports = router;