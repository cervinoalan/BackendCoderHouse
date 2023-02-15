const { Router } = require("express");
const CartsManager = require("../dao/mongoManager/CartsManager");
const ProductManager = require("../dao/mongoManager/ProductManager");
const router = Router();

const pm = new ProductManager();
const cm = new CartsManager();

router.post("/", async (req, res) => {
  const cart = req.body;
  try {
    const createCart = await cm.createCart(cart);
    res.json({
      msg: "Carritos creado exitosamente",
      createCart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "error",
      payload: "Error al Crear el Carrito",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await cm.getCarts();
    res.json({
      msg: "Carritos encontrados",
      carts,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "error",
      payload: "Error al buscar los carritos",
    });
  }
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cm.getCartByUsername(cid);
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
    console.log(product)
    if (!product) {
      return res.status(400).json({
        msg: `El producto con el id ${pid} no existe`,
        ok: false,
      });
    } else {
      const cart = await cm.getCartByUsername(cid);

      if (!cart) {
        console.log(product.price)
        const newCart = {
          priceTotal: product.price,
          quantityTotal: 1,
          products: [{ _id: pid, quantity: 1 }],
          username: cid,
        };
        const cartToSave = await cm.addProductToCart(newCart);
        res.json({
          msg: "Producto agregado exitosamente",
          cartToSave,
        });
      } else {
        const findProduct = cart.products.find(
          (product) => product._id.toString() === pid
        );
        console.log(findProduct);
        if (!findProduct) {
          cart.products.push({ _id: pid });
          cart.quantityTotal = cart.quantityTotal + 1;
          cart.priceTotal = cart.products.reduce(
            (Acumulador, ProductoActual) =>
              Acumulador + ProductoActual.quantity,
            0
          );
        } else {
          findProduct.quantity++;
          cart.priceTotal = cart.products.reduce(
            (Acomulador, ProductoActual) =>
              Acomulador + product.price * ProductoActual.quantity,
            0
          );
          cart.quantityTotal = cart.quantityTotal + 1;
          const cartToUpdate = await cm.updateCartProducts(cart);
          res.json({
            msg: "Produto agregado al carrito",
            cartToUpdate,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "Error al agregar producto",
    });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const product = await pm.getProductById(pid);
    if (!product) {
      return res.status(400).json({
        msg: `El producto con el id ${pid} no existe`,
        ok: false,
      });
    } else {
      const cart = await cm.getCartByUsername(cid);

      if (!cart) {
        return res.status(400).json({
          msg: `El carrito no existe`,
          ok: false,
        });
      } else {
        const findProduct = cart.products.find(
          (product) => product._id.toString() === pid
        );
        console.log(findProduct);
        if (findProduct.quantity === 1) {
          cart.products = cart.products.filter((prod) => prod.id !== pid);
        } else {
          findProduct.quantity--;
        }
        cart.quantityTotal = cart.quantityTotal - 1;
        const total = cart.products.reduce(
          (acumulador, total) => acumulador + product.price * total.quantity,
          0
        );
        cart.priceTotal = total;
        const cartToUpdate = await cm.updateCartProducts(cart);
        res.json({
          msg: "Produto eliminado del carrito",
          cartToUpdate,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "Error al eliminar el  producto",
    });
  }
});

router.put("/:cid", async (req, res) => {});

router.put("/:cid/product/:pid", async (req, res) => {});

router.delete("/:cid", async (req, res) => {});

module.exports = router;
