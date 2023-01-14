const { Router } = require("express");
const ProductM = require("../ProductManager");
const router = Router();


router.get("/", async (req, res) => {
  let product = await ProductM.getProducts();
  let limit = req.query.limit;
  if (!limit) {
    res.send({ products: product });
  } else {
    let productLimit = product.slice(0, limit);
    res.send({ products: productLimit });
  }
});

router.get("/:pid", async (req, res) => {
  let productId = parseInt(req.params.pid);
  let product = await ProductM.getProductById(productId);
  if (product) {
    res.send({ product: product });
  } else {
    res.send(`No existe un producto con el id: ${productId}`);
  }
});

router.post("/", async (req, res) => {
  let data = req.body;
  let newProduct = await ProductM.addProduct(data);
  res.status(200).json({
    msg:'Se creo existosamente el producto',
    newProduct
  })
});

router.put("/:pid", async (req, res) => {
  let productId = parseInt(req.params.pid);
  let newProduct = req.body;
  let product = await ProductM.updateProduct(productId, newProduct);
  res.status(200).json({
    product
  })
});

router.delete("/:pid", async (req, res) => {
  let productId = parseInt(req.params.pid);
  let product = await ProductM.deleteProduct(productId);
  if (product) {
    res.send("Producto eliminado correctamente");
  } else {
    res.send(`No existe un producto con el id: ${productId}`);
  }
});

module.exports = router;
