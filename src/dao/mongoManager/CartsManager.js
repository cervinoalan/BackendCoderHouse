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
      const cart = await cartsModel
        .findOne({ username })
        .populate("products.product");
        console.log(JSON.stringify(cart))
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
    try {
      const cart = await cartsModel.create(newCart);
      return cart;
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        payload: "Error al agregar producto al Carrito",
      });
    }
  };

  updateCartProducts = async (cart) => {
    try {
      const cartUpdated = await cartsModel.findOneAndUpdate(
        { username: cart.username },
        cart,
        {
          new: true,
        }
      );
      return cartUpdated;
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        payload: "Error al buscar el Carrito",
      });
    }
  };
}

module.exports = CartsManager;
