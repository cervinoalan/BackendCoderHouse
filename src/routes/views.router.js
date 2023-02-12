const { Router } = require("express");
// const productManager = require("../dao/fileSystemManagar/ProductManager");
const ProductManager = require("../dao/mongoManager/ProductManager");

const pm = new ProductManager()
const router = Router();

router.get("/", async (req, res) => {
  const products = await pm.getProducts();
  console.log(products)
  res.render("home", {
    style: "index.css",
    products: products
  });
}); 

router.get("/realtimeproducts", async (req, res) => {
  const products = await pm.getProducts();
  res.render("realTimeProducts", {
    products,
  });
}); 

router.get('/chats', (req,res) =>{
  res.render("chats")
})

module.exports = router;
