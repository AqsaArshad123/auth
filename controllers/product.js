const Product = require("../db/models/Product.js");

const createProduct = async (req, res, next) => {
    const { name, price, description, manufacturer, stock } = req.body;
    try {
        const product = await Product.create({
            name,
            price,
            description,
            manufacturer,
            stock,
        });
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    const { id } = req.body;
    try {
        const product = await Product.findByPK(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    const { id } = req.body;
    try {
        const product = await Product.findByPK(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.remove();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};
