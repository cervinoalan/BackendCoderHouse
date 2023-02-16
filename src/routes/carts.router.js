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
    if (!product) {
      return res.status(400).json({
        msg: `El producto con el id ${pid} no existe`,
        ok: false,
      });
    } else {
      const cart = await cm.getCartByUsername(cid);

      if (!cart) {
        const newCart = {
          priceTotal: product.price,
          quantityTotal: 1,
          products: [{ product: pid, quantity: 1 }],
          username: cid,
        };
        const cartToSave = await cm.addProductToCart(newCart);
        res.json({
          msg: "Producto agregado exitosamente",
          cartToSave,
        });
      } else {
        const findProduct = cart.products.find(
          (product) => product.product._id.toString() === pid
        );
        if (!findProduct) {
          cart.products.push({ product: pid, quantity: 1 });
          cart.quantityTotal = cart.quantityTotal + 1;
          cart.priceTotal = cart.priceTotal + findProduct.product.price;
          const cartToUpdate = await cm.updateCartProducts(cart);
          res.json({
            msg: "Producto agregado exitosamente",
            cartToUpdate,
          });
        } else {
          findProduct.quantity++;
          cart.priceTotal = cart.products.reduce(
            (Acomulador, ProductoActual) =>
              Acomulador + findProduct.product.price * ProductoActual.quantity,
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
        if (!findProduct) {
          return res.status(400).json({
            msg: `El producto no existe en el carrito`,
            ok: false,
          });
        }
        if (findProduct.quantity === 1) {
          cart.products = cart.products.filter(
            (prod) => prod._id.toString() !== pid
          );
          const cartToUpdate = await cm.updateCartProducts(cart);
          res.json({
            msg: "Produto eliminado del carrito",
            cartToUpdate,
          });
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

router.put("/:cid", async (req, res) => {
  const cid = req.params;
  const newProducts = req.body;
  try {
    const cart = await cm.getCartByUsername(cid);

    if (!cart) {
      return res.status(400).json({
        msg: `El carrito no existe`,
        ok: false,
      });
    } else {
      cart.products = newProducts;
      const cartToUpdate = await cm.updateCartProducts(cart);
      res.json({
        msg: "Productos actualizados correctamente",
        cartToUpdate,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "Error al actualizar el  producto",
    });
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const newQuantity = req.body.quantity;
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
        if (!findProduct) {
          return res.status(400).json({
            msg: `El producto no existe en el carrito`,
            ok: false,
          });
        } else {
          findProduct.quantity = newQuantity;
          const cartToUpdate = await cm.updateCartProducts(cart);
          res.json({
            msg: "Cantidad del producto actualizada correctamente",
            cartToUpdate,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "Error al actualizar el  producto",
    });
  }
});

router.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cm.getCartByUsername(cid);
    if (!cart) {
      return res.status(400).json({
        msg: `El carrito no existe`,
        ok: false,
      });
    } else {
      cart.products = [];
      cart.quantityTotal = 0;
      cart.priceTotal = 0;
      const cartToUpdate = await cm.updateCartProducts(cart);
      res.json({
        msg: "Carrito vaciado correctamente",
        cartToUpdate,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "Error al vaciar el carrito",
    });
  }
});

module.exports = router;
