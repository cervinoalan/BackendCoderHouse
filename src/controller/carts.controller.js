const { mapProductCart, calculateCartTotal } = require("../utils/carts.utils");
const cartsService = require("../repository/carts.service");
const productsService = require("../repository/products.service");
const { v4 } = require("uuid");

const createCarts = async (req, res) => {
  try {
    const { products = [] } = req.body;

    let { productCartList, productsNotFound, cartTotalQuantity } =
      await mapProductCart(products);
    const cart = {
      totalPrice: calculateCartTotal(productCartList),
      totalQuantity: cartTotalQuantity,
      products: productCartList,
    };
    const createCart = await cartsService.createCart(cart);
    res.json({
      msg: "Carrito creado exitosamente",
      status: "success",
      payload: { createCart, productsNotFound },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al Crear el Carrito",
      status: "error",
    });
  }
};

const getCarts = async (req, res) => {
  try {
    const carts = await cartsService.getCarts();
    res.json({
      msg: "Carritos encontrados",
      status: "succes",
      payload: carts,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al buscar los carritos",
      status: "error",
    });
  }
};

const getCartById = async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cartsService.getCartById(cid);
    res.json({
      msg: "Carrito encontrado",
      status: "success",
      payload: cart,
    });
  } catch (error) {
    res.status(404).json({
      msg: "No se encuentra el carrito",
      status: "error",
    });
  }
};

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const product = await productsService.getProductById(pid);
    if (!product) {
      return res.status(400).json({
        msg: `El producto con el id ${pid} no existe`,
        status: "error",
      });
    }

    let cart = await cartsService.getCartById(cid);
    if (!cart) {
      const newCart = {
        totalPrice: product.price,
        totalQuantity: 1,
        products: [{ product: pid, quantity: 1 }],
      };
      cart = await cartsService.createCart(newCart);
      return res.json({
        msg: "Carrito creado y productos agregados exitosamente",
        status: "success",
        payload: cart,
      });
    }

    const findProduct = cart.products.find(
      (prod) => prod.product.toString() === pid
    );
    if (!findProduct) {
      cart.products.push({
        product: pid,
        unitValue: product.price,
        quantity: 1,
      });
    } else {
      findProduct.quantity++;
    }

    cart.totalQuantity++;
    cart.totalPrice += product.price;

    const cartToUpdate = await cartsService.updateCartProducts(cart);
    res.json({
      msg: "Producto agregado exitosamente",
      status: "success",
      payload: cartToUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "Error al agregar producto",
      status: "error",
    });
  }
};


const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const product = await productsService.getProductById(pid);
    if (!product) {
      return res.status(400).json({
        msg: `El producto con el id ${pid} no existe`,
        ok: false,
      });
    } else {
      const cart = await cartsService.getCartById(cid);

      if (!cart) {
        return res.status(400).json({
          msg: `El carrito no existe`,
          status: "error",
        });
      } else {
        const findProduct = cart.products.find(
          (product) => product.product._id.toString() === pid
        );
        if (!findProduct) {
          return res.status(400).json({
            msg: `El producto no existe en el carrito`,
            status: "error",
          });
        }
        if (findProduct.quantity === 1) {
          cart.products = cart.products.filter(
            (product) => product.product._id.toString() !== pid
          );
          cart.totalQuantity = cart.totalQuantity - 1;
          cart.totalPrice = cart.totalPrice - findProduct.product.price;
          const cartToUpdate = await cartsService.updateCartProducts(cart);
          res.json({
            msg: "Produto eliminado del carrito",
            status: "success",
            payload: cartToUpdate,
          });
        } else {
          findProduct.quantity--;
          cart.totalQuantity = cart.totalQuantity - 1;
          cart.totalPrice = cart.totalPrice - findProduct.product.price;
          const cartToUpdate = await cartsService.updateCartProducts(cart);
          res.json({
            msg: "Produto eliminado del carrito",
            status: "success",
            payload: cartToUpdate,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "Error al eliminar el  producto",
      status: "error",
    });
  }
};

const updateProductFromCart = async (req, res) => {
  const { cid } = req.params;
  const { products = [] } = req.body;
  try {
    const cart = await cartsService.getCartById(cid);

    if (!cart) {
      return res.status(400).json({
        msg: `El carrito no existe`,
        status: "error",
      });
    } else {
      let { productCartList, productsNotFound, cartTotalQuantity } =
        await mapProductCart(products);
      const newCart = {
        totalPrice: calculateCartTotal(productCartList),
        totalQuantity: cartTotalQuantity,
        products: productCartList,
      };
      const cartToUpdate = await cartsService.updateCart(cid, newCart);
      res.json({
        msg: "Productos actualizados correctamente",
        status: "success",
        payload: { cartToUpdate, productsNotFound },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "Error al actualizar el  producto",
      status: "error",
    });
  }
};

const updateProductQuantityFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  const newQuantity = req.body.quantity;
  try {
    const product = await productsService.getProductById(pid);
    if (!product) {
      return res.status(400).json({
        msg: `El producto con el id ${pid} no existe`,
        status: "error",
      });
    } else {
      const cart = await cartsService.getCartById(cid);

      if (!cart) {
        return res.status(400).json({
          msg: `El carrito no existe`,
          status: "error",
        });
      } else {
        const findProduct = cart.products.find(
          (product) => product.product._id.toString() === pid
        );
        if (!findProduct) {
          console.log(cart.products);
          return res.status(400).json({
            msg: `El producto no existe en el carrito`,
            status: "error",
          });
        } else {
          findProduct.quantity += newQuantity;
          cart.totalQuantity += newQuantity;
          cart.totalPrice += findProduct.product.price * newQuantity;
          const cartToUpdate = await cartsService.updateCartProducts(cart);
          res.json({
            msg: "Cantidad del producto actualizada correctamente",
            status: "success",
            payload: cartToUpdate,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "Error al actualizar el  producto",
      status: "error",
    });
  }
};

const cleanCart = async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cartsService.getCartById(cid);
    if (!cart) {
      return res.status(400).json({
        msg: `El carrito no existe`,
        status: "error",
      });
    } else {
      cart.products = [];
      cart.totalQuantity = 0;
      cart.totalPrice = 0;
      const cartToUpdate = await cartsService.updateCartProducts(cart);
      res.json({
        msg: "Carrito vaciado correctamente",
        status: "success",
        payload: cartToUpdate,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "Error al vaciar el carrito",
      status: "error",
    });
  }
};

const purchaseCart = async (req, res) => {
  let total = 0;
  const cid = req.params.cid;
  const cartsTicket = [];
  const cartsReject = [];
  try {
    const cart = await cartsService.getCartById(cid);
    for (let i = 0; i < cart.products.length; i++) {
      const productBd = await productsService.getProductById(
        cart.products[i].product
      );
      if (productBd.stock >= cart.products[i].quantity) {
        productBd.stock = productBd.stock - cart.products[i].quantity;
        await productsService.updateProduct(productBd.id, productBd);
        total += productBd.price * cart.products[i].quantity;
        cartsTicket.push(cart.products);
      } else {
        cartsReject.push(productBd);
      }
    }
    if (cartsTicket.length != 0) {
      const newTicket = await cartsService.purchaseCart({
        code: v4(),
        amount: total,
        purchaser: cid,
        products: cartsTicket,
      });
      res.json({
        msg: "Ticket creado correctamente",
        status: "success",
        payload: newTicket,
        productsRejected: cartsReject,
      });
    } else {
      res.status(412).json({
        msg: "Error al finalizar la compra, no hay productos disponibles en stock.",
        status: "error",
        productsRejected: cartsReject,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "Error al finalizar la compra",
      status: "error",
    });
  }
};

module.exports = {
  createCarts,
  getCarts,
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  updateProductFromCart,
  updateProductQuantityFromCart,
  cleanCart,
  purchaseCart,
};
