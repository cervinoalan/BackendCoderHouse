const { Router } = require("express");
const CartsManager = require("../dao/mongoManager/CartsManager");
// const ProductM = require("../dao/fileSystemManagar/ProductManager");
const ProductManager = require("../dao/mongoManager/ProductManager");
const router = Router();

const pm = new ProductManager();
const cm = new CartsManager();

router.get("/", async (req, res) => {
  const products = await pm.getProducts();
  const view = products.docs.map((products) => ({
    title: products.title,
    description: products.description,
    price: products.price,
    stock: products.stock,
    thumbnail: products.thumbnail,
    code:products.code
  }));
  res.render("home", {
    products: view,
    hasPrevPage: !products.hasPrevPage,
    hasNextPage: !products.hasNextPage,
    page: !products.page,
  });
});

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
  const products = await pm.getProducts();
  const view = products.docs.map((products) => ({
    title: products.title,
    description: products.description,
    price: products.price,
    stock: products.stock,
    thumbnail: products.thumbnail,
    code:products.code
  }));
  res.render("home", {
    products: view,
    hasPrevPage: !products.hasPrevPage,
    hasNextPage: !products.hasNextPage,
    page: !products.page,
  });
});

router.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;
  const carts = await cm.getCartByUsername(cid);
  res.render("cart", { cid });
});

module.exports = router;
