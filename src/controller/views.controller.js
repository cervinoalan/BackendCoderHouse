const CartsManager = require("../dao/mongoManager/CartsManager");
const ProductManager = require("../dao/mongoManager/ProductManager");
const cartsService = require("../repository/carts.service");


const getRealTimeProducts = async (req, res) => {
  const products = await ProductManager.getProducts();
  res.render("realTimeProducts", {
    products,
  });
};

const renderChats = async (req, res) => {
  res.render("chats");
};

const renderGetProducts = async (req, res) => {
  if (req.session.user) {
    const products = await ProductManager.getProducts();
    const view = products.docs.map((products) => ({
      title: products.title,
      description: products.description,
      price: products.price,
      stock: products.stock,
      thumbnail: products.thumbnail,
      code: products.code,
      id: products._id.toString(),
    }));
    res.render("home", {
      products: view,
      hasPrevPage: !products.hasPrevPage,
      hasNextPage: !products.hasNextPage,
      page: !products.page,
      name: req.session.user.first_name,
      lastname: req.session.user.last_name,
      rol: req.session.user.rol,
    });
  } else {
    res.render("login");
  }
};

const renderCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsService.getCartById(cid);
  console.log(cart)
  const products = cart.products.map((cart) => ({
    title: cart.product.title,
    description: cart.product.description,
    stock: cart.product.stock,
    price: cart.product.price,
    thumbnail: cart.product.thumbnail,
    code: cart.product.code,
    id: cart.product._id,
  }));
  console.log(products);
  res.render("cart", {
    products,
    cid,
  });
};

const renderLogin = async (req, res) => {
  if (req.session.user) {
    const products = await ProductManager.getProducts();
    const view = products.docs.map((products) => ({
      title: products.title,
      description: products.description,
      price: products.price,
      stock: products.stock,
      thumbnail: products.thumbnail,
      code: products.code,
      id: products._id.toString(),
    }));
    res.render("home", {
      products: view,
      hasPrevPage: !products.hasPrevPage,
      hasNextPage: !products.hasNextPage,
      page: !products.page,
      name: req.session.user.first_name,
      lastname: req.session.user.last_name,
      rol: req.session.user.rol,
    });
  } else {
    res.render("login");
  }
};

const renderRegister = async (req, res) => {
  if (req.session.user) {
    res.render("perfil", { name: req.session.user.first_name });
  } else {
    res.render("register");
  }
};

const renderPerfil = async (req, res) => {
  if (req.session.user) {
    res.render("perfil", { name: req.session.user.first_name });
  } else {
    res.render("login");
  }
};

const renderForgotPass = async (req, res) => {
  res.render("forgotpassword");
};

const renderForgotRecovery = async (req, res) => {
  res.render("forgotrecovery");
};

module.exports = {
  getRealTimeProducts,
  renderChats,
  renderGetProducts,
  renderCart,
  renderLogin,
  renderRegister,
  renderPerfil,
  renderForgotPass,
  renderForgotRecovery
};
