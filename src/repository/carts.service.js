const CartsManager = require("../dao/mongoManager/CartsManager");

const cm = new CartsManager();

class CartService {

    createCart = (cart) => cm.createCart(cart);
    getCarts = () => cm.getCarts();
    getCartByUsername = (cid) => cm.getCartByUsername(cid);
    addProductToCart = (cid) => cm.getCartByUsername(cid);
    updateCartProducts = (cart) => cm.updateCartProducts(cart);
    updateCart = (cid, newCart) => cm.updateCart(cid, newCart);
  }
  
  module.exports = new CartService();
  