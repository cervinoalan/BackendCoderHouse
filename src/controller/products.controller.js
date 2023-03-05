const ProductManager = require("../dao/mongoManager/ProductManager");

const {
  emitDeleteProduct,
  emitAddProduct,
} = require("../routes/utils/socket.io");
const pm = new ProductManager();

const getProducts = async (req, res) => {
  const { limit, page, sort, ...query } = req.query;
  try {
    const products = await pm.getProducts(page, limit, sort, query);
    res.json({
      msg: "Productos encontrados",
      status: "success",
      payload: products,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Ocurrio un error al intentar buscar los productos`,
      status: "error",
    });
  }
};

const getProductById = async (req, res) => {
  let productId = req.params.pid;
  try {
    let product = await pm.getProductById(productId);
    res.json({
      msg: "Producto encontrado",
      status: "success",
      payload: product,
    });
  } catch (error) {
    res.status(500).json({
      msg: `No existe un producto con el id: ${productId}`,
      status: "error",
    });
  }
};

const addProduct = async (req, res) => {
  let data = req.body;
  try {
    let newProduct = await pm.addProduct(data);
    emitAddProduct(data);
    res.json({
      msg: "Producto agregado correctamente",
      status: "success",
      newProduct,
    });
  } catch (error) {
    res.status(500).json({
      msg: `No fue posible agregar el producto`,
      status: "error",
    });
  }
};

const updateProduct = async (req, res) => {
  let productId = req.params.pid;
  let newProduct = req.body;
  try {
    let product = await pm.updateProduct(productId, newProduct);
    res.json({
      msg: "Producto actualizado correctamente",
      status: "success",
      product,
    });
  } catch (error) {
    res.status(500).json({
      msg: `No fue posible actualizar el producto`,
      status: "error",
    });
  }
};

const deleteProduct = async (req, res) => {
  let productId = req.params.pid;
  try {
    let product = await pm.deleteProduct(productId);
    emitDeleteProduct(productId);
    res.json({
      msg: "Producto eliminado correctamente",
      status: "success",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `No fue posible eliminar el producto`,
      status: "error",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
