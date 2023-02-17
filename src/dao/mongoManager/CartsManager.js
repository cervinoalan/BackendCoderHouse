const cartsModel = require("../models/carts.model");

class CartsManager {
  constructor() {
    this.carts = [];
  }

  createCart = async (cart) => {
    const newCart = await cartsModel.create(cart);
    return newCart;
  };

  getCarts = async () => {
    const carts = await cartsModel.find();
    return carts;
  };

  getCartByUsername = async (username) => {
    const cart = await cartsModel
      .findOne({ username })
      .populate("products.product");
    return cart;
  };

  getCartsById = async (id) => {
    const cart = await cartsModel.findById(id);
    return cart;
  };

  updateCartProducts = async (cart) => {
    const cartUpdated = await cartsModel.findOneAndUpdate(
      { username: cart.username },
      cart,
      {
        new: true,
      }
    );
    return cartUpdated;
  };
}

module.exports = CartsManager;
