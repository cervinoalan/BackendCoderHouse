const { Router } = require("express");
const productManager = require("../dao/fileSystemManagar/ProductManager");
const ProductManager = require("../dao/mongoManager/ProductManager")
const { emitDeleteProduct, emitAddProduct } = require("./utils/socket.io");
const router = Router();

const pm = new ProductManager()

router.get("/", async (req, res) => {
  const { limit = 10 } = req.query
  try{
    const products = await pm.getProducts({ limit })
    res.json({
            msg: "Productos encontrados",
            product: products,
           });
  } catch (error) {
    res.status(404).json({
      msg: `Ocurrio un error al intentar buscar los productos`,
    });
  }
});

router.get("/:pid", async (req, res) => {
  let productId = req.params.pid;
  try {
    let product = await pm.getProductById(productId);
    res.json({
      msg: "Producto encontrado",
      product: product,
    });
  } catch (error) {
    res.status(404).json({
      msg: `No existe un producto con el id: ${productId}`,
    });
  }
});

router.post("/", async (req, res) => {
  let data = req.body;
  try {
    let newProduct = await pm.addProduct(data);
    emitAddProduct(data);
    res.json({
      msg: "Producto agregado correctamente",
      newProduct,
    });
  } catch (error) {
    res.status(404).json({
      msg: `No fue posible agregar el producto`,
    });
  }
});

router.put("/:pid", async (req, res) => {
  let productId = req.params.pid;
  let newProduct = req.body;
  try {
    let product = await pm.updateProduct(productId, newProduct);
    res.json({
      msg: "Producto actualizado correctamente",
      product,
    });
  } catch (error) {
    res.status(404).json({
      msg: `No fue posible actualizar el producto`,
    });
  }
});

router.delete("/:pid", async (req, res) => {
  let productId = req.params.pid;
  try {
    let product = await pm.deleteProduct(productId);
    emitDeleteProduct(productId);
    res.json({
      msg: "Producto eliminado correctamente",
      product,
    });
  } catch (error) {
    console.log(error)
    res.status(404).json({
      msg: `No fue posible eliminar el producto`,
      error: error.message,
    });
  }
});

module.exports = router;
