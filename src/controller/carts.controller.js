const {
  mapProductCart,
  calculateCartTotal,
} = require("../routes/utils/carts.utils");
const cartsService = require("../service/carts.service");
const productsService = require("../service/products.service");


const createCarts = async (req, res) => {
  try {
    const { products = [], username } = req.body;

    let { productCartList, productsNotFound, cartTotalQuantity } =
      await mapProductCart(products);
    const cart = {
      totalPrice: calculateCartTotal(productCartList),
      totalQuantity: cartTotalQuantity,
      products: productCartList,
      username: username,
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

const getCartByUsername = async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cartsService.getCartByUsername(cid);
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
    } else {
      const cart = await cartsService.getCartByUsername(cid);

      if (!cart) {
        const newCart = {
          totalPrice: product[0].price,
          totalQuantity: 1,
          products: [{ product: pid, quantity: 1 }],
          username: cid,
        };
        const cartToSave = await cartsService.createCart(newCart);
        res.json({
          msg: "Carrito creado y productos agregados exitosamente",
          status: "success",
          payload: cartToSave,
        });
      } else {
        const findProduct = cart.products.find(
          (product) => product.product._id.toString() === pid
        );
        if (!findProduct) {
          cart.products.push({ product: pid, quantity: 1 });
          cart.totalQuantity = cart.totalQuantity + 1;
          cart.totalPrice = cart.totalPrice + product[0].price;
          const cartToUpdate = await cartsService.updateCartProducts(cart);
          res.json({
            msg: "Producto agregado exitosamente",
            status: "success",
            payload: cartToUpdate,
          });
        } else {
          findProduct.quantity++;
          cart.totalQuantity = cart.totalQuantity + 1;
          cart.totalPrice = cart.totalPrice + findProduct.product.price;
          const cartToUpdate = await cartsService.updateCartProducts(cart);
          res.json({
            msg: "Produto agregado al carrito",
            status: "success",
            payload: cartToUpdate,
          });
        }
      }
    }
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
      const cart = await cartsService.getCartByUsername(cid);

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
    const cart = await cartsService.getCartByUsername(cid);

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
      const cart = await cartsService.getCartByUsername(cid);

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
    const cart = await cartsService.getCartByUsername(cid);
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

module.exports = {
  createCarts,
  getCarts,
  getCartByUsername,
  addProductToCart,
  deleteProductFromCart,
  updateProductFromCart,
  updateProductQuantityFromCart,
  cleanCart,
};
