//MONGO
const CartsManager = require("../dao/mongoManager/CartsManager");

//MEMOERY
// const CartsManagerFS = require("../dao/fileSystemManagar/CartsManagerFS");

class CartService {
  createCart = (cart) => CartsManager.createCart(cart);
  getCarts = () => CartsManager.getCarts();
  getCartById = (cid) => CartsManager.getCartById(cid);
  updateCartProducts = (cart) => CartsManager.updateCartProducts(cart);
  updateCart = (cid, newCart) => CartsManager.updateCart(cid, newCart);
  purchaseCart = (ticket) => CartsManager.purchaseCart(ticket);
  deleteProductFromCart = (cid, pid) =>
    CartsManager.deleteProductFromCart(cid, pid);
}

module.exports = new CartService();
