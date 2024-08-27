const { Cart, Product } = require("../db/models/index");

const createCart = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const existingCart = await Cart.findOne({ where: { userId } });
    if (existingCart) {
      return res
        .status(200)
        .json({ message: "Cart already exists", cart: existingCart });
    }
    const cart = await Cart.create({ userId, productIds: [] });
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

const getCartDetails = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not Found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not Found" });
    }
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not Found" });
    }
    cart.productIds.push(productId);
    await Cart.update(
      { productIds: cart.productIds },
      { where: { id: cart.id } }
    );

    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not Found" });
    }
    const productIndex = await cart.productIds.indexOf(productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not Found in Cart" });
    }
    cart.productIds.splice(productIndex, 1);
    await Cart.update(
      { productIds: cart.productIds },
      { where: { id: cart.id } }
    );

    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCart,
  getCartDetails,
  addToCart,
  removeFromCart,
};
