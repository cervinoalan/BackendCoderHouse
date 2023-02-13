const cartsModel = require("../models/carts.model");

class CartsManager {
  constructor() {
    this.carts = [];
  }

  createCart = async (cart) => {
    try {
      const newCart = await cartsModel.create(cart);
      return newCart;
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        payload: "Error al Crear el Carrito",
      });
    }
  };

  getCarts = async () => {
    try {
      const carts = await cartsModel.find();
      return carts;
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        payload: "Error al buscar los Carritos",
      });
    }
  };

  getCartByUsername = async (username) => {
    try {
      const cart = await cartsModel.findOne({ username });
      return cart;
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        payload: "Error al buscar el Carrito",
      });
    }
  };

  getCartsById = async (id) => {
    try {
      const cart = await cartsModel.findById(id);
      return cart;
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        payload: "Error al buscar el Carrito",
      });
    }
  };

  addProductToCart = async (newCart) => {
    const cart = await cartsModel.create(newCart);
    return cart;
  }

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
