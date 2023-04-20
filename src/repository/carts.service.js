//MONGO
const CartsManager = require("../dao/mongoManager/CartsManager");

//MEMOERY
// const CartsManagerFS = require("../dao/fileSystemManagar/CartsManagerFS");

class CartService {
  createCart = (cart) => CartsManager.createCart(cart);
  getCarts = () => CartsManager.getCarts();
  getCartByUsername = (cid) => CartsManager.getCartByUsername(cid);
  getCartById = (cid) => CartsManager.getCartByUsername(cid);
  updateCartProducts = (cart) => CartsManager.updateCartProducts(cart);
  updateCart = (cid, newCart) => CartsManager.updateCart(cid, newCart);
}

module.exports = new CartService();
