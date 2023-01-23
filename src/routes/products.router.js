const { Router } = require("express");
const productManager = require("./utils/ProductManager");
const { emitDeleteProduct, emitAddProduct } = require("./utils/socket.io");
const router = Router();

router.get("/", async (req, res) => {
  let products = await productManager.getProducts();
  let limit = req.query.limit;
  if (!limit) {
    res.send({ products: products });
  } else {
    let productLimit = products.slice(0, limit);
    res.send({ products: productLimit });
  }
});

router.get("/:pid", async (req, res) => {
  let productId = parseInt(req.params.pid);
  try {
    let product = await productManager.getProductById(productId);
    res.json({
      msg: "Producto encontrado",
      product: product,
    });
  } catch (error) {
    res.status(404).json({
      msg: `No existe un producto con el id: ${productId}`,
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  let data = req.body;
  try {
    let newProduct = await productManager.addProduct(data);
    emitAddProduct(data);
    res.json({
      msg: "Producto agregado correctamente",
      newProduct,
    });
  } catch (error) {
    res.status(404).json({
      msg: `No fue posible agregar el producto`,
      error: error.message,
    });
  }
});

router.put("/:pid", async (req, res) => {
  let productId = parseInt(req.params.pid);
  let newProduct = req.body;
  try {
    let product = await productManager.updateProduct(productId, newProduct);
    res.json({
      msg: "Producto actualizado correctamente",
      product,
    });
  } catch (error) {
    res.status(404).json({
      msg: `No fue posible actualizar el producto`,
      error: error.message,
    });
  }
});

router.delete("/:pid", async (req, res) => {
  let productId = parseInt(req.params.pid);
  try {
    let product = await productManager.deleteProduct(productId);
    emitDeleteProduct(productId);
    res.json({
      msg: "Producto eliminado correctamente",
      product,
    });
  } catch (error) {
    res.status(404).json({
      msg: `No fue posible eliminar el producto`,
      error: error.message,
    });
  }
});

module.exports = router;
