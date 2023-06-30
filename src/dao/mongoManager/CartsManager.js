const cartsModel = require("../models/carts.model");
const ticketModel = require("../models/ticket.model");

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

  addProductToCart = async (cid, product) => {
    const cart = await cartsModel.findById(cid);

    const productIndex = cart.products.findIndex(
      (prod) => prod.product.toString() === product.id
    );

    if (productIndex === -1) {
      const newCart = {
        totalPrice: cart.totalPrice + product.price,
        totalQuantity: cart.totalQuantity + 1,
        products: [...cart.products, ...[{ product: product.id }]],
        id: cart.id,
      };
      const result = await this.updateCartProducts(newCart);
    } else {
      const newCart = {
        totalPrice: cart.totalPrice + product.price,
        totalQuantity: cart.totalQuantity + 1,
        products: cart.products.map((cartProduct) =>
          cartProduct.product.toString() === product.id
            ? {
                ...cartProduct,
                quantity: ++cartProduct.quantity,
              }
            : cartProduct
        ),
        id: cart.id,
      };
      const result = await this.updateCartProducts(newCart);
    }
  };

  getCartByUsername = async (username) => {
    const cart = await cartsModel
      .findOne({ username })
      .populate("products.product");
    return cart;
  };

  getCartById = async (cid) => {
    const cart = await cartsModel.findById(cid).populate("products.product");
    return cart;
  };

  updateCart = async (cid, cart) => {
    return await cartsModel.updateOne({ username: cid }, cart);
  };

  updateCartProducts = async (cart) => {
    const cartUpdated = await cartsModel.findByIdAndUpdate(cart.id, cart, {
      new: true,
    });
    return cartUpdated;
  };

  purchaseCart = async (ticket) => {
    const newTicket = await ticketModel.create(ticket);
    return newTicket;
  };

  deleteProductFromCart = async (cid, pid) => {
    const deleteProduct = await cartsModel.findOneAndUpdate(
      { username: cid },
      {
        $pull: { products: { pid } },
      }
    );
    return deleteProduct;
  };
}

module.exports = new CartsManager();
