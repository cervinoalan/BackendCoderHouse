const express = require("express");
const ProductManager = require("./ProductManager");
const server = express();
const pm = new ProductManager("./data.json");

server.get("/products", async (req, res) => {
  let product = await pm.getProducts();
  let limit = req.query.limit;
  if (!limit) {
    res.send({"products":product});
  } else {
    let productLimit = product.slice(0, limit);
    res.send({"products": productLimit});
  }
});

server.get("/products/:pid", async (req, res) => {
  let productId = parseInt(req.params.pid);
  console.log(productId)
  let productById = await pm.getProductById(productId);
  if (productById){
    res.send(productById);    
    }else{
        res.send(`No existe un producto con el id: ${productId}`); 
    }
});

server.listen(8080, () => {
  console.log("servidor ejecutado en puerto 8080");
});
