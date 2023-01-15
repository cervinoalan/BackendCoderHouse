const { Router } = require("express");
const productManager = require("./utils/ProductManager");
const cartManager = require("./utils/CartsManager");
const router = Router();

router.post("/", async (req, res) => {
  const resp = await cartManager.addCart();
  res.json({ msg: "Carrito creado con exito", id: resp });
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cartManager.getCart(cid);
    res.json({
      msg: "Carrito encontrado",
      cart,
    });
  } catch (error) {
    res.status(404).json({
      msg: "No se encuentra el carrito",
      error: error.message,
    });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const product = await productManager.getProductById(pid);
    const cart = await cartManager.addProductToCart(cid, product.id);
    res.json({
      msg: "Producto agregado exitosamente",
    });
  } catch (error) {
    res.status(404).json({
      msg: "Error al agregar producto",
      error: error.message,
    });
  }
});

module.exports = router;
