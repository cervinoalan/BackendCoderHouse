const { Router } = require("express");
const CartsManager = require("../dao/mongoManager/CartsManager");
// const ProductM = require("../dao/fileSystemManagar/ProductManager");
const ProductManager = require("../dao/mongoManager/ProductManager");
const router = Router();

const pm = new ProductManager();
const cm = new CartsManager();

router.get("/realtimeproducts", async (req, res) => {
  const products = await pm.getProducts();
  res.render("realTimeProducts", {
    products,
  });
});

router.get("/chats", (req, res) => {
  res.render("chats");
});

router.get("/products", async (req, res) => {
  if (req.session.user) {
    const products = await pm.getProducts();
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
    });
  } else {
    res.render("login");
  }
});


router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cm.getCartByUsername(cid);
  const vista = cart.products.map((cart) => ({
    products: cart.product,
  }));
  res.render("cart", {
    vista,
  });
});

router.get("/", async (req, res) => {
  if (req.session.user) {
    const products = await pm.getProducts();
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
    });
  } else {
    res.render("login");
  }
});

router.get("/registrar", (req, res) => {
  if (req.session.user) {
    res.render("perfil", { name: req.session.user.first_name });
  } else {
    res.render("register");
  }
});

router.get("/perfil", (req, res) => {
  if (req.session.user) {
    res.render("perfil", { name: req.session.user.first_name });
  } else {
    res.render("login");
  }
});


module.exports = router;
