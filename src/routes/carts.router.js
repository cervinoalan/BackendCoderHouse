const { Router } = require("express");
// const productManager = require("../dao/fileSystemManagar/ProductManager");
// const cartManager = require("../dao/fileSystemManagar/CartsManager");
const CartsManager = require("../dao/mongoManager/CartsManager");
const ProductManager = require("../dao/mongoManager/ProductManager");
const router = Router();

const pm = new ProductManager();
const cm = new CartsManager();

router.post("/", async (req, res) => {
  const cart = req.body;
  try {
    const createCart = await cm.createCart(cart);
    return createCart;
  } catch (error) {
    return res.status(500).json({
      msg: "error",
      payload: "Error al Crear el Carrito",
    });
  }
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cm.getCartsById(cid);
    res.json({
      msg: "Carrito encontrado",
      cart,
    });
  } catch (error) {
    res.status(404).json({
      msg: "No se encuentra el carrito",
    });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const product = await pm.getProductById(pid);
    if (!product) {
      return res.status(400).json({
        msg: `El producto con el id ${pid} no existe`,
        ok: false,
      });
    } else {
      const cart = await cm.addProductToCart(cid, product.id);
      res.json({
        msg: "Producto agregado exitosamente",
        cart
      });
    }
  } catch (error) {
    res.status(404).json({
      msg: "Error al agregar producto",
    });
  }
});

module.exports = router;
