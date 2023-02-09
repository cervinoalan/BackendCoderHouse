const { Router } = require("express");
const productManager = require("../dao/fileSystemManagar/ProductManager");

const router = Router();

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", {
    style: "index.css",
    products
  });
}); 

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", {
    products,
  });
}); 

router.get('/chats', (req,res) =>{
  res.render("chats")
})

module.exports = router;
